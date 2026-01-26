
"use client"

import { AppIcon, DockIcon } from "@/components/ios/AppIcon"
import { Dock } from "@/components/ios/Dock"
import { ProfileWidget } from "@/components/ios/ProfileWidget"
import { SortableAppIcon } from "@/components/ios/SortableAppIcon"
import { MESH_WALLPAPER_STYLE } from "@/lib/ios-physics"
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
    // EXACT REFERENCE STRUCTURE
    <div className="relative min-h-screen w-full overflow-hidden bg-black font-sans selection:bg-white/30">
      
      {/* WALLPAPER (Dynamic Mesh) */}
      <div 
        className="absolute inset-0 z-0"
        style={MESH_WALLPAPER_STYLE}
        onClick={handleWallpaperClick}
      />

      {/* STATUS BAR AREA */}
      <div className="relative z-50 flex h-14 w-full items-end justify-between px-8 pb-2 text-white">
        <span className="text-[15px] font-semibold">9:41</span>
        <div className="flex gap-1.5 items-center">
          <div className="flex gap-0.5">
            <div className="h-2.5 w-1 rounded-sm bg-white"></div>
            <div className="h-3 w-1 rounded-sm bg-white"></div>
            <div className="h-3.5 w-1 rounded-sm bg-white"></div>
            <div className="h-4 w-1 rounded-sm bg-white/40"></div>
          </div>
          <span className="text-[15px] font-semibold ml-1">LTE</span>
          <div className="ml-2 h-4 w-7 rounded-sm border border-white/40 relative">
            <div className="absolute inset-0.5 right-1 bg-white rounded-sm"></div>
            <div className="absolute -right-0.5 top-1 h-2 w-0.5 bg-white/40 rounded-r"></div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="relative z-10 mx-auto max-w-md px-6 pt-2">
        
        {/* WIDGET AREA */}
        <ProfileWidget profile={serverProfile} />

        {/* APP GRID */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-4 gap-y-8 px-2">
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

      {/* THE DOCK */}
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
      
    </div>
  )
}
