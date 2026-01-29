"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface PhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * PhoneFrame - Immersive iOS Experience
 *
 * - Mobile: 100% Fullscreen, no borders.
 * - Desktop: Centered content max-width, full-height, with realistic Bezel.
 * - Background is transparent to allow wallpaper to show through.
 */
export function PhoneFrame({ children, className, ...props }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-screen w-full justify-center overflow-hidden py-8 lg:py-12",
        className,
      )}
      {...props}
    >
      {/* 
        Desktop Bezel Wrapper 
        - Only visible on larger screens where we need the "Phone" look
        - Adds shadow, border, and rounded corners matching iOS 17
      */}
      <div className="relative h-full w-full max-w-[430px] min-w-[375px] lg:min-w-[430px] lg:h-[932px] lg:max-h-[95vh]">
        {/* The Device Frame (Bezel) */}
        <div className="pointer-events-none absolute inset-0 z-50 hidden rounded-[60px] border-[8px] border-[#444444] shadow-2xl lg:block ring-1 ring-white/10">
          {/* Inner Bezel (Screen border) */}
          <div className="absolute inset-0 rounded-[52px] border-[4px] border-black" />
        </div>

        {/* Content Container - Clips to Squircle shape */}
        <div className="relative h-full w-full overflow-hidden bg-black lg:rounded-[60px]">
          {/* Main Content Area */}
          <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
