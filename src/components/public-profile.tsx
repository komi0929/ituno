"use client";

import { AppIcon, DockIcon } from "@/components/ios/AppIcon";
import { Dock } from "@/components/ios/Dock";
import { DynamicIsland } from "@/components/ios/DynamicIsland";
import { SortableAppIcon } from "@/components/ios/SortableAppIcon";
import { SquircleDefs } from "@/components/ios/SquircleDefs";
import {
  GRID_COLUMN_WIDTH,
  GRID_HORIZONTAL_PADDING,
  GRID_ROW_HEIGHT,
  GRID_TOP_OFFSET,
  HOME_INDICATOR_BOTTOM,
  HOME_INDICATOR_HEIGHT,
  HOME_INDICATOR_RADIUS,
  HOME_INDICATOR_WIDTH,
  JIGGLE_KEYFRAMES,
  PAGE_DOT_ACTIVE_COLOR,
  PAGE_DOT_GAP,
  PAGE_DOT_INACTIVE_COLOR,
  PAGE_DOT_SIZE,
  PAGE_DOTS_BOTTOM,
  SCREEN_CORNER_RADIUS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT,
  STATUS_BAR_TEXT_COLOR,
  SYSTEM_FONT,
} from "@/lib/ios-constants";
import { Database } from "@/lib/types/schema";
import { getFaviconUrl } from "@/lib/utils/favicon";
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
 * iPhone 17 Pixel-Perfect Home Screen
 *
 * Specifications (from Apple iPhone 17):
 * - Screen: 393×852 pt (6.3 inch, 2622×1206 @ 460ppi)
 * - Dynamic Island: 126×37 px
 * - ProMotion 120Hz display
 *
 * CRITICAL: Uses OFFICIAL iOS app icons from Apple CDN only.
 * Generic icons (icons8, flaticon, etc.) are STRICTLY PROHIBITED.
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
        {/* Phone Screen - iPhone 17 aspect ratio with rounded corners */}
        <div
          className="relative overflow-hidden"
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            maxWidth: "100vw",
            maxHeight: "100dvh",
            backgroundColor: "#1C1C1E",
            borderRadius: SCREEN_CORNER_RADIUS,
          }}
          onClick={handleBackgroundClick}
        >
          {/* Wallpaper Layer - Default iOS gradient or custom */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: themeConfig?.wallpaper
                ? `url(${themeConfig.wallpaper})`
                : "linear-gradient(180deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #533483 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: SCREEN_CORNER_RADIUS,
            }}
          />

          {/* Dynamic Island */}
          <DynamicIsland />
          <SquircleDefs />

          {/* Status Bar - White text on wallpaper */}
          <div
            className="absolute top-0 left-0 right-0 z-30 flex items-end justify-between px-8"
            style={{
              height: STATUS_BAR_HEIGHT,
              paddingBottom: 6,
            }}
          >
            {/* Left side: Time + Location */}
            <div className="flex items-center gap-1">
              <span
                style={{
                  fontFamily: SYSTEM_FONT,
                  fontSize: 15,
                  fontWeight: 600,
                  color: STATUS_BAR_TEXT_COLOR,
                  letterSpacing: -0.3,
                }}
              >
                9:41
              </span>
              {/* Location arrow */}
              <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                <path
                  d="M3.5 0L6.5 9.5H4V11H3V9.5H0.5L3.5 0Z"
                  fill={STATUS_BAR_TEXT_COLOR}
                />
              </svg>
            </div>

            {/* Right side: Signal, WiFi, Battery */}
            <div className="flex items-center gap-1">
              {/* Signal Bars - 4 bars */}
              <div className="flex items-end gap-[1px]" style={{ height: 12 }}>
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
                  style={{ height: 12, backgroundColor: STATUS_BAR_TEXT_COLOR }}
                />
              </div>

              {/* WiFi Icon */}
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                <path
                  d="M8.5 2.4C11.1 2.4 13.5 3.4 15.2 5.1C15.5 5.4 15.5 5.9 15.2 6.2C14.9 6.5 14.4 6.5 14.1 6.2C12.7 4.8 10.7 3.9 8.5 3.9C6.3 3.9 4.3 4.8 2.9 6.2C2.6 6.5 2.1 6.5 1.8 6.2C1.5 5.9 1.5 5.4 1.8 5.1C3.5 3.4 5.9 2.4 8.5 2.4ZM8.5 5.4C10.2 5.4 11.8 6.1 12.9 7.2C13.2 7.5 13.2 8 12.9 8.3C12.6 8.6 12.1 8.6 11.8 8.3C11 7.5 9.8 7 8.5 7C7.2 7 6 7.5 5.2 8.3C4.9 8.6 4.4 8.6 4.1 8.3C3.8 8 3.8 7.5 4.1 7.2C5.2 6.1 6.8 5.4 8.5 5.4ZM10.2 10C10.2 10.9 9.4 11.7 8.5 11.7C7.6 11.7 6.8 10.9 6.8 10C6.8 9.1 7.6 8.3 8.5 8.3C9.4 8.3 10.2 9.1 10.2 10Z"
                  fill={STATUS_BAR_TEXT_COLOR}
                />
              </svg>

              {/* Battery - Yellow (Low Power Mode style from reference) */}
              <div className="flex items-center">
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    width: 25,
                    height: 12,
                    borderRadius: 3,
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
                      width: 17,
                      borderRadius: 1.5,
                      backgroundColor: "#FFD60A",
                    }}
                  />
                </div>
                {/* Battery cap */}
                <div
                  style={{
                    width: 2,
                    height: 5,
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
                            iconUrl={
                              link.icon_url ||
                              (link.url ? getFaviconUrl(link.url, 128) : null)
                            }
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
                    iconUrl={
                      activeItem.icon_url ||
                      (activeItem.url
                        ? getFaviconUrl(activeItem.url, 128)
                        : null)
                    }
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
            {[true, false, false, false, false].map((isActive, i) => (
              <div
                key={i}
                style={{
                  width: PAGE_DOT_SIZE,
                  height: PAGE_DOT_SIZE,
                  borderRadius: "50%",
                  backgroundColor: isActive
                    ? PAGE_DOT_ACTIVE_COLOR
                    : PAGE_DOT_INACTIVE_COLOR,
                }}
              />
            ))}
          </div>

          {/* Dock */}
          {dockLinks.length > 0 && (
            <Dock>
              {dockLinks.map((link) => (
                <DockIcon
                  key={link.id}
                  id={link.id}
                  title={link.title}
                  iconUrl={
                    link.icon_url ||
                    (link.url ? getFaviconUrl(link.url, 128) : null)
                  }
                  isJiggling={isJiggleMode}
                  onLongPress={() => setIsJiggleMode(true)}
                  onClick={() =>
                    !isJiggleMode && window.open(link.url, "_blank")
                  }
                />
              ))}
            </Dock>
          )}

          {/* Home Indicator */}
          <div
            className="absolute left-1/2 z-30"
            style={{
              bottom: HOME_INDICATOR_BOTTOM,
              transform: "translateX(-50%)",
              width: HOME_INDICATOR_WIDTH,
              height: HOME_INDICATOR_HEIGHT,
              backgroundColor: "#FFFFFF",
              borderRadius: HOME_INDICATOR_RADIUS,
            }}
          />
        </div>
      </div>
    </>
  );
}
