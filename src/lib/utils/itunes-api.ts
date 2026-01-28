/**
 * iTunes Search API Helper
 *
 * Retrieves REAL iOS app icons from Apple's App Store CDN.
 * This is the ONLY acceptable method for getting iOS app icons.
 *
 * DO NOT use:
 * - icons8, flaticon, iconscout, etc.
 * - Hand-drawn or generated icons
 * - SVG approximations
 */

// Pre-defined App Store bundle IDs for common iOS apps
const IOS_APP_BUNDLE_IDS: Record<string, string> = {
  // System Apps (using related App Store apps as proxies)
  calendar: "com.apple.mobilecal",
  photos: "com.apple.photos",
  camera: "com.apple.camera",
  clock: "com.apple.mobiletimer",
  weather: "com.apple.weather",
  reminders: "com.apple.reminders",
  appstore: "com.apple.AppStore",
  health: "com.apple.Health",
  home: "com.apple.Home",
  wallet: "com.apple.Passbook",
  settings: "com.apple.Preferences",
  phone: "com.apple.mobilephone",
  safari: "com.apple.mobilesafari",
  messages: "com.apple.MobileSMS",
  music: "com.apple.Music",
  mail: "com.apple.mobilemail",
  maps: "com.apple.Maps",
  notes: "com.apple.mobilenotes",
  facetime: "com.apple.facetime",
  files: "com.apple.DocumentsApp",
};

// Pre-fetched official iOS app icon URLs (Verified 2026-01-27)
export const IOS_OFFICIAL_ICONS: Record<string, string> = {
  // Row 1
  カレンダー:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4c/26/34/4c263435-017e-d007-4e76-35749f984a86/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/512x512bb.jpg",
  Calendar:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4c/26/34/4c263435-017e-d007-4e76-35749f984a86/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/512x512bb.jpg",

  写真: "https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/91/e0/75/91e07502-3866-2670-651c-829928d22383/AppIcon-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  Photos:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/91/e0/75/91e07502-3866-2670-651c-829928d22383/AppIcon-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",

  カメラ:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/91/2a/50/912a508b-6352-2591-62a9-7c27187127b4/AppIcon-0-0-1x_U007emarketing-0-0-0-2-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
  Camera:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/91/2a/50/912a508b-6352-2591-62a9-7c27187127b4/AppIcon-0-0-1x_U007emarketing-0-0-0-2-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",

  時計: "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/7e/8e/31/7e8e312b-3665-2244-8848-18e95082164a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
  Clock:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/7e/8e/31/7e8e312b-3665-2244-8848-18e95082164a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",

  // Row 2
  天気: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/64/00/5e/64005e83-9b48-1823-74a9-d65e236113b2/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/512x512bb.jpg",
  Weather:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/64/00/5e/64005e83-9b48-1823-74a9-d65e236113b2/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/512x512bb.jpg",

  リマインダー:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/71/34/3c/71343c16-0428-2169-2f5a-350711ccba4f/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg",
  Reminders:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/71/34/3c/71343c16-0428-2169-2f5a-350711ccba4f/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg",

  "App Store":
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/55/a1/0a/55a10a11-5764-8849-c4ac-5cc65c5836be/AppIcon-0-0-1x_U007emarketing-0-10-0-0-85-220.png/512x512bb.jpg",

  ヘルスケア:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/05/29/72/05297241-1185-5ef8-47ac-54fefce90d0b/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
  Health:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/05/29/72/05297241-1185-5ef8-47ac-54fefce90d0b/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",

  // Row 3
  ホーム:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/28/05/44/280544f0-4573-0941-2679-b883021f649f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
  Home: "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/28/05/44/280544f0-4573-0941-2679-b883021f649f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",

  Wallet:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/4e/c9/76/4ec97600-4780-692a-3e4b-972175ced6df/Wallet-0-0-1x_U007emarketing-0-7-0-0-85-220.png/512x512bb.jpg",

  設定: "https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/4e/1b/47/4e1b4737-299f-fa71-5079-053644f603c4/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  Settings:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/4e/1b/47/4e1b4737-299f-fa71-5079-053644f603c4/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",

  // Dock
  電話: "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/24/76/a9/2476a911-3729-c88f-6616-568853b8f101/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
  Phone:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/24/76/a9/2476a911-3729-c88f-6616-568853b8f101/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",

  Safari:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/8e/3c/6e/8e3c6e98-e770-562a-dc85-2e66847053e9/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg",

  メッセージ:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/e5/23/e6/e523e634-1188-d56e-63f5-7973d9d6852a/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
  Messages:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/e5/23/e6/e523e634-1188-d56e-63f5-7973d9d6852a/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",

  ミュージック:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d5/45/2c/d5452c5c-3f2d-450b-bb9f-50d4f40f04c6/AppIcon-0-0-1x_U007emarketing-0-5-0-0-85-220.png/512x512bb.jpg",
  Music:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d5/45/2c/d5452c5c-3f2d-450b-bb9f-50d4f40f04c6/AppIcon-0-0-1x_U007emarketing-0-5-0-0-85-220.png/512x512bb.jpg",

  // Social & Others
  X: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/49/6d/a3/496da349-0c98-e7cb-1f66-f1e9c1dfeed5/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  Instagram:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/79/7d/57/797d5700-fd51-df39-39e9-c15ea8ea1b50/Prod-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  Facebook:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/04/53/1a/04531ab0-8a01-3dc7-df5f-a4e1a1c5e739/Icon-Pro-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  TikTok:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2d/23/c7/2d23c70c-e1e6-e1b4-21a9-1af4e92f8de4/AppIcon_TikTok-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  LinkedIn:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/27/46/58/274658f7-f9a3-23a4-cee3-f0f64bd8c203/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg",
  YouTube:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6d/83/70/6d83702a-8016-e32d-bfe5-8cfb9c5f66a5/logo_youtube_color-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg",
  Spotify:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/57/0b/ef/570bef04-087b-3c0c-7348-e5a2b60a92c0/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  Netflix:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/00/ab/39/00ab3932-4ba2-31b2-22a4-31b2e66fd9e8/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-85-220.png/512x512bb.jpg",
  Twitch:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/12/f8/80/12f8802a-dbbb-7bc5-c0a3-3b7b63c7ad93/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg",
  GitHub:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/11/4c/30/114c3009-76b0-76a0-aac0-7ebe97c16a58/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  Notion:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/66/f8/0b/66f80b10-d435-d67f-8e7c-6c23b3e8e3a4/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg",
  Slack:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/05/46/53/05465335-d8b0-1e43-99ed-d5e72a60965e/Prod-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  Figma:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/7d/09/1b/7d091b3c-b076-f907-38ec-c5dd8e0c70c4/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
};

