import { IOS_OFFICIAL_ICONS } from "@/lib/utils/itunes-api";

/**
 * App Icon Resolution System
 *
 * Fetches REAL app icons from official sources ONLY.
 * STRICTLY PROHIBITS generic/generated icons.
 *
 * Priority:
 * 1. Official App Store CDN (via itunes-api.ts)
 * 2. Favicon (for non-app websites)
 */

// Domain to App Name mapping for official icons
const DOMAIN_TO_APP_NAME: Record<string, string> = {
  // Social
  "twitter.com": "X",
  "x.com": "X",
  "instagram.com": "Instagram",
  "facebook.com": "Facebook",
  "tiktok.com": "TikTok",
  "linkedin.com": "LinkedIn",
  "youtube.com": "YouTube",
  "spotify.com": "Spotify",
  "netflix.com": "Netflix",
  "twitch.tv": "Twitch",
  "github.com": "GitHub",
  "notion.so": "Notion",
  "slack.com": "Slack",
  "figma.com": "Figma",

  // Apple System Apps (Web versions)
  "apple.com/calendar": "カレンダー",
  "apple.com/photos": "写真",
  "apple.com/camera": "カメラ",
  "apple.com/clock": "時計",
  "weather.apple.com": "天気",
  "apple.com/reminders": "リマインダー",
  "apps.apple.com": "App Store",
  "apple.com/health": "ヘルスケア",
  "apple.com/home": "ホーム",
  "apple.com/wallet": "Wallet",
  "apple.com/settings": "設定",
  "apple.com/safari": "Safari",
  "apple.com/messages": "メッセージ",
  "music.apple.com": "ミュージック",
};

// Extra official icons for common apps not in itunes-api.ts initial list
// Using iTunes Search API result URLs
const EXTRA_OFFICIAL_ICONS: Record<string, string> = {
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
 * Get the best available app icon URL for a given domain
 * Synchronous version for instant UI feedback using cached definitions
 */
export function getAppIconUrl(url: string, size: number = 512): string {
  try {
    const domain = extractDomain(url);

    // 1. Check mapped official icons
    const appName =
      DOMAIN_TO_APP_NAME[domain] ||
      (Object.keys(DOMAIN_TO_APP_NAME).find((d) => url.includes(d)) &&
        DOMAIN_TO_APP_NAME[
          Object.keys(DOMAIN_TO_APP_NAME).find((d) => url.includes(d))!
        ]);

    if (appName) {
      const officialIcon =
        IOS_OFFICIAL_ICONS[appName] || EXTRA_OFFICIAL_ICONS[appName];
      if (officialIcon) return officialIcon;
    }

    // 2. Fallback to Google Favicon for unknown sites
    // This is safer than generating a fake icon
    return `https://www.google.com/s2/favicons?domain=${url}&sz=${Math.min(size, 256)}`;
  } catch {
    return `https://www.google.com/s2/favicons?domain=${url}&sz=${Math.min(size, 256)}`;
  }
}

/**
 * Extract domain from URL
 */
function extractDomain(url: string): string {
  try {
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }
    const urlObj = new URL(url);
    return urlObj.hostname.replace("www.", "");
  } catch {
    return url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
  }
}

/**
 * Check if a domain has a cached high-quality icon
 */
export function hasHighQualityIcon(url: string): boolean {
  const domain = extractDomain(url);
  const appName =
    DOMAIN_TO_APP_NAME[domain] ||
    (Object.keys(DOMAIN_TO_APP_NAME).find((d) => url.includes(d)) &&
      DOMAIN_TO_APP_NAME[
        Object.keys(DOMAIN_TO_APP_NAME).find((d) => url.includes(d))!
      ]);

  if (!appName) return false;
  return !!(IOS_OFFICIAL_ICONS[appName] || EXTRA_OFFICIAL_ICONS[appName]);
}
