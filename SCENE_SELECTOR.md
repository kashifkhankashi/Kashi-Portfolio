# Scene Selector Feature

A dropdown component that allows users to switch between different Three.js animation layouts and styles.

## 🎨 Available Scenes

### 1. **Minimal** (Default)
- Clean rotating torus
- Subtle starfield (500 stars)
- Simple and elegant
- Best for: Professional, minimal aesthetic

### 2. **Particles**
- Dynamic particle system (1000 particles)
- Wave motion animation
- Additive blending for glow effect
- Best for: Dynamic, energetic feel

### 3. **Geometric**
- 5 floating geometric shapes
- Boxes, spheres, toruses, octahedrons
- Individual rotation and floating speeds
- Best for: Modern, structured look

### 4. **Orbital**
- Central torus knot core
- 3 orbiting icosahedrons
- Auto-rotating camera
- Best for: Scientific, space theme

### 5. **Waves**
- Animated procedural wave mesh
- Floating particles above
- Flowing, organic motion
- Best for: Fluid, dynamic aesthetic

## 🚀 Features

- **Persistent Selection**: User's choice is saved to localStorage
- **Smooth Transitions**: Fade animations when switching scenes
- **Responsive Design**: Works on all screen sizes
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Visual Feedback**: Selected scene is highlighted in dropdown

## 📁 File Structure

```
src/
├── components/
│   ├── scene-selector.tsx          # Dropdown UI component
│   └── three/
│       ├── scene-renderer.tsx      # Scene switcher logic
│       └── scenes/
│           ├── minimal-scene.tsx
│           ├── particles-scene.tsx
│           ├── geometric-scene.tsx
│           ├── orbital-scene.tsx
│           └── waves-scene.tsx
└── sections/
    └── hero.tsx                    # Main hero with selector
```

## 🎯 Usage

The scene selector appears in the top-right corner of the hero section. Users can:

1. Click the dropdown button
2. Select from 5 different animation styles
3. The scene transitions smoothly
4. Preference is saved automatically

## 🔧 Customization

### Adding New Scenes

1. Create a new scene component in `src/components/three/scenes/`
2. Add the scene type to `SceneType` in `scene-selector.tsx`
3. Add the option to `sceneOptions` array
4. Add the case to `scene-renderer.tsx`

### Modifying Existing Scenes

Edit the individual scene files in `src/components/three/scenes/` to customize:
- Particle counts
- Colors
- Animation speeds
- Geometry types
- Lighting

## 💡 Tips

- Each scene is optimized for performance
- Particle counts can be adjusted based on device capabilities
- Colors match the theme (indigo/purple palette)
- All scenes use Suspense for smooth loading


