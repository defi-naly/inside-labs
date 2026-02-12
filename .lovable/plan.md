

## Add a Central 3D Shape Inside the Network

Place a wireframe 3D topology shape at the center of the sphere network to visually represent "Inside Labs" — something literally *inside* the network.

### Shape Choice

A **dodecahedron** (12-sided polyhedron) works well here — it's visually distinct from the outer sphere nodes, has a recognizable "topology" feel, and symbolizes complexity/intelligence. It will be rendered as a wireframe to match the existing aesthetic.

### Changes to `src/components/IntelligenceMesh.tsx`

1. **Add a `CoreShape` component** — a wireframe dodecahedron at the origin (`[0, 0, 0]`) with:
   - `dodecahedronGeometry` with radius ~1.8 (large enough to be prominent but well inside the shell radius of 6)
   - Wireframe material matching the existing style but slightly brighter (opacity ~0.3) so it stands out as the focal point
   - Slow independent rotation on multiple axes for visual interest

2. **Add faint connection lines from the core to the outer nodes** — subtle radial lines from the core shape's center to each of the 30 outer nodes, reinforcing the idea that the "inside" is connected to the network. These will be straight lines with very low opacity (~0.06).

3. **Render `CoreShape` inside the rotating `<group>`** in `NetworkScene` so it rotates with the rest of the network.

### Technical Details

- New `CoreShape` component using `useRef` and `useFrame` for independent rotation
- Radial connection lines built as a separate `THREE.LineSegments` object in the `NetworkScene` memo
- No new dependencies needed — uses existing Three.js primitives

