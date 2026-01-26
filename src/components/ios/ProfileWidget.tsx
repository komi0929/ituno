
"use client"

import { LIQUID_STYLE } from "@/lib/ios-physics"
import { Database } from "@/lib/types/schema"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

interface ProfileWidgetProps {
  profile: Profile
  className?: string
}

// WIDGET: NO BORDER, JUST VOLUME
export function ProfileWidget({ profile, className }: ProfileWidgetProps) {
  return (
    <div 
      className={`mb-8 flex h-44 w-full shrink-0 flex-col justify-between rounded-[32px] p-6 text-white transition-all active:scale-[0.98] ${className || ''}`}
      style={LIQUID_STYLE}
    >
      <div className="flex items-start justify-between">
        <div className="h-12 w-12 rounded-full overflow-hidden shadow-2xl">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-white text-xl font-bold">
              {(profile.full_name || profile.username || "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        {/* Badge: Pure Blur, No Border */}
        <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-xl">Portfolio</span>
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight drop-shadow-lg">{profile.full_name || profile.username}</h1>
        {profile.bio && (
          <p className="text-sm font-medium opacity-80 drop-shadow-md">{profile.bio}</p>
        )}
      </div>
    </div>
  )
}
