
"use client"

import { AppIcon, DockIcon } from "@/components/ios/AppIcon"
import { Dock } from "@/components/ios/Dock"
import { ProfileWidget } from "@/components/ios/ProfileWidget"
import { SortableAppIcon } from "@/components/ios/SortableAppIcon"
import { DYNAMIC_ENVIRONMENT } from "@/lib/ios-physics"
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
    // RESPONSIVE CONTAINER: Full bleed on Mobile, Device Frame on Desktop
    <div className="flex min-h-screen w-full items-center justify-center bg-[#050505] font-sans selection:bg-cyan-500/30">
      
      {/* PHONE CHASSIS (Visible only on lg screens) */}
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-black lg:h-[880px] lg:w-[420px] lg:rounded-[60px] lg:border-[14px] lg:border-[#1a1a1a] lg:shadow-2xl lg:ring-2 lg:ring-[#333]">
        
        {/* DYNAMIC ENVIRONMENT (The Light Source) */}
        <div 
          className="absolute inset-0 z-0"
          style={DYNAMIC_ENVIRONMENT}
          onClick={handleWallpaperClick}
        />

        {/* Status Bar */}
        <div className="relative z-50 flex h-14 w-full items-end justify-between px-7 pb-2 text-white/90">
          <span className="text-[15px] font-semibold tracking-wide">9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal size={16} strokeWidth={2.5} />
            <Wifi size={16} strokeWidth={2.5} />
            <Battery size={22} strokeWidth={2.5} />
          </div>
        </div>

        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-3 z-50 h-[34px] w-[120px] -translate-x-1/2 rounded-full bg-black shadow-lg" />

        <main className="relative z-10 flex flex-1 flex-col px-6 pt-6 overflow-y-auto">
          
          {/* PROFILE WIDGET (The "Water Bubble") */}
          <ProfileWidget profile={serverProfile} />

          {/* APP GRID */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-4 gap-y-8">
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

        {/* THE DOCK (The Floating Meniscus) */}
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

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 h-1.5 w-36 -translate-x-1/2 rounded-full bg-white/60 backdrop-blur-md z-50" />
      </div>
    </div>
  )
}
