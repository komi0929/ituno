
"use client"

import { AppIcon } from "@/components/ios/AppIcon"
import { Dock } from "@/components/ios/Dock"
import { DynamicIsland } from "@/components/ios/DynamicIsland"
import { PhoneFrame } from "@/components/ios/PhoneFrame"
import { ProfileWidget } from "@/components/ios/ProfileWidget"
import { SortableAppIcon } from "@/components/ios/SortableAppIcon"
import { StatusBar } from "@/components/ios/StatusBar"
import { Database } from "@/lib/types/schema"
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { useEffect, useState } from "react"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type Link = Database["public"]["Tables"]["links"]["Row"]

interface PublicProfileProps {
  username: string
  serverProfile: Profile
  serverLinks: Link[]
}

export function PublicProfile({ username, serverProfile, serverLinks }: PublicProfileProps) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  const [links, setLinks] = useState(serverLinks)
  const [isJiggleMode, setIsJiggleMode] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  // Separating Grid and Dock items
  const gridLinks = links.filter((l) => !l.is_docked).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  const dockLinks = links.filter((l) => l.is_docked).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
    // Haptic feedback could go here
    if (navigator.vibrate) navigator.vibrate(10)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setLinks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
    setActiveId(null)
  }

  const handleWallpaperClick = () => {
    if (isJiggleMode) setIsJiggleMode(false)
  }

  const activeItem = links.find((l) => l.id === activeId)
  const wallpaper = (serverProfile.theme_config as any)?.wallpaper || "https://images.unsplash.com/photo-1695503348386-2a7444c979d5?q=80&w=2670"

  if (!isMounted) return null;

  return (
    <PhoneFrame>
      <div 
        className="relative h-full min-h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaper})` }}
        onClick={handleWallpaperClick}
      >
        {/* Status Bar */}
        <Status barWrapperClassName="pt-1 px-6" /> {/* Adjusted for no-bezel */}
        <div className="absolute top-0 w-full px-6 pt-3 z-50 pointer-events-none">
             <StatusBar />
        </div>

        {/* Dynamic Island - integrated, not in bezel */}
        <div className="absolute top-0 flex w-full justify-center pt-3 z-50 pointer-events-none">
           <div className="pointer-events-auto">
             <DynamicIsland state={activeId ? "active" : "idle"} />
           </div>
        </div>

        {/* Main Content Padding for Status Bar & Island */}
        <div className="pt-14 pb-24 px-6 flex flex-col gap-8">
            
            {/* Profile Widget (Top Widget) */}
            <div className="w-full">
                <ProfileWidget profile={serverProfile} />
            </div>

            <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            >
            <div className="grid grid-cols-4 gap-x-5 gap-y-6"> {/* Tuned spacing */}
                <SortableContext items={gridLinks} strategy={rectSortingStrategy}>
                {gridLinks.map((link) => (
                    <SortableAppIcon
                    key={link.id}
                    id={link.id}
                    title={link.title}
                    iconUrl={link.icon_url}
                    isJiggling={isJiggleMode}
                    onLongPress={() => setIsJiggleMode(true)}
                    onClick={() => !isJiggleMode && window.open(link.url, "_blank")}
                    onRemove={() => console.log("Remove", link.id)}
                    />
                ))}
                </SortableContext>
            </div>

            <DragOverlay>
                {activeItem ? (
                <div className="scale-110 opacity-90">
                    <AppIcon
                    id={activeItem.id}
                    title={activeItem.title}
                    iconUrl={activeItem.icon_url}
                    isJiggling={true}
                    />
                </div>
                ) : null}
            </DragOverlay>
            </DndContext>
        </div>

        {/* Dock Area - Fixed Bottom */}
        {dockLinks.length > 0 && (
            <div className="absolute bottom-2 w-full px-4 mb-2">
                 <Dock>
                {dockLinks.map((link) => (
                    <AppIcon
                    key={link.id}
                    id={link.id}
                    title={link.title}
                    iconUrl={link.icon_url}
                    isJiggling={isJiggleMode}
                    onLongPress={() => setIsJiggleMode(true)}
                    onClick={() => !isJiggleMode && window.open(link.url, "_blank")}
                    />
                ))}
                </Dock>
            </div>
        )}
      </div>
    </PhoneFrame>
  )
}
