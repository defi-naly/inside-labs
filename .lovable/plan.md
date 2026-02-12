

# Add a Results Stats Section After the Hero

## Overview
Create a new bold stats section placed directly after the hero, showcasing the LAAX App case study results. The design will use the existing crimson + dark theme with large, impactful numbers in a grid layout inspired by the reference image.

## Changes

### 1. Create a new `ResultsSection` component
**File: `src/components/ResultsSection.tsx` (new)**
- A full-width section with a "By the numbers" intro and a 2x3 or 3x2 grid of stat cards
- Stats to display:
  - **200k** — Active app users
  - **50%** — Of all ticket sales via app
  - **19M*** — Ticket Revenue (up from 2.8M)
  - **300k** — App downloads post-launch
  - **30%** — Of all users completed a purchase
  - **300%** — Increase in online sales
- Each stat card: large bold white number, smaller white label beneath
- Cards use a semi-transparent crimson background (`bg-primary/90`) for the bold, bright look from the reference
- A small footnote: "* Values quoted in Swiss Franc (CHF). As at Winter 2018/19."
- Left side: section title "By the numbers: **LAAX App**" styled large and bold
- Layout: on desktop, title on the left ~1/3, stats grid on the right ~2/3. On mobile, title stacks above the grid

### 2. Add `ResultsSection` to the page
**File: `src/pages/Index.tsx`**
- Import and place `ResultsSection` directly after `HeroSection` and before `ClientsSection`

### Technical Details
- No new dependencies needed
- Stats grid uses Tailwind's `grid grid-cols-2` with `gap-4`
- Stat values use `text-5xl md:text-6xl font-extrabold` for impact
- Labels use `text-sm md:text-base font-medium`
- Cards styled with `background: hsl(355 85% 40%)` with slight transparency for depth
- Section background stays transparent to show the wireframe grid beneath

