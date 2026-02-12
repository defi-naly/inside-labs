

## "Meet the Omni Suite" — Animated Bento Cards Section

Build an interactive bento-grid section on the homepage inspired by the screenshot reference, where each card represents an Omni Suite capability. Cards animate on hover (scale, shadow lift) and can be clicked/expanded to reveal deeper descriptive text.

---

### Section Layout

**Header area:**
- Large bold heading: "Meet the Omni Suite."
- Subtitle: "Tourism's leading data-driven, event-triggered customer engagement platform."

**Bento Grid — 5 interactive cards in an asymmetric layout:**
Cards arranged in a visually interesting grid (2 large cards on first row, 3 cards on second row) similar to the screenshot's alternating text-left/image-right pattern.

### The 5 Cards (with existing content from insidelabs.tech)

1. **Customer Relationships** — Icon: heart · "Create long-lasting, meaningful, customer relationships" · Deeper text: "by using data to power your guest engagement."
2. **E-Commerce Traffic** — Icon: shopping cart · "Drive more qualified traffic to your e-commerce layer" · Deeper text: "by supercharging your crosschannel marketing automation."
3. **White-Label App** — Icon: smartphone · "Launch a state of the art white-label app" · Deeper text: "and offer your guests a central platform that evolves based on their customer journey."
4. **Membership Programs** — Icon: users · "Start your own membership programs" · Deeper text: "to boost loyalty & guest satisfaction."
5. **AI Communication** — Icon: sparkles · "Enable personalized omni-channel communication" · Deeper text: "powered by cutting-edge AI technology."

### Card Behavior & Animation

- **Default state**: Each card shows an icon, bold headline, and a subtle "Learn more" indicator. Cards have a clean, minimal background (alternating light gray / dark tones like the screenshot).
- **Hover animation**: Card gently scales up (~1.02), shadow lifts, and a subtle gradient border or glow appears — smooth 300ms transition.
- **Click/expand**: Card expands smoothly (animated height transition) to reveal the deeper description text, a more detailed paragraph, and a "Learn more →" link to the Omni Suite page. Other cards stay in place (no accordion — each card expands independently).
- **Close**: Click again or click a close button to smoothly collapse back.

### Design Details
- Stripe-inspired colorful gradient accents on card borders or background on hover
- Clean typography with bold headlines and muted subtitles
- Smooth fade-in animations as cards scroll into view
- Fully responsive: stacks to single column on mobile
- EN/DE content support (all text available in both languages)

### Technical Approach
- Reusable `BentoCard` component with expand/collapse state
- CSS transitions for hover effects and height animation
- Scroll-triggered fade-in using Intersection Observer
- Grid layout with Tailwind CSS responsive classes

