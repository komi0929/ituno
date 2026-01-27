"use client";

import { AppIcon, DockIcon } from "@/components/ios/AppIcon";
import { Dock } from "@/components/ios/Dock";
import { SortableAppIcon } from "@/components/ios/SortableAppIcon";
import {
  GRID_COLUMN_WIDTH,
  GRID_HORIZONTAL_PADDING,
  GRID_ROW_HEIGHT,
  GRID_TOP_OFFSET,
  JIGGLE_KEYFRAMES,
  PAGE_DOT_ACTIVE_COLOR,
  PAGE_DOT_GAP,
  PAGE_DOT_INACTIVE_COLOR,
  PAGE_DOT_SIZE,
  PAGE_DOTS_BOTTOM,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
  STATUS_BAR_TEXT_COLOR,
  SYSTEM_FONT,
} from "@/lib/ios-constants";
import { Database } from "@/lib/types/schema";
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
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Link = Database["public"]["Tables"]["links"]["Row"];

interface PublicProfileProps {
  serverProfile: Profile;
  serverLinks: Link[];
}

interface ThemeConfig {
  wallpaper?: string;
  textColor?: string;
}

/**
 * iOS Home Screen - Pixel-Perfect Reproduction
 * Matches the reference image exactly:
 * - Status bar with time, location arrow, signal, WiFi, battery (white on wallpaper)
 * - 4-column grid with white labels and drop shadows
 * - Page dots above dock
 * - Frosted glass dock
 */
