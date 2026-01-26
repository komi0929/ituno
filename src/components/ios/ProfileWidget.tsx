
"use client"

import { Database } from "@/lib/types/schema"
import { cn } from "@/lib/utils"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

interface ProfileWidgetProps {
  profile: Profile
  className?: string
}

export function ProfileWidget({ profile, className }: ProfileWidgetProps) {
  return (
    <div
      className={cn(
        "relative col-span-4 flex h-[170px] w-full flex-col justify-between overflow-hidden rounded-[28px] p-5",
        "liquid-glass", // iOS 26 Liquid Glass
        "transition-all duration-300 active:scale-[0.98]",
        className
      )}
    >
      {/* Top Section: Avatar */}
      <div className="flex items-start justify-between">
        <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white/30 shadow-lg">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name || "Avatar"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/20 text-white text-xl font-bold">
              {(profile.full_name || profile.username || "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Text Info */}
      <div className="flex flex-col gap-0.5">
        <h2 
          className="line-clamp-1 text-xl font-bold tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
        >
          {profile.full_name || profile.username}
        </h2>
        {profile.bio && (
          <p 
            className="line-clamp-2 text-xs font-medium text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
          >
            {profile.bio}
          </p>
        )}
      </div>
    </div>
  )
}
