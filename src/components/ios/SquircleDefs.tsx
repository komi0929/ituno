"use client";

/**
 * Global SVG Definitions for iOS UI elements.
 * Usage: style={{ clipPath: "url(#ios-squircle)" }}
 */
export function SquircleDefs() {
  return (
    <svg
      width="0"
      height="0"
      className="absolute pointer-events-none opacity-0"
    >
      <defs>
        <clipPath id="ios-squircle" clipPathUnits="objectBoundingBox">
          {/* 
            iPhone Icon Squircle (Approximate for 0..1 range) 
            Based on Figma's "Squircle" smoothing 0.6 or Apple's continuity.
            Using a path that closely mimics the 0.5,0 start and control points.
            This path mimics the shape of an icon with standard iOS curvature.
          */}
          <path d="M 0.5,0 C 0.1,0 0,0.1 0,0.5 C 0,0.9 0.1,1 0.5,1 C 0.9,1 1,0.9 1,0.5 C 1,0.1 0.9,0 0.5,0 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
