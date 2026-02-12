

# Redesign the Omni Suite Section

## Overview
Unify the bento grid cards and product tier cards into a cohesive, better-organized section. Add SVG icons to product titles, apply matching gradient backgrounds to the bento cards, and elevate the APP (Omni Explore) as the hero product.

## Changes

### 1. Apply gradient backgrounds to the Bento Grid cards
**File: `src/components/BentoCard.tsx`**
- Replace the flat `bg-card` background with the same `linear-gradient(165deg, ...)` treatment used on the product cards
- Ensure the subtle crimson radial overlay remains for the hover glow effect
- Match the dark space aesthetic consistently across both card types

### 2. Add SVG icons next to product tier titles
**File: `src/components/ProductCards.tsx`**
- Add relevant Lucide icons next to each product name:
  - **Omni Engage**: `Zap` (activation/energy)
  - **Omni Explore**: `Smartphone` (the app - since this is the main product)
  - **Omni Endeavor**: `Trophy` (loyalty/gamification/enterprise)
- Icons styled in the primary crimson color, placed inline before each product name

### 3. Reorganize the section to hero the APP
**File: `src/components/ProductCards.tsx`**
- Restructure the layout: keep the 3-column grid but make the middle card (Omni Explore / the APP) visually larger and more prominent
- Use a layout where Omni Explore spans a taller or more emphasized card with a larger image area
- Add a subtle "Featuring the Omni App" callout or badge to reinforce the app as the core product
- Update the section header to better frame the products ("Choose your tier" or similar)

### 4. Integrate app content more prominently
**File: `src/components/ProductCards.tsx`**
- For Omni Explore (the APP tier), increase the image display area and show the app screenshot more prominently
- Add a brief "Powered by the Omni App" line or similar to the Endeavor card as well, reinforcing that the app runs through the higher tiers

### Technical Details
- All gradient values use HSL to match the existing design system (`hsl(230 15% 6%)`, `hsl(355 40% 8%)`, etc.)
- Icons imported from `lucide-react` (already installed): `Zap`, `Smartphone`, `Trophy`
- BentoCard gradient will use inline `style` prop like the ProductCards already do, replacing the Tailwind `bg-card` class
- No new dependencies required

