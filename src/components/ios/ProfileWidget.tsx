
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
        "relative col-span-4 flex h-[160px] w-full flex-col justify-between overflow-hidden rounded-[24px] p-5",
        // Enhanced Liquid Glass with stronger blur
        "bg-white/12 backdrop-blur-2xl",
        "border border-white/25",
        // Shadow for depth
        "shadow-[0_8px_32px_rgba(0,0,0,0.1)]",
        "transition-all duration-300 active:scale-[0.98]",
        className
      )}
      style={{
        // Specular highlight gradient for 3D glossy "wet" look
        backgroundImage: `
          linear-gradient(
            165deg,
            rgba(255,255,255,0.30) 0%,
            rgba(255,255,255,0.08) 40%,
            rgba(255,255,255,0.0) 100%
          )
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Inner highlight line at top */}
      <div 
        className="absolute top-0 left-4 right-4 h-[1px] rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.5) 80%, transparent 100%)'
        }}
      />

      {/* Top Section: Avatar */}
      <div className="flex items-start justify-between">
        <div className="h-12 w-12 overflow-hidden rounded-full border border-white/30 shadow-lg">
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

      {/* Bottom Section: Text Info */}
      <div className="flex flex-col gap-0.5">
        <h2 
          className="line-clamp-1 text-[20px] font-semibold tracking-tight text-white"
          style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif',
            textShadow: '0 1px 3px rgba(0,0,0,0.4)'
          }}
        >
          {profile.full_name || profile.username}
        </h2>
        {profile.bio && (
          <p 
            className="line-clamp-2 text-[12px] font-normal text-white/85"
            style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", sans-serif',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            {profile.bio}
          </p>
        )}
      </div>
    </div>
  )
}
