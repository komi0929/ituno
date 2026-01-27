"use client";

import { AppIcon, DockIcon } from "@/components/ios/AppIcon";
import { Dock } from "@/components/ios/Dock";
import { ProfileWidget } from "@/components/ios/ProfileWidget";
import { SortableAppIcon } from "@/components/ios/SortableAppIcon";
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
  username: string;
  serverProfile: Profile;
  serverLinks: Link[];
}

/**
 * iOS Home Screen - Pixel-Perfect Reproduction
 * Based on exact analysis of reference screenshot
 */
export function PublicProfile({
  username,
  serverProfile,
  serverLinks,
}: PublicProfileProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const [links, setLinks] = useState(serverLinks);
  const [isJiggleMode, setIsJiggleMode] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

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

  if (!isMounted) return null;

  return (
    // Full screen container with black letterbox on desktop
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-black">
      {/* Phone Screen - maintains iPhone aspect ratio */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: IOS_BACKGROUND,
          maxWidth: SCREEN_WIDTH,
          height: "100dvh",
          maxHeight: SCREEN_HEIGHT,
        }}
        onClick={handleBackgroundClick}
      >
        {/* Wallpaper Layer */}
        {serverProfile.theme_config?.wallpaper && (
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${serverProfile.theme_config.wallpaper})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        {/* Status Bar - High-fidelity iOS design */}
        <div
          className="relative z-30 flex w-full items-center justify-between px-7"
          style={{ height: STATUS_BAR_HEIGHT, paddingTop: 14 }}
        >
          {/* Time - iOS SF Pro semibold */}
          <span
            className="text-[17px] font-semibold tracking-[-0.4px]"
            style={{
              fontFamily: SYSTEM_FONT,
              color: "#000",
              fontWeight: 600,
            }}
          >
            9:41
          </span>

          {/* Right indicators - Signal, WiFi, Battery */}
          <div className="flex items-center gap-[5px]">
            {/* Cellular Signal - 4 bars with proper spacing */}
            <div className="flex items-end gap-[1.5px]" style={{ height: 12 }}>
              <div
                className="w-[3px] rounded-[1px] bg-black"
                style={{ height: 4 }}
              ></div>
              <div
                className="w-[3px] rounded-[1px] bg-black"
                style={{ height: 6 }}
              ></div>
              <div
                className="w-[3px] rounded-[1px] bg-black"
                style={{ height: 9 }}
              ></div>
              <div
                className="w-[3px] rounded-[1px] bg-black"
                style={{ height: 12 }}
              ></div>
            </div>

            {/* WiFi - Apple's official icon path */}
            <svg
              width="17"
              height="12"
              viewBox="0 0 17 12"
              fill="none"
              style={{ marginLeft: 2 }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.5 2.4C11.1 2.4 13.5 3.4 15.2 5.1C15.5 5.4 15.5 5.9 15.2 6.2C14.9 6.5 14.4 6.5 14.1 6.2C12.7 4.8 10.7 3.9 8.5 3.9C6.3 3.9 4.3 4.8 2.9 6.2C2.6 6.5 2.1 6.5 1.8 6.2C1.5 5.9 1.5 5.4 1.8 5.1C3.5 3.4 5.9 2.4 8.5 2.4ZM8.5 5.4C10.2 5.4 11.8 6.1 12.9 7.2C13.2 7.5 13.2 8 12.9 8.3C12.6 8.6 12.1 8.6 11.8 8.3C11 7.5 9.8 7 8.5 7C7.2 7 6 7.5 5.2 8.3C4.9 8.6 4.4 8.6 4.1 8.3C3.8 8 3.8 7.5 4.1 7.2C5.2 6.1 6.8 5.4 8.5 5.4ZM10.2 10C10.2 10.9 9.4 11.7 8.5 11.7C7.6 11.7 6.8 10.9 6.8 10C6.8 9.1 7.6 8.3 8.5 8.3C9.4 8.3 10.2 9.1 10.2 10Z"
                fill="black"
              />
            </svg>

            {/* Battery - proper iOS proportions */}
            <div className="flex items-center" style={{ marginLeft: 2 }}>
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: 25,
                  height: 12,
                  borderRadius: 3,
                  border: "1px solid rgba(0,0,0,0.35)",
                }}
              >
                {/* Battery fill */}
                <div
                  className="absolute left-[2px] top-[2px] bottom-[2px] bg-black"
                  style={{
                    right: 4,
                    borderRadius: 1.5,
                  }}
                ></div>
              </div>
              {/* Battery cap */}
              <div
                style={{
                  width: 2,
                  height: 5,
                  backgroundColor: "rgba(0,0,0,0.35)",
                  borderRadius: "0 1px 1px 0",
                  marginLeft: 0.5,
                }}
              ></div>
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
                    onClick={() =>
                      !isJiggleMode && window.open(link.url, "_blank")
                    }
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
                backgroundColor: PAGE_DOT_ACTIVE,
              }}
            />
            <div
              className="rounded-full"
              style={{
                width: PAGE_DOT_SIZE,
                height: PAGE_DOT_SIZE,
                backgroundColor: PAGE_DOT_INACTIVE,
              }}
            />
            <div
              className="rounded-full"
              style={{
                width: PAGE_DOT_SIZE,
                height: PAGE_DOT_SIZE,
                backgroundColor: PAGE_DOT_INACTIVE,
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
            height: HOME_INDICATOR_HEIGHT,
          }}
        />
      </div>
    </div>
  );
}
