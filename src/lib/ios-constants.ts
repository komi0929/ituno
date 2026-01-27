"use client";

/**
 * PIXEL-PERFECT iOS HOME SCREEN CONSTANTS
 * Based on exact pixel analysis of reference screenshot (iPhone SE / iPhone 8 style)
 *
 * Reference device: iPhone with notch-less design (375x667 or similar)
 * All values are in logical pixels (pt)
 */

// === SCREEN DIMENSIONS ===
// iPhone SE / iPhone 8 style (no notch)
export const SCREEN_WIDTH = 375;
export const SCREEN_HEIGHT = 667;

// === STATUS BAR ===
export const STATUS_BAR_HEIGHT = 20; // Non-notch iPhone status bar

// === APP ICON ===
// Standard iOS icon: 60x60pt with 22% corner radius (true squircle)
export const ICON_SIZE = 60;
export const ICON_RADIUS = 13.5; // ~22.5% of 60 for proper iOS continuous curvature

// === GRID LAYOUT ===
// 4 columns, evenly distributed
export const GRID_COLUMNS = 4;
export const GRID_HORIZONTAL_PADDING = 27; // Side padding
export const GRID_TOP_OFFSET = 76; // From top of screen to first icon row
export const GRID_ROW_HEIGHT = 88; // Center-to-center vertical spacing between rows
export const GRID_COLUMN_WIDTH =
  (SCREEN_WIDTH - 2 * GRID_HORIZONTAL_PADDING) / 4; // ~80px per column

// === TYPOGRAPHY ===
// App label: 11px, centered below icon, WHITE with drop shadow on wallpaper
export const LABEL_FONT_SIZE = 11;
export const LABEL_COLOR = "#FFFFFF"; // White for visibility on colorful wallpaper
export const LABEL_WIDTH = 74; // max width for truncation
export const LABEL_SHADOW = "0px 1px 2px rgba(0, 0, 0, 0.5)"; // Drop shadow for readability

// === DOCK ===
export const DOCK_HEIGHT = 72; // Inner dock height
export const DOCK_BOTTOM_PADDING = 4; // Space from screen bottom to dock
export const DOCK_SIDE_PADDING = 4; // Side padding for dock container
export const DOCK_BORDER_RADIUS = 28; // Rounded corners
export const DOCK_BACKGROUND = "rgba(255, 255, 255, 0.25)"; // Translucent white
export const DOCK_BLUR = 25; // Strong blur

// === PAGE INDICATOR ===
export const PAGE_DOT_SIZE = 7;
export const PAGE_DOT_GAP = 8;
export const PAGE_DOT_ACTIVE_COLOR = "#FFFFFF"; // White, full opacity
export const PAGE_DOT_INACTIVE_COLOR = "rgba(255, 255, 255, 0.4)"; // White, 40% opacity
export const PAGE_DOTS_BOTTOM = 96; // From bottom of screen

// === HOME INDICATOR ===
// iPhone SE doesn't have home indicator (has physical home button)
export const HOME_INDICATOR_WIDTH = 0;
export const HOME_INDICATOR_HEIGHT = 0;

// === SYSTEM FONT ===
export const SYSTEM_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif';
export const SYSTEM_FONT_DISPLAY =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif';

// === STATUS BAR STYLING (for wallpaper mode - white icons) ===
export const STATUS_BAR_TEXT_COLOR = "#FFFFFF";
export const STATUS_BAR_FONT_SIZE = 14;
export const STATUS_BAR_FONT_WEIGHT = 600;

// === JIGGLE ANIMATION ===
export const JIGGLE_KEYFRAMES = `
@keyframes jiggle {
  0% { transform: rotate(-1deg); }
  100% { transform: rotate(1deg); }
}
`;
