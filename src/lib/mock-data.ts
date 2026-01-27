import { Database } from "@/lib/types/schema";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Link = Database["public"]["Tables"]["links"]["Row"];

// iOS 13 style vibrant orange/red gradient wallpaper (matching reference image)
const WALLPAPER_URL =
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80";

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
 * Row 1: カレンダー, 写真, カメラ, 時計
 * Row 2: 天気, リマインダー, App Store, ヘルスケア
 * Row 3: ホーム, Wallet, 設定, (empty)
 * Dock: Phone, Safari, Messages, Music
 */
export const MOCK_LINKS: Link[] = [
  // Row 1
  {
    id: "1",
    user_id: "mock-user-id",
    title: "カレンダー",
    url: "https://apple.com/calendar",
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d6/60/5a/d6605ac4-7db0-5e76-4a78-22c5b8e84c00/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
    is_docked: false,
    sort_order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "mock-user-id",
    title: "写真",
    url: "https://apple.com/photos",
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c8/c0/ca/c8c0ca52-1f1e-6b54-2b75-0d82ac7ad1d2/AppIcon-85-220-0-4-0-0-2x.png/512x512bb.jpg",
    is_docked: false,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "mock-user-id",
    title: "カメラ",
    url: "https://apple.com/camera",
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/e1/2e/1d/e12e1d58-5b06-5881-aea8-c2e8f6d45c8c/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
    is_docked: false,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    user_id: "mock-user-id",
    title: "時計",
    url: "https://apple.com/clock",
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/ec/3c/1b/ec3c1b8c-fbf9-e0aa-b8e9-bf2b0a1ea6b1/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
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
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/d4/1a/5c/d41a5ca7-cdb3-b92e-7a5e-c4f0a1db8fbb/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
    is_docked: false,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    user_id: "mock-user-id",
    title: "リマインダー",
    url: "https://apple.com/reminders",
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/55/a1/bf/55a1bf6a-fc89-e0ea-fc01-67e8c10dd5f6/AppIcon-0-85-220-0-4-0-0-2x.png/512x512bb.jpg",
    is_docked: false,
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    user_id: "mock-user-id",
    title: "App Store",
    url: "https://apps.apple.com",
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ab/61/e6/ab61e657-4e97-18f6-b63a-2dd0e97d7bf0/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
    is_docked: false,
    sort_order: 6,
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    user_id: "mock-user-id",
    title: "ヘルスケア",
    url: "https://apple.com/health",
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/af/87/f8/af87f858-a1fb-3c2a-e49b-f5f6f22fea91/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
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
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/c6/b9/35/c6b93509-8a57-5867-d239-8c706a03ef5f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
    is_docked: false,
    sort_order: 8,
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    user_id: "mock-user-id",
    title: "Wallet",
    url: "https://apple.com/wallet",
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/90/26/a1/9026a17b-1a0d-a4bb-8c22-91b0a9e6fe21/Wallet-0-85-220-2x.png/512x512bb.jpg",
    is_docked: false,
    sort_order: 9,
    created_at: new Date().toISOString(),
  },
  {
    id: "11",
    user_id: "mock-user-id",
    title: "設定",
    url: "https://apple.com/settings",
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/6d/a8/b5/6da8b510-3a7d-3ced-d1e5-03db9f2c6e96/AppIcon-85-220-0-4-0-0-2x.png/512x512bb.jpg",
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
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/8a/c8/e1/8ac8e15f-e09d-6f27-6ad9-8f7aa5af2380/AppIcon-0-1x_U007emarketing-0-7-0-85-220-0.png/512x512bb.jpg",
    is_docked: true,
    sort_order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-2",
    user_id: "mock-user-id",
    title: "Safari",
    url: "https://apple.com/safari",
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c8/d4/9c/c8d49c05-3e09-9b50-4c4c-6cc56c91da11/AppIcon-0-85-220-0-4-0-0-2x.png/512x512bb.jpg",
    is_docked: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-3",
    user_id: "mock-user-id",
    title: "メッセージ",
    url: "https://apple.com/messages",
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/8b/13/e3/8b13e3d5-90f0-b3f7-7d94-2fe8ef0e11cc/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
    is_docked: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "dock-4",
    user_id: "mock-user-id",
    title: "ミュージック",
    url: "https://music.apple.com",
    icon_url:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/02/b5/96/02b5963a-bafb-5d1a-4e3a-c9f79de04f19/AppIcon-0-85-220-0-4-0-0-2x.png/512x512bb.jpg",
    is_docked: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
];
