import appsData from '../apps-data.json';

interface App {
  id: string;
  name: string;
  bundleId: string;
  appStoreUrl: string | null;
  icon: string | null;
  description: string | null;
  shortDescription: string;
  screenshots: string[];
  genre: string | null;
  price: number | null;
  released: string | null;
  version: string | null;
  rating: number | null;
  ratingCount: number | null;
  status?: string;
}

function AppCard({ app }: { app: App }) {
  const isLive = !!app.appStoreUrl;
  
  return (
    <div className={`app-card ${!isLive ? 'not-live' : ''}`}>
      {!isLive && <span className="app-badge coming-soon">Coming Soon</span>}
      
      {/* Only show icon if app is live and has an icon */}
      {isLive && app.icon && (
        <img 
          src={app.icon} 
          alt={app.name} 
          className="app-icon" 
        />
      )}
      
      <div className="app-name">{app.name}</div>
      <div className="app-desc">
        {isLive ? (app.shortDescription || 'Available now') : 'Coming soon to the App Store'}
      </div>
      
      {app.genre && (
        <div className="app-meta">
          📱 {app.genre}{app.price && app.price > 0 ? ` • $${app.price}` : ' • Free'}
        </div>
      )}
      
      {isLive && (
        <a href={app.appStoreUrl!} target="_blank" rel="noopener noreferrer" className="app-link">
          View on App Store →
        </a>
      )}
    </div>
  );
}

export default function Home() {
  const apps = appsData as App[];
  const liveApps = apps.filter(a => a.appStoreUrl);
  const comingSoon = apps.filter(a => !a.appStoreUrl);
  const sortedApps = [...liveApps, ...comingSoon];

  return (
    <>
      <div className="container">
        <header>
          <h1>Rui Sousa</h1>
          <p className="subtitle">iOS & React Native Developer</p>
          <p className="intro">
            I build and ship mobile apps fast. {liveApps.length} apps live on the App Store, from baby trackers to AI-powered identifier tools. 
            Available for consulting, freelance projects, and building your next app.
          </p>
          <div className="cta">
            <a href="mailto:rui@itzami.com" className="btn">Hire Me</a>
            <a href="https://twitter.com/rui_ro_sousa" target="_blank" rel="noopener noreferrer" className="btn-secondary btn">Twitter</a>
            <a href="https://github.com/ItzaMi" target="_blank" rel="noopener noreferrer" className="btn-secondary btn">GitHub</a>
          </div>
        </header>

        <section>
          <h2>By The Numbers</h2>
          <div className="stats">
            <div className="stat-card">
              <span className="stat-number">{apps.length}</span>
              <span className="stat-label">Apps Shipped</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{liveApps.length}</span>
              <span className="stat-label">Live on App Store</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">3+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </section>

        <section>
          <h2>Apps</h2>
          <div className="apps-grid">
            {sortedApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>

        <section>
          <h2>Skills & Tech Stack</h2>
          <div className="skills">
            <span className="skill-tag">React Native</span>
            <span className="skill-tag">Expo</span>
            <span className="skill-tag">TypeScript</span>
            <span className="skill-tag">iOS Development</span>
            <span className="skill-tag">App Store Connect</span>
            <span className="skill-tag">RevenueCat (IAP)</span>
            <span className="skill-tag">Firebase</span>
            <span className="skill-tag">REST APIs</span>
            <span className="skill-tag">AI/ML Integration</span>
            <span className="skill-tag">Vision AI</span>
            <span className="skill-tag">Git & CI/CD</span>
            <span className="skill-tag">Vercel & Serverless</span>
          </div>
        </section>

        <section className="contact">
          <h2>Let&apos;s Work Together</h2>
          <p>Available for consulting, freelance projects, and building your next mobile app.</p>
          <div className="social-links">
            <a href="mailto:rui@itzami.com" className="btn">Email Me</a>
            <a href="https://twitter.com/rui_ro_sousa" target="_blank" rel="noopener noreferrer" className="btn-secondary btn">Twitter</a>
            <a href="https://github.com/ItzaMi" target="_blank" rel="noopener noreferrer" className="btn-secondary btn">GitHub</a>
          </div>
        </section>
      </div>

      <footer>
        <p>© 2026 Rui Sousa • Built with Next.js</p>
      </footer>
    </>
  );
}
