
import { Database } from "@/lib/types/schema"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type Link = Database["public"]["Tables"]["links"]["Row"]

export const MOCK_PROFILE: Profile = {
  id: "mock-user-id",
  username: "demo",
  full_name: "Antigravity",
  avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Antigravity",
  bio: "Building the future of UI.",
  theme_config: {
    wallpaper: "https://images.unsplash.com/photo-1695503348386-2a7444c979d5?q=80&w=2670&auto=format&fit=crop", // iOS 18 style abstract
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
    icon_url: "https://www.google.com/s2/favicons?domain=twitter.com&sz=128",
    is_docked: false,
    sort_order: 0,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    user_id: "mock-user-id",
    title: "Instagram",
    url: "https://instagram.com",
    icon_url: "https://www.google.com/s2/favicons?domain=instagram.com&sz=128",
    is_docked: false,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    user_id: "mock-user-id",
    title: "YouTube",
    url: "https://youtube.com",
    icon_url: "https://www.google.com/s2/favicons?domain=youtube.com&sz=128",
    is_docked: false,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    user_id: "mock-user-id",
    title: "GitHub",
    url: "https://github.com",
    icon_url: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
    is_docked: false,
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-1",
    user_id: "mock-user-id",
    title: "Mail",
    url: "mailto:hello@example.com",
    icon_url: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
    is_docked: true,
    sort_order: 0,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-2",
    user_id: "mock-user-id",
    title: "Message",
    url: "sms:123456789",
    icon_url: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
    is_docked: true,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-3",
    user_id: "mock-user-id",
    title: "Safari",
    url: "https://apple.com",
    icon_url: "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",
    is_docked: true,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-4",
    user_id: "mock-user-id",
    title: "Music",
    url: "https://music.apple.com",
    icon_url: "https://cdn-icons-png.flaticon.com/512/5968/5968832.png",
    is_docked: true,
    sort_order: 3,
    created_at: new Date().toISOString()
  }
]
