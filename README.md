# Portfolio Website

A modern, responsive portfolio website built with Next.js, shadcn UI, Tailwind CSS, Three.js, and Framer Motion.

## Features

- 🎨 Modern, clean UI with dark/light mode toggle
- 🎭 Smooth animations with Framer Motion
- 🎪 Interactive 3D background with Three.js
- 📱 Fully responsive design
- ⚡ Optimized performance
- 🎯 SEO-friendly
- 🔒 Type-safe with TypeScript

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn UI
- **3D Graphics**: Three.js + react-three-fiber
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── sections/
│   │   │   ├── hero.tsx
│   │   │   ├── about.tsx
│   │   │   ├── experience.tsx
│   │   │   ├── projects.tsx
│   │   │   └── contact.tsx
│   │   ├── three/
│   │   │   └── hero-background.tsx
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── label.tsx
│   │   ├── navbar.tsx
│   │   └── theme-provider.tsx
│   └── lib/
│       └── utils.ts
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Customization

### Update Personal Information

1. **Hero Section** (`src/components/sections/hero.tsx`):
   - Update name, title, and tagline
   - Update social media links

2. **About Section** (`src/components/sections/about.tsx`):
   - Modify the introduction text
   - Add/remove skills as needed

3. **Experience Section** (`src/components/sections/experience.tsx`):
   - Update work experience entries
   - Add MongoDB and other technologies used

4. **Projects Section** (`src/components/sections/projects.tsx`):
   - Add your projects with descriptions
   - Update GitHub and demo links

5. **Contact Section** (`src/components/sections/contact.tsx`):
   - Update email address
   - Update social media links

### Styling

- Colors and themes can be customized in `src/app/globals.css`
- Tailwind configuration is in `tailwind.config.ts`

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This project can be deployed on:
- [Vercel](https://vercel.com) (recommended for Next.js)
- [Netlify](https://netlify.com)
- Any platform that supports Next.js

## License

MIT

## Notes

- Make sure to update all placeholder links (GitHub, LinkedIn, email) with your actual links
- Replace placeholder project data with your actual projects
- Update the favicon in `public/favicon.ico`
- Consider adding Open Graph images for better social media sharing

# Kashi-Portfolio
# Kashi-Portfolio
