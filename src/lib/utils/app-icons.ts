/**
 * App Icon Resolution System
 * 
 * Fetches REAL app icons from official sources:
 * 1. iTunes Artwork API - Official iOS app icons (512x512)
 * 2. Clearbit Logo API - High-quality company logos
 * 3. Google Favicon API - Fallback for websites
 */

// Known iOS App Store Bundle IDs for popular apps
const IOS_BUNDLE_IDS: Record<string, string> = {
  // Social Media
  'twitter.com': 'com.atebits.Tweetie2',
  'x.com': 'com.atebits.Tweetie2',
  'instagram.com': 'com.burbn.instagram',
  'facebook.com': 'com.facebook.Facebook',
  'tiktok.com': 'com.zhiliaoapp.musically',
  'snapchat.com': 'com.toyopagroup.picaboo',
  'linkedin.com': 'com.linkedin.LinkedIn',
  'pinterest.com': 'pinterest',
  'reddit.com': 'com.reddit.Reddit',
  'threads.net': 'com.burbn.barcelona',
  
  // Messaging
  'whatsapp.com': 'net.whatsapp.WhatsApp',
  'telegram.org': 'ph.telegra.Telegraph',
  'discord.com': 'com.hammerandchisel.discord',
  'messenger.com': 'com.facebook.Messenger',
  'signal.org': 'org.whispersystems.signal',
  'line.me': 'jp.naver.line',
  'wechat.com': 'com.tencent.xin',
  
  // Entertainment
  'youtube.com': 'com.google.ios.youtube',
  'spotify.com': 'com.spotify.client',
  'netflix.com': 'com.netflix.Netflix',
  'twitch.tv': 'tv.twitch',
  'soundcloud.com': 'com.soundcloud.TouchApp',
  'music.apple.com': 'com.apple.Music',
  
  // Development
  'github.com': 'com.github.stormcrow.github',
  'gitlab.com': 'com.gitlab.gitlab',
  'stackoverflow.com': 'com.stackexchange.StackExchange',
  
  // Productivity
  'notion.so': 'notion.id',
  'slack.com': 'com.tinyspeck.chatlyio',
  'figma.com': 'com.figma.FigmaPrototype',
  'trello.com': 'com.fogcreek.trello',
  
  // Other
  'paypal.com': 'com.yourcompany.PPClient',
  'venmo.com': 'net.venmo.Venmo',
  'cashapp.com': 'com.squareup.cash',
}

// Pre-cached iTunes artwork URLs for instant loading
// These are the actual 512x512 app icons from Apple's servers
const CACHED_ARTWORK_URLS: Record<string, string> = {
  // Social Media - Actual App Store artwork
  'twitter.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/49/6d/a3/496da349-0c98-e7cb-1f66-f1e9c1dfeed5/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  'x.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/49/6d/a3/496da349-0c98-e7cb-1f66-f1e9c1dfeed5/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  'instagram.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/79/7d/57/797d5700-fd51-df39-39e9-c15ea8ea1b50/Prod-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  'facebook.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/04/53/1a/04531ab0-8a01-3dc7-df5f-a4e1a1c5e739/Icon-Pro-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  'tiktok.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2d/23/c7/2d23c70c-e1e6-e1b4-21a9-1af4e92f8de4/AppIcon_TikTok-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  'linkedin.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/27/46/58/274658f7-f9a3-23a4-cee3-f0f64bd8c203/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg',
  
  // Messaging
  'whatsapp.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7e/bd/66/7ebd66dc-e1e3-d3c4-2f65-4fe71c189069/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg',
  'telegram.org': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/af/51/42/af51424f-b35e-6ce2-34ea-07b6fe5a2a3d/AppIconLLC-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  'discord.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c7/13/aa/c713aa4e-8c6e-7d8d-f33a-2bb37fe5e20a/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  
  // Entertainment
  'youtube.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6d/83/70/6d83702a-8016-e32d-bfe5-8cfb9c5f66a5/logo_youtube_color-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg',
  'spotify.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/57/0b/ef/570bef04-087b-3c0c-7348-e5a2b60a92c0/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  'netflix.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/00/ab/39/00ab3932-4ba2-31b2-22a4-31b2e66fd9e8/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-85-220.png/512x512bb.jpg',
  'twitch.tv': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/12/f8/80/12f8802a-dbbb-7bc5-c0a3-3b7b63c7ad93/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg',
  
  // Development
  'github.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/11/4c/30/114c3009-76b0-76a0-aac0-7ebe97c16a58/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  
  // Productivity  
  'notion.so': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/66/f8/0b/66f80b10-d435-d67f-8e7c-6c23b3e8e3a4/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg',
  'slack.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/05/46/53/05465335-d8b0-1e43-99ed-d5e72a60965e/Prod-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
  'figma.com': 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/7d/09/1b/7d091b3c-b076-f907-38ec-c5dd8e0c70c4/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
}

/**
 * Get the best available app icon URL for a given domain
 * Priority: Cached iTunes artwork > Clearbit > Google Favicon
 */
export function getAppIconUrl(url: string, size: number = 512): string {
  try {
    const domain = extractDomain(url)
    
    // 1. Check cached iTunes artwork (highest quality)
    if (CACHED_ARTWORK_URLS[domain]) {
      // Return appropriate size
      return CACHED_ARTWORK_URLS[domain].replace('512x512', `${size}x${size}`)
    }
    
    // 2. Use Clearbit Logo API (high quality company logos)
    // Returns square logo images, good for most brands
    return `https://logo.clearbit.com/${domain}?size=${size}`
    
  } catch {
    // 3. Fallback to Google Favicon
    return `https://www.google.com/s2/favicons?domain=${url}&sz=${Math.min(size, 256)}`
  }
}

/**
 * Extract domain from URL
 */
function extractDomain(url: string): string {
  try {
    // Handle URLs with or without protocol
    if (!url.startsWith('http')) {
      url = 'https://' + url
    }
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    // If URL parsing fails, try to extract domain directly
    return url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]
  }
}

/**
 * Check if a domain has a cached high-quality icon
 */
export function hasHighQualityIcon(url: string): boolean {
  const domain = extractDomain(url)
  return domain in CACHED_ARTWORK_URLS
}

/**
 * Get bundle ID for a domain (useful for future iTunes API lookups)
 */
export function getBundleId(url: string): string | undefined {
  const domain = extractDomain(url)
  return IOS_BUNDLE_IDS[domain]
}