/**
 * Get official iOS app icon URL from app name
 */
export function getOfficialAppIcon(appName: string): string | null {
  return IOS_OFFICIAL_ICONS[appName] || null;
}

/**
 * Fetch app icon from iTunes Search API
 * Use this for third-party apps
 */
export async function searchAppIcon(
  searchTerm: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=software&country=jp&limit=1`,
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Get 512x512 version
      return (
        data.results[0].artworkUrl512 ||
        data.results[0].artworkUrl100?.replace("100x100", "512x512") ||
        null
      );
    }
    return null;
  } catch (error) {
    console.error("iTunes API error:", error);
    return null;
  }
}

/**
 * Local Icon Override Map
 * Maps App Titles (from DB) to Local File Paths
 * This ensures we use the high-fidelity local icons instead of remote URLs
 */
export const LOCAL_APP_ICONS: Record<string, string> = {
  // Row 1
  カレンダー: "/icons/calendar.png",
  Calendar: "/icons/calendar.png",
  写真: "/icons/photos.png",
  Photos: "/icons/photos.png",
  カメラ: "/icons/camera.png",
  Camera: "/icons/camera.png",
  時計: "/icons/clock.png",
  Clock: "/icons/clock.png",

  // Row 2
  天気: "/icons/weather.png",
  Weather: "/icons/weather.png",
  リマインダー: "/icons/reminders.png",
  Reminders: "/icons/reminders.png",
  "App Store": "/icons/app_store.png",
  ヘルスケア: "/icons/health.png",
  Health: "/icons/health.png",

  // Row 3
  ホーム: "/icons/home.png",
  Home: "/icons/home.png",
  Wallet: "/icons/wallet.png",
  設定: "/icons/settings.png",
  Settings: "/icons/settings.png",

  // Dock
  電話: "/icons/phone.png",
  Phone: "/icons/phone.png",
  電: "/icons/phone.png", // Fallback matching
  Safari: "/icons/safari.png",
  safari: "/icons/safari.png",
  S: "/icons/safari.png", // Fallback matching
  メッセージ: "/icons/messages.png",
  Messages: "/icons/messages.png",
  メ: "/icons/messages.png", // Fallback matching
  ミュージック: "/icons/music.png",
  Music: "/icons/music.png",
  ミ: "/icons/music.png", // Fallback matching

  // Social & Extras
  X: "/icons/x.png",
  Instagram: "/icons/instagram.png",
  Facebook: "/icons/facebook.png",
  TikTok: "/icons/tiktok.png",
  LinkedIn: "/icons/linkedin.png",
  YouTube: "/icons/youtube.png",
  Spotify: "/icons/spotify.png",
  Netflix: "/icons/netflix.png",
  Twitch: "/icons/twitch.png",
  GitHub: "/icons/github.png",
  Notion: "/icons/notion.png",
  Slack: "/icons/slack.png",
  Figma: "/icons/figma.png",
};
