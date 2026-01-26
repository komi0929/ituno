
"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface DynamicIslandProps {
  state?: "idle" | "active" | "expanded"
}

export function DynamicIsland({ state = "idle" }: DynamicIslandProps) {
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
      className={cn(
        "flex items-center justify-between rounded-[22px] bg-black text-white",
        state === "idle" && "h-[32px] w-[120px]", // 14 Pro standard pill
        state === "active" && "h-[32px] w-[200px] px-2",
        state === "expanded" && "h-[160px] w-[360px] rounded-[44px] p-6"
      )}
    >
      {/* Selfie Camera Cutout (Always visible inside) */}
      <div className="absolute right-[25%] top-[50%] h-3 w-3 -translate-y-1/2 rounded-full bg-[#1a1a1a]" />
    </motion.div>
  )
}
