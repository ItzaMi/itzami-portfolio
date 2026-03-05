#!/usr/bin/env node

/**
 * Fetch app metadata from ASC + iTunes Search API
 * Generates JSON for portfolio site
 */

const fs = require('fs');
const https = require('https');
const { execSync } = require('child_process');

// Get all apps from ASC
console.log('📦 Fetching apps from App Store Connect...');
const ascApps = JSON.parse(
  execSync('asc apps list --output json', { encoding: 'utf-8' })
).data;

console.log(`Found ${ascApps.length} apps in ASC`);

// Fetch metadata from iTunes Search API
async function fetchItunesData(bundleId) {
  return new Promise((resolve, reject) => {
    // Explicitly request iOS/iPhone apps (not macOS)
    const url = `https://itunes.apple.com/lookup?bundleId=${bundleId}&entity=software&limit=1&country=us`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            resolve(json.results[0]);
          } else {
            resolve(null); // App not live yet
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Process all apps
async function main() {
  const appsData = [];
  
  for (const app of ascApps) {
    const { id, attributes } = app;
    const { name, bundleId } = attributes;
    
    console.log(`\n🔍 ${name}`);
    console.log(`   Bundle: ${bundleId}`);
    
    try {
      const itunesData = await fetchItunesData(bundleId);
      
      if (itunesData) {
        appsData.push({
          id,
          name,
          bundleId,
          appStoreUrl: itunesData.trackViewUrl,
          icon: itunesData.artworkUrl512 || itunesData.artworkUrl100,
          description: itunesData.description,
          shortDescription: itunesData.description?.split('\n')[0] || '',
          screenshots: itunesData.screenshotUrls || [],
          genre: itunesData.primaryGenreName,
          price: itunesData.price,
          released: itunesData.releaseDate,
          version: itunesData.version,
          rating: itunesData.averageUserRating,
          ratingCount: itunesData.userRatingCount
        });
        console.log(`   ✅ Live on App Store`);
        console.log(`   🔗 ${itunesData.trackViewUrl}`);
      } else {
        // App exists in ASC but not live yet
        appsData.push({
          id,
          name,
          bundleId,
          appStoreUrl: null,
          icon: null,
          description: 'Coming soon to the App Store.',
          shortDescription: 'Coming soon',
          screenshots: [],
          genre: null,
          price: null,
          released: null,
          version: null,
          rating: null,
          ratingCount: null,
          status: 'NOT_LIVE'
        });
        console.log(`   ⏳ Not live yet`);
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
    }
    
    // Rate limit (iTunes API allows ~20 req/min)
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Save to JSON
  const outputPath = '/opt/openclaw/clawd/itzami-portfolio/apps-data.json';
  fs.writeFileSync(outputPath, JSON.stringify(appsData, null, 2));
  
  console.log(`\n✅ Saved ${appsData.length} apps to ${outputPath}`);
  console.log(`   Live: ${appsData.filter(a => a.appStoreUrl).length}`);
  console.log(`   Coming soon: ${appsData.filter(a => !a.appStoreUrl).length}`);
}

main().catch(console.error);
