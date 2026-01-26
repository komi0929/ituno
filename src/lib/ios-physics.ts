
"use client"

// PHYSICS CONSTANTS (The "Liquid" Engine) - DO NOT MODIFY
export const LIQUID_GLASS_STYLE: React.CSSProperties = {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 100%)',
  backdropFilter: 'blur(50px) saturate(220%) brightness(110%) contrast(100%)',
  WebkitBackdropFilter: 'blur(50px) saturate(220%) brightness(110%) contrast(100%)',
  boxShadow: 'inset 0 0.5px 0 0 rgba(255,255,255,0.6), inset 0 -0.5px 0 0 rgba(255,255,255,0.2), 0 24px 48px rgba(0,0,0,0.2)',
  border: 'none',
}

export const ICON_SHADOW: React.CSSProperties = {
  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
}

// Vibrant Mesh Wallpaper Background
export const MESH_WALLPAPER_STYLE: React.CSSProperties = {
  background: 'radial-gradient(circle at 0% 0%, #4c1d95 0%, transparent 50%), radial-gradient(circle at 100% 0%, #db2777 0%, transparent 50%), radial-gradient(circle at 100% 100%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 0% 100%, #be185d 0%, transparent 50%), #0f172a'
}
