
"use client"

import { Database } from "@/lib/types/schema"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

interface ProfileWidgetProps {
  profile: Profile
  className?: string
}

export function ProfileWidget({ profile, className }: ProfileWidgetProps) {
  return (
    // EXACT: bg-white/40, rounded corners, no border
    <div
      className={`relative w-full h-[160px] rounded-[24px] bg-white/40 backdrop-blur-xl p-5 flex flex-col justify-between ${className || ''}`}
    >
      {/* Avatar - top left */}
      <div className="flex items-start">
        <div className="h-12 w-12 overflow-hidden rounded-full shadow-md">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name || "Avatar"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-lg font-bold">
              {(profile.full_name || profile.username || "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Text - bottom left aligned, NOT centered */}
      <div className="flex flex-col items-start">
        <h2 
          className="text-[18px] font-semibold text-white drop-shadow-md"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
        >
          {profile.full_name || profile.username}
        </h2>
        {profile.bio && (
          <p 
            className="text-[12px] text-white/90 drop-shadow-sm"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
          >
            {profile.bio}
          </p>
        )}
      </div>
    </div>
  )
}
