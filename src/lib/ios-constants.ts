"use client"

/**
 * PIXEL-PERFECT iOS HOME SCREEN CONSTANTS
 * Based on exact pixel analysis of reference screenshot
 * 
 * Reference device: iPhone (standard 390pt width)
 * All values are in logical pixels (pt)
 */

// === SCREEN DIMENSIONS ===
// iPhone 14/15 Pro Max logical resolution
export const SCREEN_WIDTH = 430
export const SCREEN_HEIGHT = 932

// === BACKGROUND ===
export const IOS_BACKGROUND = "#F2F2F7" // iOS standard light gray

// === STATUS BAR ===
export const STATUS_BAR_HEIGHT = 44

// === APP ICON ===
// Standard iOS icon: 60x60pt with 22% corner radius
export const ICON_SIZE = 60
export const ICON_RADIUS = 13 // ~22% of 60

// === GRID LAYOUT ===
// 4 columns, evenly distributed
export const GRID_COLUMNS = 4
export const GRID_ROW_GAP = 24 // vertical spacing between rows
// Horizontal spacing is handled by justify-evenly

// === TYPOGRAPHY ===
// App label: 11px, centered below icon
export const LABEL_FONT_SIZE = 11
export const LABEL_COLOR = "#3C3C43" // iOS standard label gray
export const LABEL_WIDTH = 76 // max width for truncation

// === DOCK ===
export const DOCK_HEIGHT = 84
export const DOCK_BORDER_RADIUS = 24
export const DOCK_BACKGROUND = "rgba(255, 255, 255, 0.75)"
export const DOCK_BLUR = 20

// === PAGE INDICATOR ===
export const PAGE_DOT_SIZE = 6
export const PAGE_DOT_GAP = 6
export const PAGE_DOT_ACTIVE = "#A0A0A0"
export const PAGE_DOT_INACTIVE = "#D0D0D0"

// === HOME INDICATOR ===
export const HOME_INDICATOR_WIDTH = 134
export const HOME_INDICATOR_HEIGHT = 5

// === SYSTEM FONT ===
export const SYSTEM_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif'
export const SYSTEM_FONT_DISPLAY = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
