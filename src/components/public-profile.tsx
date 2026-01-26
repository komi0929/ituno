"use client"

import { AppIcon, DockIcon } from "@/components/ios/AppIcon"
import { Dock } from "@/components/ios/Dock"
import { ProfileWidget } from "@/components/ios/ProfileWidget"
import { SortableAppIcon } from "@/components/ios/SortableAppIcon"
import {
    GRID_ROW_GAP,
    HOME_INDICATOR_HEIGHT,
    HOME_INDICATOR_WIDTH,
    IOS_BACKGROUND,
    PAGE_DOT_ACTIVE,
    PAGE_DOT_INACTIVE,
    PAGE_DOT_SIZE,
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    STATUS_BAR_HEIGHT,
    SYSTEM_FONT,
} from "@/lib/ios-constants"
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

/**
 * iOS Home Screen - Pixel-Perfect Reproduction
 * Based on exact analysis of reference screenshot
 */
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

  const handleBackgroundClick = () => {
    if (isJiggleMode) setIsJiggleMode(false)
  }

  const activeItem = links.find((l) => l.id === activeId)

  if (!isMounted) return null

  return (
    // Full screen container with black letterbox on desktop
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-black">
      
      {/* Phone Screen - maintains iPhone aspect ratio */}
      <div 
        className="relative w-full overflow-hidden"
        style={{ 
          backgroundColor: IOS_BACKGROUND,
          maxWidth: SCREEN_WIDTH,
          height: '100dvh',
          maxHeight: SCREEN_HEIGHT,
        }}
        onClick={handleBackgroundClick}
      >
        
        {/* Status Bar */}
        <div 
          className="relative z-30 flex w-full items-center justify-between px-6"
          style={{ height: STATUS_BAR_HEIGHT, paddingTop: 12 }}
        >
          {/* Time */}
          <span 
            className="text-[15px] font-semibold text-black"
            style={{ fontFamily: SYSTEM_FONT }}
          >
            9:41
          </span>
          
          {/* Right indicators - Signal, WiFi, Battery */}
          <div className="flex items-center gap-1">
            {/* Signal bars */}
            <div className="flex items-end gap-[2px] h-3">
              <div className="w-[3px] h-1.5 rounded-sm bg-black"></div>
              <div className="w-[3px] h-2 rounded-sm bg-black"></div>
              <div className="w-[3px] h-2.5 rounded-sm bg-black"></div>
              <div className="w-[3px] h-3 rounded-sm bg-black"></div>
            </div>
            {/* WiFi */}
            <svg className="w-4 h-3 ml-1" viewBox="0 0 16 12" fill="black">
              <path d="M8 2C11.5 2 14.5 3.5 16 6L14.5 7.5C13.3 5.5 10.8 4 8 4C5.2 4 2.7 5.5 1.5 7.5L0 6C1.5 3.5 4.5 2 8 2ZM8 5C10.2 5 12.2 6 13.5 7.5L12 9C11 7.8 9.6 7 8 7C6.4 7 5 7.8 4 9L2.5 7.5C3.8 6 5.8 5 8 5ZM8 8C9.3 8 10.5 8.6 11.2 9.5L8 12L4.8 9.5C5.5 8.6 6.7 8 8 8Z"/>
            </svg>
            {/* Battery */}
            <div className="ml-1 flex items-center">
              <div className="w-6 h-3 rounded-[3px] border border-black/40 relative">
                <div className="absolute inset-[2px] right-1 bg-black rounded-[1px]"></div>
              </div>
              <div className="w-[3px] h-1.5 rounded-r-sm bg-black/40 -ml-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main 
          className="relative z-10 flex flex-col px-5 pt-4 pb-28 overflow-y-auto scrollbar-hide"
          style={{ height: `calc(100% - ${STATUS_BAR_HEIGHT}px)` }}
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Profile Widget */}
          <div className="mb-6">
            <ProfileWidget profile={serverProfile} />
          </div>

          {/* App Grid: 4 columns */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div 
              className="grid grid-cols-4 justify-items-center"
              style={{ rowGap: GRID_ROW_GAP }}
            >
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
                <div className="opacity-90">
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

          {/* Page Dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            <div 
              className="rounded-full"
              style={{ 
                width: PAGE_DOT_SIZE, 
                height: PAGE_DOT_SIZE, 
                backgroundColor: PAGE_DOT_ACTIVE 
              }}
            />
            <div 
              className="rounded-full"
              style={{ 
                width: PAGE_DOT_SIZE, 
                height: PAGE_DOT_SIZE, 
                backgroundColor: PAGE_DOT_INACTIVE 
              }}
            />
            <div 
              className="rounded-full"
              style={{ 
                width: PAGE_DOT_SIZE, 
                height: PAGE_DOT_SIZE, 
                backgroundColor: PAGE_DOT_INACTIVE 
              }}
            />
          </div>

        </main>

        {/* Dock */}
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
        <div 
          className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-black/20 z-30"
          style={{ 
            width: HOME_INDICATOR_WIDTH, 
            height: HOME_INDICATOR_HEIGHT 
          }}
        />
      </div>
    </div>
  )
}
