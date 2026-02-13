

## Make the Phone Mockup 3D with Real App Screenshots

### What Changes

**1. Add 3D perspective transform to the phone**
- Apply CSS `perspective` and `rotateY`/`rotateX` transforms to give the flat SVG phone a convincing 3D tilt effect
- Add a subtle reflection/shadow underneath for depth
- Keep the floating animation but layer it with the 3D perspective

**2. Replace icon-based screen content with real Inside Labs screenshots**
- Load the actual app screenshots from insidelabs.tech for each pillar section:
  - For You: `https://insidelabs.tech/images/2020/omni/theapp-explore/m.jpg`
  - Live: `https://insidelabs.tech/images/2020/omni/theapp-live/m.jpg`
  - Shop: `https://insidelabs.tech/images/2020/omni/theapp-shop/m.jpg`
  - Play: `https://insidelabs.tech/images/2020/omni/theapp-play/m.jpg`
  - Wallet: `https://insidelabs.tech/images/2020/omni/theapp-me/m.jpg`
- The screenshot will fill the phone screen area, transitioning with a crossfade when switching pillars

### Technical Details

**File: `src/components/ProductDemoSection.tsx`**

- Add `screenImage` URL to each pillar in `pillarsData`
- Update the `PhoneFrame` component:
  - Wrap the phone in a container with `perspective: 1200px`
  - Apply `transform: rotateY(-8deg) rotateX(3deg)` for a subtle 3D angle
  - Add an edge highlight gradient on the "near" side for realism
  - Replace the icon-based screen content with an `<img>` element that loads each pillar's real screenshot, clipped to the phone screen bounds with `object-cover`
  - Add a smooth crossfade transition between screenshots when switching pillars
  - Keep the bottom nav bar overlaid on top of the screenshot for interactivity context
- Add a soft floor reflection using a mirrored, blurred, low-opacity copy below the phone

**File: `src/index.css`**
- Add a `@keyframes phone-glow` animation for a subtle ambient light sweep across the 3D phone edges

