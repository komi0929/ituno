import { Database } from "@/lib/types/schema";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Link = Database["public"]["Tables"]["links"]["Row"];

// iOS 13 style vibrant gradient wallpaper
const WALLPAPER_URL =
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80";

export const MOCK_PROFILE: Profile = {
  id: "mock-user-id",
  username: "demo",
  full_name: "Antigravity",
  avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Antigravity",
  bio: "Building the future of UI.",
  theme_config: {
    wallpaper: WALLPAPER_URL,
    textColor: "#ffffff",
  },
  created_at: new Date().toISOString(),
};

/**
 * Demo links matching reference iOS home screen layout
 * Using icons8.com CDN for reliable iOS-style icons
 *
 * Row 1: カレンダー, 写真, カメラ, 時計
 * Row 2: 天気, リマインダー, App Store, ヘルスケア
 * Row 3: ホーム, Wallet, 設定
 * Dock: Phone, Safari, Messages, Music
 */
export const MOCK_LINKS: Link[] = [
  // Row 1
  {
    id: "1",
    user_id: "mock-user-id",
    title: "カレンダー",
    url: "https://apple.com/calendar",
    icon_url: "https://img.icons8.com/fluency/512/calendar.png",
    is_docked: false,
    sort_order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "mock-user-id",
    title: "写真",
    url: "https://apple.com/photos",
    icon_url: "https://img.icons8.com/fluency/512/photos.png",
    is_docked: false,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "mock-user-id",
    title: "カメラ",
    url: "https://apple.com/camera",
    icon_url: "https://img.icons8.com/fluency/512/camera.png",
    is_docked: false,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    user_id: "mock-user-id",
    title: "時計",
    url: "https://apple.com/clock",
    icon_url: "https://img.icons8.com/fluency/512/clock.png",
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
    icon_url: "https://img.icons8.com/fluency/512/sun.png",
    is_docked: false,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    user_id: "mock-user-id",
    title: "リマインダー",
    url: "https://apple.com/reminders",
    icon_url: "https://img.icons8.com/fluency/512/reminders.png",
    is_docked: false,
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    user_id: "mock-user-id",
    title: "App Store",
    url: "https://apps.apple.com",
    icon_url: "https://img.icons8.com/fluency/512/app-store.png",
    is_docked: false,
    sort_order: 6,
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    user_id: "mock-user-id",
    title: "ヘルスケア",
    url: "https://apple.com/health",
    icon_url: "https://img.icons8.com/fluency/512/heart-with-pulse.png",
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
    icon_url: "https://img.icons8.com/fluency/512/smart-home-connection.png",
    is_docked: false,
    sort_order: 8,
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    user_id: "mock-user-id",
    title: "Wallet",
    url: "https://apple.com/wallet",
    icon_url: "https://img.icons8.com/fluency/512/wallet.png",
    is_docked: false,
    sort_order: 9,
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    user_id: "mock-user-id",
    title: "設定",
    url: "https://apple.com/settings",
    icon_url: "https://img.icons8.com/fluency/512/settings.png",
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
    icon_url: "https://img.icons8.com/fluency/512/phone.png",
    is_docked: true,
    sort_order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-2",
    user_id: "mock-user-id",
    title: "Safari",
    url: "https://apple.com/safari",
    icon_url: "https://img.icons8.com/fluency/512/safari.png",
    is_docked: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-3",
    user_id: "mock-user-id",
    title: "メッセージ",
    url: "https://apple.com/messages",
    icon_url: "https://img.icons8.com/fluency/512/speech-bubble.png",
    is_docked: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-4",
    user_id: "mock-user-id",
    title: "ミュージック",
    url: "https://music.apple.com",
    icon_url: "https://img.icons8.com/fluency/512/apple-music.png",
    is_docked: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
];
