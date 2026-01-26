"use client"

import { SYSTEM_FONT, SYSTEM_FONT_DISPLAY } from "@/lib/ios-constants"
import { Database } from "@/lib/types/schema"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

interface ProfileWidgetProps {
  profile: Profile
  className?: string
}

/**
 * iOS Widget Style Profile Card
 * - White background with subtle shadow
 * - Rounded corners (20px)
 * - Avatar + Name + Bio
 */
export function ProfileWidget({ profile, className }: ProfileWidgetProps) {
  return (
    <div 
      className={`flex w-full flex-col gap-3 rounded-[20px] bg-white p-4 ${className || ''}`}
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex items-center gap-3">
        {/* Avatar - 48px circle */}
        <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200 flex-shrink-0">
          {profile.avatar_url ? (
            <img 
              src={profile.avatar_url} 
              alt={profile.full_name || "Avatar"} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white text-lg font-bold">
              {(profile.full_name || profile.username || "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Name and Bio */}
        <div className="flex flex-col min-w-0">
          <h2 
            className="text-[17px] font-semibold text-gray-900 truncate"
            style={{ fontFamily: SYSTEM_FONT_DISPLAY }}
          >
            {profile.full_name || profile.username}
          </h2>
          {profile.bio && (
            <p 
              className="text-[13px] text-gray-500 line-clamp-1"
              style={{ fontFamily: SYSTEM_FONT }}
            >
              {profile.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
