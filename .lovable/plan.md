

# Problem vs Solution - Visual Animated Showcase

## Concept

Replace the current plain text two-column layout with a visually rich, animated comparison. The section will use **scroll-triggered animations**, **iconography**, and a smooth **visual transition** from problem (grey/muted) to solution (crimson/primary) to create an emotional impact.

## Layout

```text
+--------------------------------------------------+
|              THE PROBLEM                          |
|                                                   |
|   [icon]  Fragmented     [icon]  No Guest Data    |
|            Tools                                  |
|   [icon]  Generic        [icon]  One-Time         |
|            Messaging              Visits           |
|                                                   |
|         --- animated divider / arrow ---          |
|                                                   |
|              THE SOLUTION                         |
|                                                   |
|   [icon]  Unified        [icon]  Smart Profiles   |
|            Platform                               |
|   [icon]  Automated      [icon]  Repeat           |
|            Campaigns              Buyers           |
|                                                   |
|         [ Learn how it works -> ]                 |
+--------------------------------------------------+
```

## Design Details

- **Problem cards**: 4 pain points in a 2x2 grid, each with a muted icon (e.g., `Unplug`, `UserX`, `Mail`, `TrendingDown`), subtle muted border, and grey tones
- **Solution cards**: 4 matching solutions in a 2x2 grid, each with a primary-colored icon (e.g., `Layers`, `UserCheck`, `Zap`, `TrendingUp`), primary border glow, crimson accent
- **Animated divider**: A central animated arrow/chevron element that pulses, visually connecting problem to solution
- **Scroll animations**: Each card fades in and slides up with staggered delays using CSS `@keyframes` and Intersection Observer
- **Hover effects**: Cards lift slightly with a subtle glow on hover

## Technical Approach

1. **Add keyframes** to `tailwind.config.ts`: `fade-up` animation with staggered delay utilities
2. **Rewrite `ProblemSolutionSection.tsx`**:
   - Use `useRef` + `IntersectionObserver` to trigger animations when section enters viewport
   - Stacked layout: Problem header + 2x2 grid, animated divider, Solution header + 2x2 grid
   - Each card uses `opacity-0 translate-y-6` initially, transitions to `opacity-100 translate-y-0` with staggered delays
   - Problem icons use `text-muted-foreground`, solution icons use `text-primary`
   - Animated chevron between sections uses a CSS pulse/bounce animation
3. **No new dependencies** -- pure CSS animations + React state via IntersectionObserver