export function PublicProfile({
  serverProfile,
  serverLinks,
}: PublicProfileProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [links, setLinks] = useState(serverLinks);
  const [isJiggleMode, setIsJiggleMode] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const themeConfig = serverProfile.theme_config as unknown as ThemeConfig;

  // Separate grid icons from dock icons
  const gridLinks = links
    .filter((l) => !l.is_docked)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  const dockLinks = links
    .filter((l) => l.is_docked)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setLinks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const handleBackgroundClick = () => {
    if (isJiggleMode) setIsJiggleMode(false);
  };

  const activeItem = links.find((l) => l.id === activeId);

  // Split grid icons into rows of 4
  const iconRows: Link[][] = [];
  for (let i = 0; i < gridLinks.length; i += 4) {
    iconRows.push(gridLinks.slice(i, i + 4));
  }

  if (!isMounted) return null;

  return (
    <>
      {/* Inject jiggle keyframes */}
      <style>{JIGGLE_KEYFRAMES}</style>

      {/* Full screen container - black letterbox on desktop */}
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-black">
        {/* Phone Screen - iPhone aspect ratio */}
        <div
          className="relative overflow-hidden"
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            maxWidth: "100vw",
            maxHeight: "100dvh",
            backgroundColor: "#1C1C1E", // Fallback dark gray
          }}
          onClick={handleBackgroundClick}
        >
          {/* Wallpaper Layer - fills entire screen */}
          {themeConfig?.wallpaper && (
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${themeConfig.wallpaper})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}

          {/* Status Bar - White icons on wallpaper */}
          <div
            className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4"
            style={{
              height: STATUS_BAR_HEIGHT + 24, // Extra padding for visual balance
              paddingTop: 8,
            }}
          >
            {/* Left side: Time + Location */}
            <div className="flex items-center gap-1">
              <span
                style={{
                  fontFamily: SYSTEM_FONT,
                  fontSize: 14,
                  fontWeight: 600,
                  color: STATUS_BAR_TEXT_COLOR,
                  letterSpacing: -0.3,
                }}
              >
                0:44
              </span>
              {/* Location arrow */}
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path
                  d="M4 0L7.5 10.5H4.5V12H3.5V10.5H0.5L4 0Z"
                  fill={STATUS_BAR_TEXT_COLOR}
                />
              </svg>
            </div>

            {/* Right side: Signal, WiFi, Battery */}
            <div className="flex items-center gap-[5px]">
              {/* Signal Bars - 4 bars */}
              <div
                className="flex items-end gap-[1.5px]"
                style={{ height: 11 }}
              >
                <div
                  className="w-[3px] rounded-[0.5px]"
                  style={{ height: 3, backgroundColor: STATUS_BAR_TEXT_COLOR }}
                />
                <div
                  className="w-[3px] rounded-[0.5px]"
                  style={{ height: 5, backgroundColor: STATUS_BAR_TEXT_COLOR }}
                />
                <div
                  className="w-[3px] rounded-[0.5px]"
                  style={{ height: 8, backgroundColor: STATUS_BAR_TEXT_COLOR }}
                />
                <div
                  className="w-[3px] rounded-[0.5px]"
                  style={{ height: 11, backgroundColor: STATUS_BAR_TEXT_COLOR }}
                />
              </div>

              {/* WiFi Icon */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path
                  d="M8 2.5C10.5 2.5 12.8 3.5 14.4 5.1C14.7 5.4 14.7 5.9 14.4 6.2C14.1 6.5 13.6 6.5 13.3 6.2C12 4.9 10.1 4 8 4C5.9 4 4 4.9 2.7 6.2C2.4 6.5 1.9 6.5 1.6 6.2C1.3 5.9 1.3 5.4 1.6 5.1C3.2 3.5 5.5 2.5 8 2.5ZM8 5.5C9.6 5.5 11.1 6.2 12.1 7.2C12.4 7.5 12.4 8 12.1 8.3C11.8 8.6 11.3 8.6 11 8.3C10.3 7.6 9.2 7.1 8 7.1C6.8 7.1 5.7 7.6 5 8.3C4.7 8.6 4.2 8.6 3.9 8.3C3.6 8 3.6 7.5 3.9 7.2C4.9 6.2 6.4 5.5 8 5.5ZM9.5 10C9.5 10.8 8.8 11.5 8 11.5C7.2 11.5 6.5 10.8 6.5 10C6.5 9.2 7.2 8.5 8 8.5C8.8 8.5 9.5 9.2 9.5 10Z"
                  fill={STATUS_BAR_TEXT_COLOR}
                />
              </svg>

              {/* Battery - Yellow (Low Power Mode) */}
              <div className="flex items-center">
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    width: 22,
                    height: 10,
                    borderRadius: 2.5,
                    border: `1.5px solid ${STATUS_BAR_TEXT_COLOR}`,
                  }}
                >
                  {/* Battery fill - Yellow */}
                  <div
                    style={{
                      position: "absolute",
                      left: 2,
                      top: 2,
                      bottom: 2,
                      width: 14,
                      borderRadius: 1,
                      backgroundColor: "#FFD60A", // iOS yellow
                    }}
                  />
                </div>
                {/* Battery cap */}
                <div
                  style={{
                    width: 1.5,
                    height: 4,
                    backgroundColor: STATUS_BAR_TEXT_COLOR,
                    borderRadius: "0 1px 1px 0",
                    marginLeft: 0.5,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main Content: App Grid */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div
              className="absolute z-10"
              style={{
                top: GRID_TOP_OFFSET,
                left: GRID_HORIZONTAL_PADDING,
                right: GRID_HORIZONTAL_PADDING,
              }}
            >
              <SortableContext items={gridLinks} strategy={rectSortingStrategy}>
                {iconRows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex justify-between"
                    style={{
                      marginBottom:
                        rowIndex < iconRows.length - 1
                          ? GRID_ROW_HEIGHT - 76
                          : 0,
                    }}
                  >
                    {row.map((link) => (
                      <div key={link.id} style={{ width: GRID_COLUMN_WIDTH }}>
                        <div className="flex justify-center">
                          <SortableAppIcon
                            id={link.id}
                            title={link.title}
                            iconUrl={link.icon_url}
                            isJiggling={isJiggleMode}
                            onLongPress={() => setIsJiggleMode(true)}
                            onClick={() =>
                              !isJiggleMode && window.open(link.url, "_blank")
                            }
                            onRemove={() => console.log("Remove", link.id)}
                          />
                        </div>
                      </div>
                    ))}
                    {/* Fill empty slots in last row */}
                    {row.length < 4 &&
                      Array.from({ length: 4 - row.length }).map((_, i) => (
                        <div
                          key={`empty-${i}`}
                          style={{ width: GRID_COLUMN_WIDTH }}
                        />
                      ))}
                  </div>
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

          {/* Page Dots - Above Dock */}
          <div
            className="absolute left-0 right-0 z-20 flex items-center justify-center"
            style={{
              bottom: PAGE_DOTS_BOTTOM,
              gap: PAGE_DOT_GAP,
            }}
          >
            <div
              style={{
                width: PAGE_DOT_SIZE,
                height: PAGE_DOT_SIZE,
                borderRadius: "50%",
                backgroundColor: PAGE_DOT_ACTIVE_COLOR,
              }}
            />
            <div
              style={{
                width: PAGE_DOT_SIZE,
                height: PAGE_DOT_SIZE,
                borderRadius: "50%",
                backgroundColor: PAGE_DOT_INACTIVE_COLOR,
              }}
            />
            <div
              style={{
                width: PAGE_DOT_SIZE,
                height: PAGE_DOT_SIZE,
                borderRadius: "50%",
                backgroundColor: PAGE_DOT_INACTIVE_COLOR,
              }}
            />
            <div
              style={{
                width: PAGE_DOT_SIZE,
                height: PAGE_DOT_SIZE,
                borderRadius: "50%",
                backgroundColor: PAGE_DOT_INACTIVE_COLOR,
              }}
            />
            <div
              style={{
                width: PAGE_DOT_SIZE,
                height: PAGE_DOT_SIZE,
                borderRadius: "50%",
                backgroundColor: PAGE_DOT_INACTIVE_COLOR,
              }}
            />
          </div>

          {/* Dock - Always show if dockLinks exist */}
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
                  onClick={() =>
                    !isJiggleMode && window.open(link.url, "_blank")
                  }
                />
              ))}
            </Dock>
          )}
        </div>
      </div>
    </>
  );
}
