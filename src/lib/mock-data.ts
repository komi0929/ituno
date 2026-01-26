import { Database } from "@/lib/types/schema"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type Link = Database["public"]["Tables"]["links"]["Row"]

// Vibrant iOS-style gradient wallpaper
const WALLPAPER_URL = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80"

export const MOCK_PROFILE: Profile = {
  id: "mock-user-id",
  username: "demo",
  full_name: "Antigravity",
  avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Antigravity",
  bio: "Building the future of UI.",
  theme_config: {
    wallpaper: WALLPAPER_URL,
    textColor: "#ffffff"
  },
  created_at: new Date().toISOString()
}

/**
 * High-quality app icon URLs
 * Using official CDNs or high-resolution sources for crisp rendering at 60x60px
 */
const APP_ICONS = {
  // Grid apps - high resolution PNG/SVG sources
  twitter: "https://abs.twimg.com/responsive-web/client-web/icon-ios.77d25eba.png",
  instagram: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/240px-Instagram_logo_2016.svg.png",
  youtube: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/240px-YouTube_full-color_icon_%282017%29.svg.png",
  github: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  
  // Dock apps - high resolution sources  
  phone: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Phone_icon_ios.svg/240px-Phone_icon_ios.svg.png",
  whatsapp: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/240px-WhatsApp.svg.png",
  discord: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png",
  spotify: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/240px-Spotify_icon.svg.png",
}

export const MOCK_LINKS: Link[] = [
  {
    id: "1",
    user_id: "mock-user-id",
    title: "Twitter",
    url: "https://twitter.com",
    icon_url: APP_ICONS.twitter,
    is_docked: false,
    sort_order: 0,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    user_id: "mock-user-id",
    title: "Instagram",
    url: "https://instagram.com",
    icon_url: APP_ICONS.instagram,
    is_docked: false,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    user_id: "mock-user-id",
    title: "YouTube",
    url: "https://youtube.com",
    icon_url: APP_ICONS.youtube,
    is_docked: false,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    user_id: "mock-user-id",
    title: "GitHub",
    url: "https://github.com",
    icon_url: APP_ICONS.github,
    is_docked: false,
    sort_order: 3,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-1",
    user_id: "mock-user-id",
    title: "Phone",
    url: "tel:+1234567890",
    icon_url: APP_ICONS.phone,
    is_docked: true,
    sort_order: 0,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-2",
    user_id: "mock-user-id",
    title: "WhatsApp",
    url: "https://whatsapp.com",
    icon_url: APP_ICONS.whatsapp,
    is_docked: true,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-3",
    user_id: "mock-user-id",
    title: "Discord",
    url: "https://discord.com",
    icon_url: APP_ICONS.discord,
    is_docked: true,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "dock-4",
    user_id: "mock-user-id",
    title: "Spotify",
    url: "https://spotify.com",
    icon_url: APP_ICONS.spotify,
    is_docked: true,
    sort_order: 3,
    created_at: new Date().toISOString()
  }
]
