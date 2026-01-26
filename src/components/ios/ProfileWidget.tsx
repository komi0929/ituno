
"use client"

import { LIQUID_GLASS_STYLE } from "@/lib/ios-physics"
import { Database } from "@/lib/types/schema"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

interface ProfileWidgetProps {
  profile: Profile
  className?: string
}

// WIDGET AREA - EXACT REFERENCE
export function ProfileWidget({ profile, className }: ProfileWidgetProps) {
  return (
    <div 
      className={`mb-10 flex h-40 w-full flex-col justify-between rounded-[26px] p-6 text-white ${className || ''}`}
      style={LIQUID_GLASS_STYLE}
    >
      <div className="flex items-start justify-between">
        <div className="h-12 w-12 rounded-full overflow-hidden shadow-lg">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name || "Avatar"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-white text-lg font-bold">
              {(profile.full_name || profile.username || "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <span className="text-xs font-medium uppercase tracking-wider opacity-70">Portfolio</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold leading-tight drop-shadow-md">{profile.full_name || profile.username}</h1>
        {profile.bio && (
          <p className="text-sm font-medium opacity-90 drop-shadow-md">{profile.bio}</p>
        )}
      </div>
    </div>
  )
}
