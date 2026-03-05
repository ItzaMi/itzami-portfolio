# Rui Sousa - Portfolio

Dynamic portfolio site with real app data from App Store Connect + iTunes API.

## What's Inside

- **index.html** - Retro-styled portfolio with glassmorphism, gradients, hover effects
- **apps-data.json** - 17 apps (11 live, 6 coming soon) with real icons, URLs, descriptions
- **fetch-app-data.js** - Script to refresh app data from ASC + iTunes API

## Current Stats

- **11 apps live** on App Store with real icons & links
- **6 apps coming soon** (Waddle, Fossy, Roam, Carely, SnapDone, itza-habit)
- **Real data:** App Store URLs, 512x512 icons, descriptions, pricing, genres

## Apps Included

### Live Apps (with icons & App Store links)
1. Buggy: Baby Tracker & Log ($3.99)
2. Pipeta - Organize Colors (Free)
3. Coiny: Coin Identifier (Free)
4. Fishy: Fish Identifier (Free)
5. Oldy: Antique Identifier (Free)
6. Arthry: Bug Identifier (Free)
7. Planty: Plant Identifier (Free)
8. Birdy: Bird Identifier (Free)
9. Rocky: Stone & Gem Identifier (Free)
10. Mushy: Mushroom Identifier (Free)
11. Trainy: Train Identifier (Free)

### Coming Soon (with badges)
- Waddle, Fossy, Roam, Carely, SnapDone, itza-habit

## Deployment

### Option 1: Vercel (Recommended)
```bash
cd /opt/openclaw/clawd/itzami-portfolio
vercel deploy --prod
```

### Option 2: Netlify
```bash
cd /opt/openclaw/clawd/itzami-portfolio
netlify deploy --prod --dir .
```

### Option 3: Any static host
Upload these files:
- index.html
- apps-data.json
- vercel.json (optional, for redirects)

## Updating App Data

When apps go live or stats change:

```bash
cd /opt/openclaw/clawd/itzami-portfolio
node fetch-app-data.js
```

This will:
1. Fetch all apps from App Store Connect
2. Query iTunes API for icons, descriptions, URLs
3. Generate updated apps-data.json
4. No need to touch HTML - it loads data dynamically

## Local Testing

**Can't just open index.html** - JavaScript fetch() requires a web server.

Quick test server:
```bash
cd /opt/openclaw/clawd/itzami-portfolio
python3 -m http.server 8080
# Open http://localhost:8080
```

Or use VSCode Live Server extension.

## Design Features

### Visual Style
- Dark theme (black background)
- Retro gradients (purple/pink/blue)
- Glassmorphism cards
- Animated gradient background
- Glow effects on hover
- Smooth transitions

### Card Layout
- 380px minimum width (no squishing)
- 96×96 app icons (high-res, rounded)
- Hover: lift + scale + glow
- "Coming Soon" badge for unreleased apps
- Genre & price badges
- Direct App Store links

### Responsive
- Desktop: 3-column grid
- Tablet: 2-column
- Mobile: 1-column, stacked
- All text scales properly

## Files

- `index.html` - Production portfolio (retro style)
- `index-retro.html` - Backup of retro version
- `index-dynamic.html` - Earlier version (pre-retro)
- `apps-data.json` - App metadata (auto-generated)
- `fetch-app-data.js` - Data fetcher script
- `vercel.json` - Deployment config
- `README.md` - This file

## Tech Stack

- Zero frameworks (vanilla HTML/CSS/JS)
- iTunes Search API (public, no auth)
- App Store Connect CLI (for app IDs)
- Vercel serverless (optional)

## Next Steps

1. Deploy to Vercel/Netlify
2. Point custom domain (optional)
3. Update when new apps go live (`node fetch-app-data.js`)
4. Use in freelance outreach

---

Built by Murderbot for Rui Sousa  
Last updated: 2026-03-05
