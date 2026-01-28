import { Database } from "@/lib/types/schema";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Link = Database["public"]["Tables"]["links"]["Row"];

// iOS 13+ style gradient wallpaper (matching reference image)
const WALLPAPER_URL =
  "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80";

export const MOCK_PROFILE: Profile = {
  id: "mock-user-id",
  username: "demo",
  full_name: "Demo User",
  avatar_url: null,
  bio: "Welcome to itone",
  theme_config: {
    wallpaper: WALLPAPER_URL,
    textColor: "#ffffff",
  },
  created_at: new Date().toISOString(),
};

/**
 * Demo links with LOCAL icon paths (hardcoded)
 */
export const MOCK_LINKS: Link[] = [
  // Row 1
  {
    id: "1",
    user_id: "mock-user-id",
    title: "カレンダー",
    url: "https://apple.com/calendar",
    icon_url: "/icons/calendar.png",
    is_docked: false,
    sort_order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "mock-user-id",
    title: "写真",
    url: "https://apple.com/photos",
    icon_url: "/icons/photos.png",
    is_docked: false,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "mock-user-id",
    title: "カメラ",
    url: "https://apple.com/camera",
    icon_url: "/icons/camera.png",
    is_docked: false,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    user_id: "mock-user-id",
    title: "時計",
    url: "https://apple.com/clock",
    icon_url: "/icons/clock.png",
    is_docked: false,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },

  // Row 2
  {
    id: "5",
    user_id: "mock-user-id",
    title: "天気",
    url: "https://weather.apple.com",
    icon_url: "/icons/weather.png",
    is_docked: false,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    user_id: "mock-user-id",
    title: "リマインダー",
    url: "https://apple.com/reminders",
    icon_url: "/icons/reminders.png",
    is_docked: false,
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    user_id: "mock-user-id",
    title: "App Store",
    url: "https://apps.apple.com",
    icon_url: "/icons/app_store.png",
    is_docked: false,
    sort_order: 6,
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    user_id: "mock-user-id",
    title: "ヘルスケア",
    url: "https://apple.com/health",
    icon_url: "/icons/health.png",
    is_docked: false,
    sort_order: 7,
    created_at: new Date().toISOString(),
  },

  // Row 3
  {
    id: "9",
    user_id: "mock-user-id",
    title: "ホーム",
    url: "https://apple.com/home",
    icon_url: "/icons/home.png",
    is_docked: false,
    sort_order: 8,
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    user_id: "mock-user-id",
    title: "Wallet",
    url: "https://apple.com/wallet",
    icon_url: "/icons/wallet.png",
    is_docked: false,
    sort_order: 9,
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    user_id: "mock-user-id",
    title: "設定",
    url: "https://apple.com/settings",
    icon_url: "/icons/settings.png",
    is_docked: false,
    sort_order: 10,
    created_at: new Date().toISOString(),
  },

  // Dock Apps
  {
    id: "dock-1",
    user_id: "mock-user-id",
    title: "電話",
    url: "tel:+1234567890",
    icon_url: "/icons/phone.png",
    is_docked: true,
    sort_order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-2",
    user_id: "mock-user-id",
    title: "Safari",
    url: "https://apple.com/safari",
    icon_url: "/icons/safari.png",
    is_docked: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-3",
    user_id: "mock-user-id",
    title: "メッセージ",
    url: "https://apple.com/messages",
    icon_url: "/icons/messages.png",
    is_docked: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-4",
    user_id: "mock-user-id",
    title: "ミュージック",
    url: "https://music.apple.com",
    icon_url: "/icons/music.png",
    is_docked: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
];
