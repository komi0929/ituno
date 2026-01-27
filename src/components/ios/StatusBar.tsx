"use client";

import {
  STATUS_BAR_HEIGHT,
  STATUS_BAR_TEXT_COLOR,
  SYSTEM_FONT,
} from "@/lib/ios-constants";
import { useEffect, useState } from "react";

export function StatusBar() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Client-side only to match local time, preventing hydration mismatch
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
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
          {time || "9:41"}
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
        <div className="flex items-end gap-px" style={{ height: 12 }}>
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
  );
}
