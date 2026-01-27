"use client";

/**
 * iPhone 17 Pixel-Perfect Constants
 * Based on Apple iPhone 17 specifications (2026)
 * https://www.apple.com/jp/iphone-17/specs/
 *
 * Display: 6.3 inch Super Retina XDR OLED
 * Resolution: 2,622 x 1,206 pixels @ 460ppi
 * Logical resolution (3x): 393 x 852 pt (estimated)
 */

// === SCREEN DIMENSIONS ===
// iPhone 17 logical resolution (3x scale)
export const SCREEN_WIDTH = 393;
export const SCREEN_HEIGHT = 852;

// === DYNAMIC ISLAND ===
// iPhone 14 Pro+ style Dynamic Island
export const DYNAMIC_ISLAND_WIDTH = 126;
export const DYNAMIC_ISLAND_HEIGHT = 37;
export const DYNAMIC_ISLAND_TOP = 11; // From top of screen
export const DYNAMIC_ISLAND_RADIUS = 18.5;

// === STATUS BAR ===
// Height includes Dynamic Island area
export const STATUS_BAR_HEIGHT = 59;

// === SCREEN CORNERS ===
export const SCREEN_CORNER_RADIUS = 55;

// === APP ICON ===
// Standard iOS icon: 60x60pt with continuous curvature (squircle)
export const ICON_SIZE = 60;
export const ICON_RADIUS = 13.5; // ~22.5% for iOS squircle

// === GRID LAYOUT ===
// 4 columns, evenly distributed
export const GRID_COLUMNS = 4;
export const GRID_HORIZONTAL_PADDING = 24; // Side padding
export const GRID_TOP_OFFSET = 100; // Below status bar + safe area
export const GRID_ROW_HEIGHT = 88; // Center-to-center vertical spacing
export const GRID_COLUMN_WIDTH =
  (SCREEN_WIDTH - 2 * GRID_HORIZONTAL_PADDING) / 4;

// === TYPOGRAPHY ===
// App label: 11pt white with drop shadow
export const LABEL_FONT_SIZE = 11;
export const LABEL_COLOR = "#FFFFFF";
export const LABEL_WIDTH = 74;
export const LABEL_SHADOW = "0px 1px 2px rgba(0, 0, 0, 0.5)";

// === DOCK ===
export const DOCK_HEIGHT = 82;
export const DOCK_BOTTOM_PADDING = 0; // Flush with home indicator area
export const DOCK_SIDE_PADDING = 8;
export const DOCK_BORDER_RADIUS = 32;
export const DOCK_BACKGROUND = "rgba(255, 255, 255, 0.25)";
export const DOCK_BLUR = 30;

// === PAGE INDICATOR ===
export const PAGE_DOT_SIZE = 7;
export const PAGE_DOT_GAP = 8;
export const PAGE_DOT_ACTIVE_COLOR = "#FFFFFF";
export const PAGE_DOT_INACTIVE_COLOR = "rgba(255, 255, 255, 0.4)";
export const PAGE_DOTS_BOTTOM = 106; // Above dock

// === HOME INDICATOR ===
export const HOME_INDICATOR_WIDTH = 139;
export const HOME_INDICATOR_HEIGHT = 5;
export const HOME_INDICATOR_BOTTOM = 8;
export const HOME_INDICATOR_RADIUS = 2.5;

// === SYSTEM FONT ===
export const SYSTEM_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif';
export const SYSTEM_FONT_DISPLAY =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif';

// === STATUS BAR STYLING ===
export const STATUS_BAR_TEXT_COLOR = "#FFFFFF";
export const STATUS_BAR_FONT_SIZE = 15;
export const STATUS_BAR_FONT_WEIGHT = 600;

// === JIGGLE ANIMATION ===
export const JIGGLE_KEYFRAMES = `
@keyframes jiggle {
  0% { transform: rotate(-1deg); }
  100% { transform: rotate(1deg); }
}
`;
