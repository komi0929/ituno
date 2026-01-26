
"use client"

import { LIQUID_PHYSICS } from "@/lib/ios-physics"
import { Database } from "@/lib/types/schema"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

interface ProfileWidgetProps {
  profile: Profile
  className?: string
}

// PROFILE WIDGET (The "Water Bubble")
export function ProfileWidget({ profile, className }: ProfileWidgetProps) {
  return (
    <div 
      className={`group mb-10 flex h-48 w-full flex-col justify-between rounded-[32px] p-6 text-white transition-transform duration-500 hover:scale-[1.02] ${className || ''}`}
      style={LIQUID_PHYSICS}
    >
      <div className="flex items-start justify-between">
        <div className="relative h-14 w-14 overflow-hidden rounded-full shadow-inner">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-white text-xl font-bold">
              {(profile.full_name || profile.username || "U").charAt(0).toUpperCase()}
            </div>
          )}
          {/* Gloss overlay on avatar */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">Portfolio</span>
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight drop-shadow-sm">{profile.full_name || profile.username}</h1>
        {profile.bio && (
          <p className="text-sm font-medium text-white/80">{profile.bio}</p>
        )}
      </div>
    </div>
  )
}
