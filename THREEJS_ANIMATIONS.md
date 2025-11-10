# Three.js Animations Documentation

This document describes all the professional Three.js animations added to the portfolio.

## 🎨 Animation Components

### 1. **Enhanced Hero Scene** (`enhanced-hero-scene.tsx`)
The main scene component that combines all animations for the hero section.

**Features:**
- Multiple light sources (ambient, point, directional)
- Starfield background
- Multiple animated elements working together
- Environment mapping for reflections

---

### 2. **Animated Blob** (`animated-blob.tsx`)
A morphing 3D blob with custom shaders.

**Features:**
- Custom vertex shader for morphing animation
- Custom fragment shader for fresnel effect
- Smooth, organic movement
- Real-time noise-based deformation
- Purple/indigo color scheme

**Technical Details:**
- Uses `IcosahedronGeometry` with high subdivision (20)
- Shader-based animation for smooth performance
- Time-based noise function for organic movement

---

### 3. **Particle System** (`particle-system.tsx`)
A dynamic particle system with 2000 particles.

**Features:**
- 2000 individual particles
- Continuous rotation animation
- Vertical wave motion
- Semi-transparent rendering
- Indigo color (#6366f1)

**Performance:**
- Uses `BufferGeometry` for efficient rendering
- GPU-accelerated particle updates
- Optimized for 60fps

---

### 4. **Floating Shapes** (`floating-shapes.tsx`)
Geometric shapes that float and rotate in 3D space.

**Features:**
- 5 different shapes (boxes, spheres, toruses)
- Individual rotation speeds
- Vertical floating animation
- Metallic materials with reflections
- Various colors (indigo, purple, violet)

**Shapes Included:**
- Boxes (0.3x0.3x0.3)
- Spheres (radius 0.2)
- Toruses (radius 0.2, tube 0.1)

---

### 5. **Interactive Particles** (`interactive-particles.tsx`)
Mouse-reactive particle system with 1000 particles.

**Features:**
- Reacts to mouse movement
- Particles move away from cursor
- Continuous animation
- Additive blending for glow effect
- Purple color (#8b5cf6)

**Interaction:**
- Mouse position tracked in real-time
- Force-based particle displacement
- Smooth, organic movement

---

### 6. **Wave Mesh** (`wave-mesh.tsx`)
Animated procedural wave surface.

**Features:**
- 50x50 segment mesh
- Real-time wave animation
- Wireframe rendering
- Sine and cosine wave combination
- Positioned at bottom of scene

**Animation:**
- Dual sine wave pattern
- Time-based animation
- Dynamic normal recalculation
- Smooth, flowing motion

---

### 7. **Scroll Animated Shapes** (`scroll-animated-shapes.tsx`)
Octahedron shapes that animate based on scroll position.

**Features:**
- 5 octahedron shapes
- Scroll-based rotation
- Vertical floating motion
- Metallic materials
- Staggered animations

**Use Case:**
Can be used in other sections for scroll-based animations.

---

## 🎯 Performance Optimizations

1. **useMemo** - Geometry and positions are memoized
2. **useFrame** - Efficient animation loops
3. **BufferGeometry** - GPU-accelerated rendering
4. **Suspense** - Lazy loading of 3D components
5. **Particle Count Limits** - Balanced for performance
6. **Antialiasing** - Enabled for smooth rendering

## 🚀 Usage

The animations are automatically loaded in the Hero section:

```tsx
<Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
  <EnhancedHeroScene />
</Canvas>
```

## 🎨 Customization

### Adjust Particle Counts
Edit the `particleCount` variable in:
- `particle-system.tsx` (default: 2000)
- `interactive-particles.tsx` (default: 1000)

### Change Colors
Update color values in each component:
- `#6366f1` - Primary indigo
- `#8b5cf6` - Purple
- `#a855f7` - Violet

### Modify Animation Speed
Adjust `rotationSpeed` and `floatSpeed` in:
- `floating-shapes.tsx`
- `scroll-animated-shapes.tsx`

### Adjust Lighting
Modify light intensities and positions in:
- `enhanced-hero-scene.tsx`

## 📊 Performance Metrics

- **Target FPS:** 60fps
- **Particle Count:** ~3000 total particles
- **Geometry Complexity:** Medium (optimized)
- **Shader Complexity:** Low-Medium
- **Memory Usage:** Optimized with BufferGeometry

## 🔧 Troubleshooting

### Low Performance
- Reduce particle counts
- Lower star count in Stars component
- Disable some animation layers

### Visual Issues
- Check browser WebGL support
- Verify Three.js version compatibility
- Ensure proper lighting setup

## 🎓 Learning Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Drei Helpers](https://github.com/pmndrs/drei)

## 📝 Notes

- All animations are optimized for modern browsers
- WebGL 2.0 recommended for best performance
- Mobile devices may need reduced particle counts
- Animations automatically pause when tab is inactive (browser optimization)

