import { Database } from "@/lib/types/schema";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Link = Database["public"]["Tables"]["links"]["Row"];

// iOS 13 style vibrant orange/red/purple gradient wallpaper
// Using a reliable high-res gradient that matches the reference
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
 * Using reliable favicon sources for consistent display
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
    // Calendar icon - rainbow gradient with "25"
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/58d2fc4f25e5dc61af2e7d67bdf4c20c.png",
    is_docked: false,
    sort_order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "mock-user-id",
    title: "写真",
    url: "https://apple.com/photos",
    // Photos icon - colorful pinwheel
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/058fa97fdc3c53a7a25f1db7bb2d66d3.png",
    is_docked: false,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "mock-user-id",
    title: "カメラ",
    url: "https://apple.com/camera",
    // Camera icon - gray with lens
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/bd5ebfa0c54168427e5d3d3d92d9a2c7.png",
    is_docked: false,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    user_id: "mock-user-id",
    title: "時計",
    url: "https://apple.com/clock",
    // Clock icon - black with white hands
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/5c6e78e31a7f93d3c8e61c59478fbb85.png",
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
    // Weather icon - blue with sun
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/c12eda01dae18c9e139dc5b1c50130e2.png",
    is_docked: false,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    user_id: "mock-user-id",
    title: "リマインダー",
    url: "https://apple.com/reminders",
    // Reminders icon - white with colored circles
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/f56e2a7e3f9c86e70a9ebd8ac2dd74f4.png",
    is_docked: false,
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    user_id: "mock-user-id",
    title: "App Store",
    url: "https://apps.apple.com",
    // App Store icon - blue with A
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/ffc2b9d1e51f3e41a894b5c8161c1e11.png",
    is_docked: false,
    sort_order: 6,
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    user_id: "mock-user-id",
    title: "ヘルスケア",
    url: "https://apple.com/health",
    // Health icon - white with pink heart
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/8fcaf20e0b98caab64ecf62ddaaa585c.png",
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
    // Home icon - orange with house
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/90a7ec5dab3baab47eff05c16b20fb3c.png",
    is_docked: false,
    sort_order: 8,
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    user_id: "mock-user-id",
    title: "Wallet",
    url: "https://apple.com/wallet",
    // Wallet icon - black with colored cards
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/a8b4e1ae3a0a295b5a9a35a3e84c5b9d.png",
    is_docked: false,
    sort_order: 9,
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    user_id: "mock-user-id",
    title: "設定",
    url: "https://apple.com/settings",
    // Settings icon - gray with gears
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/12dfadb1b2fd9ac2e6b06f77206a0c3c.png",
    is_docked: false,
    sort_order: 10,
    created_at: new Date().toISOString(),
  },

  // Dock Apps (matching reference: Phone, Safari, Messages, Music)
  {
    id: "dock-1",
    user_id: "mock-user-id",
    title: "電話",
    url: "tel:+1234567890",
    // Phone icon - green with handset
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/abf5a0c90bf1ea0bf7c87cb67be07e07.png",
    is_docked: true,
    sort_order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-2",
    user_id: "mock-user-id",
    title: "Safari",
    url: "https://apple.com/safari",
    // Safari icon - compass
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/0e764fb3f57df5c3d4b5b854ef7ddcaa.png",
    is_docked: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-3",
    user_id: "mock-user-id",
    title: "メッセージ",
    url: "https://apple.com/messages",
    // Messages icon - green bubble
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/59871a6ae3d9ae119d6dc4c56f5d01e3.png",
    is_docked: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-4",
    user_id: "mock-user-id",
    title: "ミュージック",
    url: "https://music.apple.com",
    // Music icon - white with gradient
    icon_url:
      "https://help.apple.com/assets/676E680E6BBBB51BB90F4D92/676E681B6F2F1412980FD7CF/ja_JP/e01b14be6e4a06adbb30dc0e247ce34f.png",
    is_docked: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
];
