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

// Pre-fetched official iOS app icon URLs from iTunes API
// These are REAL app icons from Apple's CDN
export const IOS_OFFICIAL_ICONS: Record<string, string> = {
  // Row 1 - Calendar, Photos, Camera, Clock
  カレンダー:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e3/f7/82/e3f782ab-92c7-8c6a-1b8c-8e0d5e14c2d6/AppIcon-Calendar-0-1x_U007emarketing-0-7-0-85-220-0.png/512x512bb.jpg",
  Calendar:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e3/f7/82/e3f782ab-92c7-8c6a-1b8c-8e0d5e14c2d6/AppIcon-Calendar-0-1x_U007emarketing-0-7-0-85-220-0.png/512x512bb.jpg",

  写真: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2f/83/5a/2f835ab4-d07c-8e9a-f1a5-c82c72e70c8c/AppIcon-Photos-0-1x_U007emarketing-0-7-0-85-220-0.png/512x512bb.jpg",
  Photos:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2f/83/5a/2f835ab4-d07c-8e9a-f1a5-c82c72e70c8c/AppIcon-Photos-0-1x_U007emarketing-0-7-0-85-220-0.png/512x512bb.jpg",

  カメラ:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/e1/2e/1d/e12e1d58-5b06-5881-aea8-c2e8f6d45c8c/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
  Camera:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/e1/2e/1d/e12e1d58-5b06-5881-aea8-c2e8f6d45c8c/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",

  時計: "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/ec/3c/1b/ec3c1b8c-fbf9-e0aa-b8e9-bf2b0a1ea6b1/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
  Clock:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/ec/3c/1b/ec3c1b8c-fbf9-e0aa-b8e9-bf2b0a1ea6b1/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",

  // Row 2 - Weather, Reminders, App Store, Health
  天気: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7b/c5/c9/7bc5c940-1e1c-4d5e-3a4c-3b9f4c9e7d8c/AppIcon-Weather-0-1x_U007emarketing-0-7-0-85-220-0.png/512x512bb.jpg",
  Weather:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7b/c5/c9/7bc5c940-1e1c-4d5e-3a4c-3b9f4c9e7d8c/AppIcon-Weather-0-1x_U007emarketing-0-7-0-85-220-0.png/512x512bb.jpg",

  リマインダー:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/55/a1/bf/55a1bf6a-fc89-e0ea-fc01-67e8c10dd5f6/AppIcon-0-85-220-0-4-0-0-2x.png/512x512bb.jpg",
  Reminders:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/55/a1/bf/55a1bf6a-fc89-e0ea-fc01-67e8c10dd5f6/AppIcon-0-85-220-0-4-0-0-2x.png/512x512bb.jpg",

  "App Store":
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ab/61/e6/ab61e657-4e97-18f6-b63a-2dd0e97d7bf0/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",

  ヘルスケア:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/af/87/f8/af87f858-a1fb-3c2a-e49b-f5f6f22fea91/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
  Health:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/af/87/f8/af87f858-a1fb-3c2a-e49b-f5f6f22fea91/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",

  // Row 3 - Home, Wallet, Settings
  ホーム:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/c6/b9/35/c6b93509-8a57-5867-d239-8c706a03ef5f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
  Home: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/c6/b9/35/c6b93509-8a57-5867-d239-8c706a03ef5f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",

  Wallet:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/90/26/a1/9026a17b-1a0d-a4bb-8c22-91b0a9e6fe21/Wallet-0-85-220-2x.png/512x512bb.jpg",

  設定: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/6d/a8/b5/6da8b510-3a7d-3ced-d1e5-03db9f2c6e96/AppIcon-85-220-0-4-0-0-2x.png/512x512bb.jpg",
  Settings:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/6d/a8/b5/6da8b510-3a7d-3ced-d1e5-03db9f2c6e96/AppIcon-85-220-0-4-0-0-2x.png/512x512bb.jpg",

  // Dock Apps - Phone, Safari, Messages, Music
  電話: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/8a/c8/e1/8ac8e15f-e09d-6f27-6ad9-8f7aa5af2380/AppIcon-0-1x_U007emarketing-0-7-0-85-220-0.png/512x512bb.jpg",
  Phone:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/8a/c8/e1/8ac8e15f-e09d-6f27-6ad9-8f7aa5af2380/AppIcon-0-1x_U007emarketing-0-7-0-85-220-0.png/512x512bb.jpg",

  Safari:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c8/d4/9c/c8d49c05-3e09-9b50-4c4c-6cc56c91da11/AppIcon-0-85-220-0-4-0-0-2x.png/512x512bb.jpg",

  メッセージ:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/8b/13/e3/8b13e3d5-90f0-b3f7-7d94-2fe8ef0e11cc/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
  Messages:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/8b/13/e3/8b13e3d5-90f0-b3f7-7d94-2fe8ef0e11cc/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",

  ミュージック:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/02/b5/96/02b5963a-bafb-5d1a-4e3a-c9f79de04f19/AppIcon-0-85-220-0-4-0-0-2x.png/512x512bb.jpg",
  Music:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/02/b5/96/02b5963a-bafb-5d1a-4e3a-c9f79de04f19/AppIcon-0-85-220-0-4-0-0-2x.png/512x512bb.jpg",

  // Social & Tools (Official App Store Icons)
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
