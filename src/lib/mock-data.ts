import { Database } from "@/lib/types/schema";
import { LOCAL_APP_ICONS } from "@/lib/utils/itunes-api";

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
 * Demo links using OFFICIAL iOS App Store icons
 * Icons fetched from Apple's mzstatic.com CDN
 *
 * Layout matches reference image:
 * Row 1: カレンダー, 写真, カメラ, 時計
 * Row 2: 天気, リマインダー, App Store, ヘルスケア
 * Row 3: ホーム, Wallet, 設定
 * Dock: 電話, Safari, メッセージ, ミュージック
 */
export const MOCK_LINKS: Link[] = [
  // Row 1
  {
    id: "1",
    user_id: "mock-user-id",
    title: "カレンダー",
    url: "https://apple.com/calendar",
    icon_url: LOCAL_APP_ICONS["カレンダー"],
    is_docked: false,
    sort_order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "mock-user-id",
    title: "写真",
    url: "https://apple.com/photos",
    icon_url: LOCAL_APP_ICONS["写真"],
    is_docked: false,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "mock-user-id",
    title: "カメラ",
    url: "https://apple.com/camera",
    icon_url: LOCAL_APP_ICONS["カメラ"],
    is_docked: false,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    user_id: "mock-user-id",
    title: "時計",
    url: "https://apple.com/clock",
    icon_url: LOCAL_APP_ICONS["時計"],
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
    icon_url: LOCAL_APP_ICONS["天気"],
    is_docked: false,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    user_id: "mock-user-id",
    title: "リマインダー",
    url: "https://apple.com/reminders",
    icon_url: LOCAL_APP_ICONS["リマインダー"],
    is_docked: false,
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    user_id: "mock-user-id",
    title: "App Store",
    url: "https://apps.apple.com",
    icon_url: LOCAL_APP_ICONS["App Store"],
    is_docked: false,
    sort_order: 6,
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    user_id: "mock-user-id",
    title: "ヘルスケア",
    url: "https://apple.com/health",
    icon_url: LOCAL_APP_ICONS["ヘルスケア"],
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
    icon_url: LOCAL_APP_ICONS["ホーム"],
    is_docked: false,
    sort_order: 8,
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    user_id: "mock-user-id",
    title: "Wallet",
    url: "https://apple.com/wallet",
    icon_url: LOCAL_APP_ICONS["Wallet"],
    is_docked: false,
    sort_order: 9,
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    user_id: "mock-user-id",
    title: "設定",
    url: "https://apple.com/settings",
    icon_url: LOCAL_APP_ICONS["設定"],
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
    icon_url: LOCAL_APP_ICONS["電話"],
    is_docked: true,
    sort_order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-2",
    user_id: "mock-user-id",
    title: "Safari",
    url: "https://apple.com/safari",
    icon_url: LOCAL_APP_ICONS["Safari"],
    is_docked: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-3",
    user_id: "mock-user-id",
    title: "メッセージ",
    url: "https://apple.com/messages",
    icon_url: LOCAL_APP_ICONS["メッセージ"],
    is_docked: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-4",
    user_id: "mock-user-id",
    title: "ミュージック",
    url: "https://music.apple.com",
    icon_url: LOCAL_APP_ICONS["ミュージック"],
    is_docked: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
];
