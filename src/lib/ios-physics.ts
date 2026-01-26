
"use client"

/* --- PIXEL-PERFECT iOS HOME SCREEN STYLES --- */
/* Based on exact analysis of reference screenshot */

// iOS standard background color
export const IOS_BACKGROUND = "#F2F2F7"

// Icon dimensions (60px with 22% corner radius = ~13px)
export const ICON_SIZE = 60
export const ICON_RADIUS = 13

// Simple dock style - light frosted glass
export const DOCK_STYLE: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.75)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
}

// Status bar height
export const STATUS_BAR_HEIGHT = 44

// Grid spacing
export const GRID_GAP_X = 20 // horizontal gap between icons
export const GRID_GAP_Y = 24 // vertical gap between icon rows
