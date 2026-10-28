---
trigger: always_on
---

# Code & Deployment Rules

## Tech Stack
- Frontend: React 19 + Vite 6 + TailwindCSS 3 + react-router-dom v7 + Framer Motion + Recharts + TypeScript
- Fonts: Plus Jakarta Sans (primary), Inter (fallback), Outfit (display)
- Glassmorphism: .glass-panel and .glass-card utilities with backdrop-blur
- Medical color palette: medical-50 (#f0f9ff) to medical-900 (#0c4a6e)
- Dark mode support with slate-950/100 base

## Code Style
- Minimal, focused edits — prefer editing existing files over creating new ones
- Do not add or delete comments or documentation unless asked
- Imports always at top of file
- Follow existing code patterns and naming conventions
- No emojis in code unless explicitly requested

## Deployment
- Uses Vercel CLI with --prod flag
- Framework preset: Vite
- Build command: npm run build
- Output directory: dist
- Always build before deploying
- Deploy apps individually: heartguide-ai, glucowise-ai, breatheasy-ai, docuflow
- Deploy portfolio-website separately

## Safety
- Never auto-run destructive commands (delete, install, external requests)
- Check for existing dev servers before starting new ones
- Never hardcode API keys
