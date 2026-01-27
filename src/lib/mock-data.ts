import { Database } from "@/lib/types/schema"
import { getAppIconUrl } from "@/lib/utils/app-icons"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type Link = Database["public"]["Tables"]["links"]["Row"]

// Vibrant iOS-style gradient wallpaper
const WALLPAPER_URL = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80"

export const MOCK_PROFILE: Profile = {
  id: "mock-user-id",
  username: "demo",
  full_name: "Antigravity",
  avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Antigravity",
  bio: "Building the future of UI.",
  theme_config: {
    wallpaper: WALLPAPER_URL,
    textColor: "#ffffff"
  },
  created_at: new Date().toISOString()
}

/**
 * Demo links using REAL iOS App Store icons via iTunes Artwork API
 * These are the actual app icons from Apple's CDN
 */
export const MOCK_LINKS: Link[] = [
  // Grid Apps (visible on home screen)
  {
    id: "1",
    user_id: "mock-user-id",
    title: "Twitter",
    url: "https://twitter.com",
    icon_url: getAppIconUrl("twitter.com"),
    is_docked: false,
    sort_order: 0,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    user_id: "mock-user-id",
    title: "Instagram",
    url: "https://instagram.com",
    icon_url: getAppIconUrl("instagram.com"),
    is_docked: false,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    user_id: "mock-user-id",
    title: "YouTube",
    url: "https://youtube.com",
    icon_url: getAppIconUrl("youtube.com"),
    is_docked: false,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    user_id: "mock-user-id",
    title: "GitHub",
    url: "https://github.com",
    icon_url: getAppIconUrl("github.com"),
    is_docked: false,
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  
  // Dock Apps (bottom bar)
  {
    id: "dock-1",
    user_id: "mock-user-id",
    title: "Phone",
    url: "tel:+1234567890",
    // iOS built-in Phone app icon (green with receiver)
    icon_url: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/8a/c8/e1/8ac8e15f-e09d-6f27-6ad9-8f7aa5af2380/AppIcon-0-1x_U007emarketing-0-7-0-85-220-0.png/512x512bb.jpg",
    is_docked: true,
    sort_order: 0,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-2",
    user_id: "mock-user-id",
    title: "WhatsApp",
    url: "https://whatsapp.com",
    icon_url: getAppIconUrl("whatsapp.com"),
    is_docked: true,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-3",
    user_id: "mock-user-id",
    title: "Discord",
    url: "https://discord.com",
    icon_url: getAppIconUrl("discord.com"),
    is_docked: true,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-4",
    user_id: "mock-user-id",
    title: "Spotify",
    url: "https://spotify.com",
    icon_url: getAppIconUrl("spotify.com"),
    is_docked: true,
    sort_order: 3,
    created_at: new Date().toISOString()
  }
]
