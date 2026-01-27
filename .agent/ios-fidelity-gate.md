# iOS Fidelity Quality Gate (MANDATORY)

> [!CAUTION]
> **This document defines non-negotiable quality standards for iOS UI reproduction.**
> Every change to iOS-related components MUST be verified against these rules.
> Failure to comply is considered a blocking issue.

## Core Principle: Pixel-Perfect Reproduction

The goal is **indistinguishable from a real iOS screenshot**. If a user cannot tell the difference between our render and a real iPhone screenshot, we have succeeded. Anything less is failure.

---

## 1. Screen Dimensions & Aspect Ratio

| Property         | Value                        | Notes                                     |
| ---------------- | ---------------------------- | ----------------------------------------- |
| **Width**        | 375px                        | iPhone 11/12/13 standard logical width    |
| **Height**       | 812px                        | Full screen height (including notch area) |
| **Aspect Ratio** | ~9:19.5                      | Must be preserved exactly                 |
| **Device Frame** | Rounded corners, radius 44px | Matches iPhone physical bezel             |

---

## 2. Status Bar (Pixel-Perfect)

| Element              | Specification                                                |
| -------------------- | ------------------------------------------------------------ |
| **Height**           | 44px from top                                                |
| **Time Position**    | Left-aligned, 16px from left edge                            |
| **Time Font**        | SF Pro Text, 15px, Semibold, white                           |
| **Location Arrow**   | 8px offset from time, SF Symbol style                        |
| **Right Indicators** | Signal bars + WiFi + Battery, right-aligned 16px from edge   |
| **Signal Bars**      | 4 bars, proper spacing, filled based on strength             |
| **Battery**          | Proper shape with rounded ends, yellow when low battery mode |

---

## 3. App Icon Grid (Critical)

| Property               | Value                                       |
| ---------------------- | ------------------------------------------- |
| **Grid Columns**       | 4                                           |
| **Icon Size**          | 60x60px                                     |
| **Icon Corner Radius** | 13.5px (continuous curvature / squircle)    |
| **Horizontal Spacing** | Equal distribution across 375px width       |
| **Vertical Spacing**   | ~88px between icon rows (center to center)  |
| **First Row Top**      | ~76px from top (below status bar + padding) |
| **Label Font**         | SF Pro Text, 11px, Regular, white           |
| **Label Shadow**       | 0px 1px 2px rgba(0,0,0,0.3)                 |
| **Label Position**     | 4px below icon bottom                       |

### Icon Shape: Squircle (NOT border-radius)

```css
/* WRONG - Simple border-radius */
border-radius: 22%;

/* CORRECT - iOS Squircle using clip-path or mask */
/* Use SVG mask or canvas for true continuous curvature */
```

The iOS squircle has a **continuous curvature** that cannot be replicated with CSS `border-radius` alone. Use:

1. SVG clip-path with bezier curves
2. Canvas with proper bezier calculations
3. Pre-made squircle mask images

---

## 4. Dock (Critical)

| Property             | Value                                                 |
| -------------------- | ----------------------------------------------------- |
| **Position**         | Fixed at bottom                                       |
| **Height**           | ~96px from bottom of screen                           |
| **Background**       | Frosted glass effect (backdrop-filter: blur(20px))    |
| **Background Color** | rgba(255, 255, 255, 0.15) - translucent white         |
| **Corner Radius**    | 32px top corners, 0 bottom                            |
| **Icon Count**       | 4 icons                                               |
| **Icon Size**        | Same as grid (60x60px)                                |
| **Home Indicator**   | 134px wide, 5px tall, white, rounded, 8px from bottom |

---

## 5. Page Indicators

| Property          | Value                |
| ----------------- | -------------------- |
| **Position**      | Above dock, centered |
| **Dot Size**      | 6px diameter         |
| **Dot Spacing**   | 8px between dots     |
| **Active Dot**    | White, full opacity  |
| **Inactive Dots** | White, 30% opacity   |

---

## 6. Typography

All text must use **-apple-system, BlinkMacSystemFont, 'SF Pro Text'** font stack.

| Element         | Size | Weight | Color |
| --------------- | ---- | ------ | ----- |
| Status Bar Time | 15px | 600    | white |
| App Label       | 11px | 400    | white |
| Username        | 20px | 600    | white |

---

## 7. Wallpaper

- Must fill entire screen behind all UI elements
- No tiling, stretching, or aspect ratio distortion
- Use `object-fit: cover` with `object-position: center`

---

## 8. Quality Verification Checklist

Before ANY deployment, manually verify:

- [ ] Screen dimensions are exactly 375x812px
- [ ] Status bar height is 44px
- [ ] Time displays correctly with proper font
- [ ] Signal/WiFi/Battery indicators are pixel-perfect
- [ ] App icons are 60x60px with proper squircle shape
- [ ] Icons have correct horizontal distribution (4 columns)
- [ ] Icon labels are 11px, white, with shadow
- [ ] Dock has frosted glass effect
- [ ] Dock icons are properly sized and spaced
- [ ] Home indicator is visible at bottom
- [ ] Page dots are visible and properly styled
- [ ] Wallpaper fills screen correctly
- [ ] No visual artifacts or misalignments

---

## 9. Enforcement

1. **Before any PR/commit** to iOS components: Run visual comparison against reference
2. **Browser testing required**: Use Puppeteer to capture screenshot and compare
3. **Pixel diff threshold**: 0% deviation allowed for structural elements
4. **Reference images**: Stored in `.agent/references/` directory

---

## Reference Image

The authoritative reference is the user-provided iOS screenshot. All implementations must be visually indistinguishable from this reference.
