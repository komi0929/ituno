
"use client"

import { AppIcon } from "@/components/ios/AppIcon"
import { Dock } from "@/components/ios/Dock"
import { DynamicIsland } from "@/components/ios/DynamicIsland"
import { PhoneFrame } from "@/components/ios/PhoneFrame"
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
        className="relative h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaper})` }}
        onClick={handleWallpaperClick}
      >
        <StatusBar />

        <div className="flex w-full justify-center pt-2">
           <DynamicIsland state={activeId ? "active" : "idle"} />
        </div>

        {/* Profile Info */}
        {serverProfile.full_name && (
          <div className="mt-4 flex flex-col items-center gap-2 px-4">
            {serverProfile.avatar_url && (
              <img
                src={serverProfile.avatar_url}
                alt={serverProfile.full_name}
                className="h-16 w-16 rounded-full border-2 border-white/20 object-cover shadow-lg"
              />
            )}
            <h2 className="text-lg font-semibold text-white drop-shadow-md">
              {serverProfile.full_name}
            </h2>
            {serverProfile.bio && (
              <p className="text-center text-sm text-white/80 drop-shadow-md">
                {serverProfile.bio}
              </p>
            )}
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6 px-4">
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

          {dockLinks.length > 0 && (
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
          )}

          <DragOverlay>
            {activeItem ? (
              <div className="opacity-80">
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
    </PhoneFrame>
  )
}
