
import { Database } from "@/lib/types/schema"

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

// Using Google Favicon API for reliable icon loading
const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

export const MOCK_LINKS: Link[] = [
  {
    id: "1",
    user_id: "mock-user-id",
    title: "Twitter",
    url: "https://twitter.com",
    icon_url: favicon("x.com"),
    is_docked: false,
    sort_order: 0,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    user_id: "mock-user-id",
    title: "Instagram",
    url: "https://instagram.com",
    icon_url: favicon("instagram.com"),
    is_docked: false,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    user_id: "mock-user-id",
    title: "YouTube",
    url: "https://youtube.com",
    icon_url: favicon("youtube.com"),
    is_docked: false,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    user_id: "mock-user-id",
    title: "GitHub",
    url: "https://github.com",
    icon_url: favicon("github.com"),
    is_docked: false,
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-1",
    user_id: "mock-user-id",
    title: "Phone",
    url: "tel:+1234567890",
    icon_url: favicon("facetime.apple.com"),
    is_docked: true,
    sort_order: 0,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-2",
    user_id: "mock-user-id",
    title: "WhatsApp",
    url: "https://whatsapp.com",
    icon_url: favicon("whatsapp.com"),
    is_docked: true,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-3",
    user_id: "mock-user-id",
    title: "Discord",
    url: "https://discord.com",
    icon_url: favicon("discord.com"),
    is_docked: true,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-4",
    user_id: "mock-user-id",
    title: "Spotify",
    url: "https://spotify.com",
    icon_url: favicon("spotify.com"),
    is_docked: true,
    sort_order: 3,
    created_at: new Date().toISOString()
  }
]
