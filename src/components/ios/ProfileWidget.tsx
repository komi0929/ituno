
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
        "relative flex h-[160px] w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-white/20 p-6 backdrop-blur-xl transition-all active:scale-95",
        className
      )}
      style={{
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      <div className="flex items-start justify-between">
        {/* Avatar */}
        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white/30 shadow-md">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name || "Avatar"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
              User
            </div>
          )}
        </div>
        
        {/* Optional: Add a small icon or branding here if needed */}
      </div>

      {/* Text Info */}
      <div className="flex flex-col gap-1 text-white drop-shadow-md">
        <h2 className="line-clamp-1 text-xl font-bold tracking-tight">
          {profile.full_name || profile.username}
        </h2>
        {profile.bio && (
          <p className="line-clamp-2 text-xs font-medium opacity-90">
            {profile.bio}
          </p>
        )}
      </div>
    </div>
  )
}
