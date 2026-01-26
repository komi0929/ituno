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
 * iOS App Store Style Icons
 * These are FULL app icons (square images that fill the entire squircle)
 * NOT logos. The squircle mask is applied by the container.
 * 
 * Using iTunes Artwork API for official high-res app icons
 */
const ITUNES_ICON = (appId: string) => 
  `https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/${appId}/512x512bb.jpg`

// High-quality app icon URLs - actual iOS app icons that fill the squircle
const APP_ICONS = {
  // Social Media - Full square app icons
  twitter: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/X_logo_2023_%28white%29.png/240px-X_logo_2023_%28white%29.png",
  instagram: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/240px-Instagram_logo_2022.svg.png", 
  youtube: "https://lh3.googleusercontent.com/3_OFn2skqHXk-UQ-9RUdNrDl_HxJPN3BO6cG8v2V5G0HYKO0Tyl4OQZSQdNL_VU_W-G8=s240",
  github: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
  
  // Dock apps - Using full iOS-style app icons
  // Phone: Blue gradient with white phone icon
  phone: "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#5EE07A"/>
          <stop offset="100%" style="stop-color:#34C759"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill="url(#phoneGrad)"/>
      <path d="M35 30C35 27 37 25 40 25H48L52 35L48 42C48 42 52 52 59 59C66 66 76 70 76 70L83 66L93 70V78C93 81 91 83 88 83C60 83 35 58 35 30Z" fill="white"/>
    </svg>
  `),
  
  // WhatsApp: Green gradient with white phone icon (iOS style)
  whatsapp: "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="waGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style="stop-color:#20B038"/>
          <stop offset="100%" style="stop-color:#60D66A"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill="url(#waGrad)"/>
      <path d="M60 20C38 20 20 38 20 60C20 68 22.5 75.5 27 81.5L22 98L39.5 93.5C45 97 51.5 99 58.5 99L60 99C82 99 100 81 100 59C100 37 82 20 60 20ZM60 90C53 90 47 88 42 85L30 88L33 77C29 72 27 66 27 60C27 42 42 27 60 27C78 27 93 42 93 60C93 78 78 93 60 93V90ZM78 69C77 68 75 67 74 67L69 65C68 64 67 64 66 65C65 66 63 68 62 69C61 70 60 70 59 70C52 66 47 61 44 54C43 53 44 52 45 51L47 49C47 48 48 47 48 46C48 45 48 44 48 44L46 40C45 38 44 38 43 38H41C40 38 38 39 37 40C34 43 33 47 33 51C33 56 35 61 40 67C48 77 58 82 69 84C73 85 76 84 79 82C81 80 83 77 83 74C83 73 83 72 78 69Z" fill="white"/>
    </svg>
  `),
  
  // Discord: Blurple background with Clyde icon (iOS style)
  discord: "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" fill="#5865F2"/>
      <path d="M91.7 32.5c-6.1-2.8-12.6-4.8-19.4-5.9-.8 1.5-1.8 3.5-2.5 5.1-7.2-1.1-14.3-1.1-21.4 0-.7-1.6-1.7-3.6-2.5-5.1-6.8 1.1-13.4 3.1-19.4 5.9C15.3 51 11.4 69 13.3 86.6c8.1 6 16 9.6 23.7 12 1.9-2.6 3.6-5.3 5-8.2-2.7-1-5.4-2.3-7.9-3.8.7-.5 1.3-1 1.9-1.5 15.1 7 31.5 7 46.4 0 .6.5 1.3 1 1.9 1.5-2.5 1.5-5.2 2.8-7.9 3.8 1.5 2.9 3.1 5.6 5 8.2 7.7-2.4 15.6-6 23.7-12 2.2-20.4-3.9-38.1-15.4-53.6zM44.3 74.9c-4.6 0-8.4-4.3-8.4-9.5s3.7-9.5 8.4-9.5c4.7 0 8.5 4.3 8.4 9.5 0 5.2-3.7 9.5-8.4 9.5zm31.4 0c-4.6 0-8.4-4.3-8.4-9.5s3.7-9.5 8.4-9.5c4.7 0 8.5 4.3 8.4 9.5 0 5.2-3.7 9.5-8.4 9.5z" fill="white"/>
    </svg>
  `),
  
  // Spotify: Green background with sound waves (iOS style)
  spotify: "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" fill="#1DB954"/>
      <path d="M60 15C35.1 15 15 35.1 15 60s20.1 45 45 45 45-20.1 45-45S84.9 15 60 15zm20.7 65c-.8 1.3-2.5 1.7-3.8.9-10.5-6.4-23.7-7.9-39.3-4.3-1.5.3-3-.6-3.4-2.1-.3-1.5.6-3 2.1-3.4 17-3.9 31.6-2.2 43.5 5 1.3.8 1.7 2.6.9 3.9zm5.5-12.3c-1 1.6-3.1 2.1-4.7 1.1-12-7.4-30.3-9.5-44.5-5.2-1.8.5-3.7-.5-4.3-2.3-.5-1.8.5-3.7 2.3-4.3 16.2-4.9 36.4-2.5 50.1 5.9 1.6 1 2.1 3.2 1.1 4.8zm.5-12.8C72.4 46.4 48.4 45.2 33.6 49.7c-2.2.7-4.5-.6-5.1-2.7-.7-2.2.6-4.5 2.7-5.1 17-5.2 45.2-4.2 63 6.7 2 1.2 2.6 3.8 1.4 5.7-1.2 1.9-3.7 2.5-5.7 1.4l-.2.2z" fill="white"/>
    </svg>
  `),
}

