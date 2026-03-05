# Rui Sousa - Portfolio (Next.js)

Dynamic portfolio with real app data from App Store Connect + iTunes API.

Built with Next.js for easy conditional rendering and deployment.

## What's Inside

- **Next.js 15** with TypeScript
- **React components** with proper conditional rendering
- **Static export** (no server required)
- **Real app data** from iTunes API (11 live, 6 coming soon)
- **Clean design** (original minimal white cards)

## Key Features

- ✅ Live apps show icons + descriptions + App Store links
- ✅ Coming soon apps hide icons, show badge, no link
- ✅ Proper TypeScript types for app data
- ✅ Static export for Vercel/Netlify
- ✅ Automatic stats (counts apps, calculates live vs coming soon)

## Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Build & Deploy

```bash
npm run build
# Generates static export in /out folder
```

### Deploy to Vercel

```bash
vercel deploy --prod
```

Or just push to GitHub - Vercel will auto-deploy from main branch.

## Updating App Data

When apps go live or change:

```bash
node fetch-app-data.js  # Refresh apps-data.json
git add apps-data.json && git commit -m "Update app data" && git push
```

Vercel will rebuild automatically.

## Project Structure

```
itzami-portfolio/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main page component
│   └── globals.css      # All styles
├── apps-data.json       # App metadata (auto-generated)
├── fetch-app-data.js    # Data fetcher script
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── next.config.js       # Next.js config (static export)
```

## Why Next.js?

**Before (plain HTML/JS):**
```javascript
${!isLive ? '<span class="app-badge">Coming Soon</span>' : ''}
${isLive && app.icon ? `<img src="${app.icon}">` : ''}
```
Messy string templates, hard to maintain.

**After (React/Next.js):**
```tsx
{!isLive && <span className="app-badge">Coming Soon</span>}
{isLive && app.icon && <img src={app.icon} alt={app.name} />}
```
Clean, readable, TypeScript-safe.

## Deployment

**Vercel (Recommended):**
- Push to GitHub
- Vercel auto-detects Next.js
- Auto-builds on every push

**Netlify:**
- Build command: `npm run build`
- Publish directory: `out`

**Any static host:**
- Run `npm run build`
- Upload `out/` folder

---

Built with Next.js by Murderbot for Rui Sousa  
Last updated: 2026-03-05
