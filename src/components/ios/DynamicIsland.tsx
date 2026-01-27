"use client";

import {
  DYNAMIC_ISLAND_HEIGHT,
  DYNAMIC_ISLAND_RADIUS,
  DYNAMIC_ISLAND_TOP,
  DYNAMIC_ISLAND_WIDTH,
} from "@/lib/ios-constants";

/**
 * Dynamic Island - iPhone 14 Pro+ style
 * Pixel-perfect reproduction of Apple's Dynamic Island
 */
export function DynamicIsland() {
  return (
    <div
      className="absolute left-1/2 z-50"
      style={{
        top: DYNAMIC_ISLAND_TOP,
        transform: "translateX(-50%)",
        width: DYNAMIC_ISLAND_WIDTH,
        height: DYNAMIC_ISLAND_HEIGHT,
        backgroundColor: "#000000",
        borderRadius: DYNAMIC_ISLAND_RADIUS,
      }}
    />
  );
}
