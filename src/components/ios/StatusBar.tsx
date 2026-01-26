
"use client"

import { Battery, Signal, Wifi } from "lucide-react"
import { useEffect, useState } from "react"

export function StatusBar() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    // Client-side only to match local time, preventing hydration mismatch
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex w-full items-center justify-between px-6 pt-3 text-sm font-semibold text-white mix-blend-difference">
      {/* Time */}
      <div className="w-[50px] text-center tracking-wide">{time}</div>

      {/* Right Icons */}
      <div className="flex items-center gap-1.5">
        <Signal className="h-4 w-4 fill-current" />
        <Wifi className="h-4 w-4" />
        <Battery className="h-4 w-4 fill-current" />
      </div>
    </div>
  )
}
