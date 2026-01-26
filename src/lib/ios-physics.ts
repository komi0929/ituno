
"use client"

/* --- 1. THE OPTICAL ENGINE (Physics of Liquid Glass) --- */
/* Per documentation: "Instead of blurring, use lens effects to distort." 
   We simulate this via High Saturation (Refraction) + Luminance Boost.
*/
export const LIQUID_PHYSICS: React.CSSProperties = {
  // The Container: Not a solid color, but a light-trapping volume.
  background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.01) 100%)',
  
  // The Lens: saturate(280%) creates the "Prism" effect where colors bleed through.
  // brightness(115%) simulates the light focusing properties of a convex lens.
  backdropFilter: 'blur(30px) saturate(280%) brightness(115%) contrast(105%)',
  WebkitBackdropFilter: 'blur(30px) saturate(280%) brightness(115%) contrast(105%)',
  
  // The Surface Tension (Caustics): 
  // Top inner white = Specular Highlight (Sharp)
  // Bottom inner white = Internal Reflection (Soft)
  // Drop Shadow = Distance from wallpaper
  boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.55), inset 0 -1px 0 0 rgba(255,255,255,0.15), 0 16px 40px -10px rgba(0,0,0,0.3)',
  
  // No Borders: Liquid has no stroke.
  border: 'none',
}

// Apple Superellipse (Continuous Curvature) approximation for 62px icons
export const SQUIRCLE_PATH = "path('M 62 31 C 62 48.1208 48.1208 62 31 62 C 13.8792 62 0 48.1208 0 31 C 0 13.8792 13.8792 0 31 0 C 48.1208 0 62 13.8792 62 31 Z')"

// Icon Shadow (Physical object floating ON the liquid)
export const ICON_PHYSICS: React.CSSProperties = {
  boxShadow: '0 10px 20px -5px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
}

// Dock Icon Shadow
export const DOCK_ICON_PHYSICS: React.CSSProperties = {
  boxShadow: '0 8px 16px -4px rgba(0,0,0,0.3)'
}

// Dynamic Environment (The Light Source)
export const DYNAMIC_ENVIRONMENT: React.CSSProperties = {
  background: 'radial-gradient(circle at 10% 10%, #4f46e5 0%, transparent 50%), radial-gradient(circle at 90% 90%, #db2777 0%, transparent 50%), radial-gradient(circle at 50% 50%, #06b6d4 0%, transparent 60%), #0f172a',
  backgroundSize: '150% 150%',
}
