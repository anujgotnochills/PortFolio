# Portfolio Website Updates

## Overview
The portfolio website has been completely redesigned to match the Canva portfolio template with a modern dark theme and vibrant lime green accents.

## Key Changes

### 🎨 Design & Styling
- **Dark Theme**: Background color changed to #131313 (dark gray/black)
- **Accent Color**: Lime green (#c8f21c) for primary actions and highlights
- **Typography**: Clean, modern font hierarchy with bold headings
- **Smooth Scrolling**: Added smooth scroll behavior for navigation

### 📄 New Sections

1. **Hero Section** (`Hero.tsx`)
   - Prominent headline: "Hey, I'm Anuj - Video Editor"
   - Tagline: "Turning raw clips into captivating stories"
   - Star icon decoration
   - Two CTA buttons: "CONTACT ME!" and "Browse Projects >>>"
   - Stats card with:
     - 2+ years of experience
     - 250+ projects completed
     - 99% client satisfaction

2. **About Section** (`About.tsx`)
   - Brief introduction about the video editor
   - Professional background and expertise

3. **Skills Section** (`Skills.tsx`)
   - 6 skill cards showcasing expertise:
     - Video Editing (Premiere Pro, Final Cut Pro, DaVinci Resolve)
     - Motion Graphics (After Effects, Cinema 4D, Blender)
     - Color Grading
     - Sound Design
     - VFX & Compositing
     - Fast Delivery
   - Hover effects with lime green border

4. **Projects Section** (`Projects.tsx`)
   - Grid layout of video projects
   - Embedded YouTube videos (shorts and regular videos)
   - 5 featured projects with iframes
   - Hover effects on project cards

5. **Testimonials Section** (`Testimonials.tsx`)
   - 6 client testimonials
   - 5-star ratings with lime green stars
   - Professional client names and roles
   - Card-based layout with hover effects

6. **Contact Section** (Updated `Contact.tsx`)
   - Clean contact form
   - "Get In Touch" heading
   - Name, Email, and Message fields
   - Submit button with primary color

7. **Footer** (Updated `Footer.tsx`)
   - Social media links (Instagram, YouTube, Email)
   - Copyright information
   - Lime green hover effects

### 🧭 Navigation
Updated header with:
- Portfolio logo/title
- Navigation links: Home, About, My Skills, Projects, Testimonial
- Fixed positioning at top
- Smooth scroll to sections

### 🎯 Color Palette
```css
--background: #131313 (dark gray)
--foreground: #ffffff (white)
--primary: #c8f21c (lime green)
--primary-foreground: #000000 (black)
--muted: #545454 (gray)
--card: #1f1f1f (slightly lighter dark)
```

## Files Modified
- `src/app/globals.css` - Updated color scheme and added smooth scrolling
- `src/app/layout.tsx` - Updated metadata
- `src/app/page.tsx` - Restructured with new sections
- `src/components/landing/Header.tsx` - New navigation structure
- `src/components/landing/Hero.tsx` - Complete redesign with stats
- `src/components/landing/Footer.tsx` - Updated social links

## Files Created
- `src/components/landing/About.tsx` - About section
- `src/components/landing/Skills.tsx` - Skills showcase
- `src/components/landing/Projects.tsx` - Video portfolio
- `src/components/landing/Testimonials.tsx` - Client reviews

## Features
✅ Fully responsive design
✅ Dark mode by default
✅ Smooth scrolling navigation
✅ YouTube video embeds
✅ Interactive hover effects
✅ Professional testimonials
✅ Contact form integration
✅ Social media integration

## Running the Project
```bash
npm run dev
```
Visit `http://localhost:9002` to view the website.

## Technologies Used
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Lucide React icons
