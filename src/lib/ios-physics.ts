
"use client"

/* --- 1. PURE LIQUID PHYSICS (NO RIMS) --- */
export const LIQUID_STYLE: React.CSSProperties = {
  // BASE: Nearly invisible base, purely light-trapping.
  background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.0) 100%)',
  
  // OPTICS: Extreme Saturation (240%) to define the shape via color distortion only.
  backdropFilter: 'blur(40px) saturate(240%) brightness(110%) contrast(110%)',
  WebkitBackdropFilter: 'blur(40px) saturate(240%) brightness(110%) contrast(110%)',
  
  // SHADOWS:
  // REMOVED: `inset 0 1px 0` (The sharp white line).
  // ADDED: Soft internal glow (Volume) and deep diffuse drop shadow (Lift).
  boxShadow: 'inset 0 0 20px rgba(255,255,255,0.15), 0 20px 50px -10px rgba(0,0,0,0.5)',
  
  border: 'none',
  outline: 'none', // Double safety
}

// Apple Superellipse (Continuous Curvature) for 60px icons
export const SQUIRCLE = "path('M 60 30 C 60 46.5685 46.5685 60 30 60 C 13.4315 60 0 46.5685 0 30 C 0 13.4315 13.4315 0 30 0 C 46.5685 0 60 13.4315 60 30 Z')"

// Icon Shadow: Pure lift, NO borders
export const ICON_LIFT: React.CSSProperties = {
  boxShadow: '0 8px 24px -4px rgba(0,0,0,0.4)'
}

// Dynamic Wallpaper (High Contrast Mesh for Refraction)
export const WALLPAPER_STYLE: React.CSSProperties = {
  background: 'radial-gradient(circle at 0% 0%, #3b0764 0%, transparent 60%), radial-gradient(circle at 100% 0%, #be185d 0%, transparent 50%), radial-gradient(circle at 50% 100%, #0e7490 0%, transparent 50%), #0f172a',
  backgroundSize: '150% 150%',
}
