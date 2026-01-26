
"use client"

import { AppIcon, DockIcon } from "@/components/ios/AppIcon"
import { Dock } from "@/components/ios/Dock"
import { ProfileWidget } from "@/components/ios/ProfileWidget"
import { SortableAppIcon } from "@/components/ios/SortableAppIcon"
import { WALLPAPER_STYLE } from "@/lib/ios-physics"
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
import { Battery, Signal, Wifi } from "lucide-react"
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

  const gridLinks = links.filter((l) => !l.is_docked).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  const dockLinks = links.filter((l) => l.is_docked).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
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

  if (!isMounted) return null

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-[#050505] font-sans">
      
      {/* DEVICE FRAME (Desktop Only) */}
      <div className="
        relative flex flex-col overflow-hidden bg-black
        w-full h-[100dvh]
        md:w-[400px] md:h-[860px] md:rounded-[55px] md:border-[12px] md:border-[#1c1c1c] md:shadow-2xl md:ring-4 md:ring-[#333]
      ">
        
        {/* WALLPAPER: High Contrast Mesh for Refraction */}
        <div 
          className="absolute inset-0 z-0"
          style={WALLPAPER_STYLE}
          onClick={handleWallpaperClick}
        />

        {/* TOP BAR */}
        <div className="relative z-50 flex h-14 w-full shrink-0 items-end justify-between px-6 pb-2 text-white/90">
          <span className="text-[15px] font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal size={16} />
            <Wifi size={16} />
            <Battery size={22} />
          </div>
        </div>

        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-3 z-50 h-[34px] w-[120px] -translate-x-1/2 rounded-full bg-black pointer-events-none" />

        <main className="relative z-10 flex flex-1 flex-col px-5 pt-4 overflow-y-auto">
          
          {/* WIDGET: NO BORDER, JUST VOLUME */}
          <ProfileWidget profile={serverProfile} />

          {/* ICONS */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-4 gap-y-6">
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

        </main>

        {/* DOCK: NO BORDER */}
        {dockLinks.length > 0 && (
          <Dock>
            {dockLinks.map((link) => (
              <DockIcon
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
        
        {/* HOME INDICATOR */}
        <div className="absolute bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-white/40 backdrop-blur-md pointer-events-none z-50" />
      </div>
    </div>
  )
}
