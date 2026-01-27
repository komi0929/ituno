"use client";

import {
  DOCK_BACKGROUND,
  DOCK_BLUR,
  DOCK_BORDER_RADIUS,
  DOCK_BOTTOM_PADDING,
  DOCK_HEIGHT,
  DOCK_SIDE_PADDING,
} from "@/lib/ios-constants";

interface DockProps {
  children: React.ReactNode;
}

/**
 * iOS Dock - Pixel Perfect Frosted Glass
 * - Full width with side padding
 * - 4 icons evenly distributed
 * - Strong blur with translucent white background
 */
export function Dock({ children }: DockProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20"
      style={{
        paddingLeft: DOCK_SIDE_PADDING,
        paddingRight: DOCK_SIDE_PADDING,
        paddingBottom: DOCK_BOTTOM_PADDING,
      }}
    >
      <div
        className="flex w-full items-center justify-evenly"
        style={{
          height: DOCK_HEIGHT,
          borderRadius: DOCK_BORDER_RADIUS,
          background: DOCK_BACKGROUND,
          backdropFilter: `blur(${DOCK_BLUR}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${DOCK_BLUR}px) saturate(180%)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