export const MOCK_LINKS: Link[] = [
  {
    id: "1",
    user_id: "mock-user-id",
    title: "Twitter",
    url: "https://twitter.com",
    // X logo on black background (iOS style)
    icon_url: "data:image/svg+xml," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" fill="#000000"/>
        <path d="M67.8 54.4L93.5 25h-6.1L65.1 51.1 47.2 25H25l27 39.3L25 95h6.1l23.6-27.4L73.8 95H96L67.8 54.4zm-8.4 9.7l-2.7-3.9L33.5 29.3h9.3l17.5 25.1 2.7 3.9 22.8 32.6h-9.3L59.4 64.1z" fill="white"/>
      </svg>
    `),
    is_docked: false,
    sort_order: 0,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    user_id: "mock-user-id",
    title: "Instagram",
    url: "https://instagram.com",
    // Instagram gradient with camera icon (iOS style)
    icon_url: "data:image/svg+xml," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs>
          <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
            <stop offset="0%" style="stop-color:#fdf497"/>
            <stop offset="5%" style="stop-color:#fdf497"/>
            <stop offset="45%" style="stop-color:#fd5949"/>
            <stop offset="60%" style="stop-color:#d6249f"/>
            <stop offset="90%" style="stop-color:#285AEB"/>
          </radialGradient>
        </defs>
        <rect width="120" height="120" fill="url(#igGrad)"/>
        <rect x="25" y="25" width="70" height="70" rx="20" ry="20" fill="none" stroke="white" stroke-width="6"/>
        <circle cx="60" cy="60" r="18" fill="none" stroke="white" stroke-width="6"/>
        <circle cx="82" cy="38" r="5" fill="white"/>
      </svg>
    `),
    is_docked: false,
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    user_id: "mock-user-id",
    title: "YouTube",
    url: "https://youtube.com",
    // YouTube white background with red play button (iOS style)
    icon_url: "data:image/svg+xml," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" fill="#FFFFFF"/>
        <path d="M100.8 39.5c-1-3.8-4-6.8-7.8-7.8C85.6 30 60 30 60 30s-25.6 0-33 1.7c-3.8 1-6.8 4-7.8 7.8C17.5 47 17.5 60 17.5 60s0 13 1.7 20.5c1 3.8 4 6.8 7.8 7.8 7.4 1.7 33 1.7 33 1.7s25.6 0 33-1.7c3.8-1 6.8-4 7.8-7.8 1.7-7.5 1.7-20.5 1.7-20.5s0-13-1.7-20.5z" fill="#FF0000"/>
        <path d="M50 75V45l22 15z" fill="white"/>
      </svg>
    `),
    is_docked: false,
    sort_order: 2,
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    user_id: "mock-user-id",
    title: "GitHub",
    url: "https://github.com",
    // GitHub white background with octocat (iOS style)
    icon_url: "data:image/svg+xml," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" fill="#FFFFFF"/>
        <path d="M60 15C35.1 15 15 35.1 15 60c0 19.9 12.9 36.7 30.8 42.6 2.3.4 3.1-1 3.1-2.2 0-1.1 0-4 0-7.8-12.5 2.7-15.2-6-15.2-6-2.1-5.2-5-6.6-5-6.6-4.1-2.8.3-2.8.3-2.8 4.5.3 6.9 4.6 6.9 4.6 4 6.9 10.5 4.9 13.1 3.8.4-2.9 1.6-4.9 2.8-6-10-1.1-20.5-5-20.5-22.2 0-4.9 1.8-8.9 4.6-12.1-.5-1.1-2-5.7.4-11.9 0 0 3.8-1.2 12.4 4.6 3.6-1 7.4-1.5 11.3-1.5 3.8 0 7.7.5 11.3 1.5 8.6-5.8 12.4-4.6 12.4-4.6 2.4 6.2.9 10.8.4 11.9 2.9 3.1 4.6 7.2 4.6 12.1 0 17.2-10.5 21.1-20.5 22.2 1.6 1.4 3.1 4.1 3.1 8.3 0 6 0 10.8 0 12.3 0 1.2.8 2.6 3.1 2.2C92.1 96.7 105 79.9 105 60c0-24.9-20.1-45-45-45z" fill="#24292f"/>
      </svg>
    `),
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
