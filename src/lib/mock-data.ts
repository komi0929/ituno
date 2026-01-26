
import { Database } from "@/lib/types/schema"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type Link = Database["public"]["Tables"]["links"]["Row"]

// Vibrant iOS 18 style wallpaper
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

export const MOCK_LINKS: Link[] = [
  {
    id: "1",
    user_id: "mock-user-id",
    title: "Twitter",
    url: "https://twitter.com",
    icon_url: "https://abs.twimg.com/favicons/twitter.3.ico",
    is_docked: false,
    sort_order: 0,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    user_id: "mock-user-id",
    title: "Instagram",
    url: "https://instagram.com",
    icon_url: "https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png",
    is_docked: false,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    user_id: "mock-user-id",
    title: "YouTube",
    url: "https://youtube.com",
    icon_url: "https://www.youtube.com/s/desktop/f506bd45/img/favicon_144x144.png",
    is_docked: false,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    user_id: "mock-user-id",
    title: "GitHub",
    url: "https://github.com",
    icon_url: "https://github.githubassets.com/favicons/favicon.svg",
    is_docked: false,
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-1",
    user_id: "mock-user-id",
    title: "Phone",
    url: "tel:+1234567890",
    icon_url: "https://www.google.com/s2/favicons?domain=apple.com&sz=128",
    is_docked: true,
    sort_order: 0,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-2",
    user_id: "mock-user-id",
    title: "Safari",
    url: "https://apple.com",
    icon_url: "https://www.apple.com/favicon.ico",
    is_docked: true,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-3",
    user_id: "mock-user-id",
    title: "Messages",
    url: "sms:123456789",
    icon_url: "https://www.google.com/s2/favicons?domain=messages.google.com&sz=128",
    is_docked: true,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-4",
    user_id: "mock-user-id",
    title: "Music",
    url: "https://music.apple.com",
    icon_url: "https://music.apple.com/assets/favicon/favicon-180.png",
    is_docked: true,
    sort_order: 3,
    created_at: new Date().toISOString()
  }
]
