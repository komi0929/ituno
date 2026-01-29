"use client";

/**
 * iPhone 15 Pro / iPhone 17 Pixel-Perfect Constants
 * Based on Apple Human Interface Guidelines and official specifications
 *
 * Source: Apple HIG, ios-resolution.com, screensizes.app
 *
 * Display: 6.1-6.3 inch Super Retina XDR OLED
 * Resolution: 2556 x 1179 pixels @ 460ppi (iPhone 15 Pro)
 * Logical resolution: 393 x 852 pt (3x scale)
 */

// === SCREEN DIMENSIONS ===
// iPhone 15 Pro / 17 logical resolution (3x scale)
export const SCREEN_WIDTH = 393;
export const SCREEN_HEIGHT = 852;

// === SAFE AREAS (Apple HIG Official) ===
// Top safe area (includes Dynamic Island): 59pt
// Bottom safe area (home indicator): 34pt
export const SAFE_AREA_TOP = 59;
export const SAFE_AREA_BOTTOM = 34;

// === DYNAMIC ISLAND ===
// iPhone 14 Pro+ / 15 Pro / 16 Pro / 17 style Dynamic Island
export const DYNAMIC_ISLAND_WIDTH = 126;
export const DYNAMIC_ISLAND_HEIGHT = 37.33;
export const DYNAMIC_ISLAND_TOP = 11; // From top of screen
export const DYNAMIC_ISLAND_RADIUS = 18.67; // Continuous curve

// === STATUS BAR ===
// Status bar height (visual content area): 54pt
// Total safe area from top: 59pt
export const STATUS_BAR_HEIGHT = 54;

// === SCREEN CORNERS ===
// iPhone 15 Pro corner radius: 55pt (approximate CSS equivalent)
export const SCREEN_CORNER_RADIUS = 55;

// === APP ICON ===
// Standard iOS icon: 60x60pt with continuous curvature (squircle)
// Corner radius is approximately 22.37% of icon size = 13.4pt
export const ICON_SIZE = 60;
export const ICON_RADIUS = 13.4; // iOS squircle continuous curvature

// === GRID LAYOUT ===
// 4 columns, horizontal padding 27pt each side (Apple HIG)
// Vertical spacing between icon centers: 88pt
export const GRID_COLUMNS = 4;
export const GRID_HORIZONTAL_PADDING = 27; // Apple HIG: 27pt side margins
export const GRID_TOP_OFFSET = 110; // Below status bar + safe area + margin
export const GRID_ROW_HEIGHT = 88; // Center-to-center vertical spacing
export const GRID_COLUMN_WIDTH =
  (SCREEN_WIDTH - 2 * GRID_HORIZONTAL_PADDING) / 4; // ~84.75pt

// === TYPOGRAPHY ===
// App label: SF Pro Text, 11pt, white with drop shadow
export const LABEL_FONT_SIZE = 11;
export const LABEL_COLOR = "#FFFFFF";
export const LABEL_WIDTH = 74; // Truncation width
export const LABEL_SHADOW = "0px 1px 2px rgba(0, 0, 0, 0.6)";
export const LABEL_LINE_HEIGHT = 1.2; // 13.2pt

// === DOCK ===
// Dock: 96pt tall, glass blur effect
// Horizontal margin: 8pt each side
// Interior padding for icons: centered
export const DOCK_HEIGHT = 96;
export const DOCK_BOTTOM_PADDING = 0;
export const DOCK_SIDE_PADDING = 10;
export const DOCK_BORDER_RADIUS = 35; // iOS 17 dock radius
export const DOCK_BACKGROUND = "rgba(255, 255, 255, 0.20)"; // Lighter glass
export const DOCK_BLUR = 40; // Stronger blur

// === PAGE INDICATOR ===
// Page dots: 7pt diameter, 8pt gap
// Positioned above dock
export const PAGE_DOT_SIZE = 7;
export const PAGE_DOT_GAP = 8;
export const PAGE_DOT_ACTIVE_COLOR = "#FFFFFF";
export const PAGE_DOT_INACTIVE_COLOR = "rgba(255, 255, 255, 0.35)";
export const PAGE_DOTS_BOTTOM = 110; // Above dock

// === HOME INDICATOR ===
// iOS home indicator: 134pt wide, 5pt tall, 8pt from bottom
export const HOME_INDICATOR_WIDTH = 134;
export const HOME_INDICATOR_HEIGHT = 5;
export const HOME_INDICATOR_BOTTOM = 8;
export const HOME_INDICATOR_RADIUS = 2.5;

// === SYSTEM FONT ===
// SF Pro for iOS
export const SYSTEM_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif';
export const SYSTEM_FONT_DISPLAY =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif';

// === STATUS BAR STYLING ===
export const STATUS_BAR_TEXT_COLOR = "#FFFFFF";
export const STATUS_BAR_FONT_SIZE = 15; // SF Pro, semibold
export const STATUS_BAR_FONT_WEIGHT = 600;
export const STATUS_BAR_LETTER_SPACING = -0.24; // iOS tight kerning

// === JIGGLE ANIMATION ===
export const JIGGLE_KEYFRAMES = `
@keyframes jiggle {
  0% { transform: rotate(-1deg); }
  100% { transform: rotate(1deg); }
}
`;

// === ADDITIONAL CONSTANTS ===
// Icon shadow for realistic depth
export const ICON_SHADOW = "0 2px 8px rgba(0, 0, 0, 0.15)";

// Grid content area height (between status bar and dock)
export const CONTENT_AREA_HEIGHT =
  SCREEN_HEIGHT - SAFE_AREA_TOP - DOCK_HEIGHT - SAFE_AREA_BOTTOM;
