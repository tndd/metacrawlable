export default function DynamicPage() {
  const layoutVariant = Math.floor(Math.random() * 3) + 1
  const sectionOrder = ['news', 'featured', 'trending'].sort(() => Math.random() - 0.5)
  const showSidebar = Math.random() > 0.3
  const adSlots = Math.floor(Math.random() * 4)
  
  return (
    <div className={`layout-v${layoutVariant}`}>
      <header className="header">
        <h1>Dynamic Maze</h1>
        <p>Layout variant: {layoutVariant}</p>
        <nav>
          <a href="/dynamic">Home</a>
          <a href="/dynamic/random">Random Structure</a>
        </nav>
      </header>
      
      {sectionOrder.map((section, index) => (
        <section key={section} className={`section-${section} order-${index}`}>
          <h2>Section: {section}</h2>
          <ul>
            {Array.from({ length: 4 }, (_, i) => {
              const sectionId = i * 5 + index + 1
              return (
                <li key={i}>
                  <a href={`/dynamic/sections/${sectionId}`}>
                    {section} item {i + 1} (Section {sectionId})
                  </a>
                </li>
              )
            })}
          </ul>
          
          {index === 1 && adSlots > 0 && (
            <div className={`ad-slot-${Math.floor(Math.random() * 3) + 1}`}>
              <p>Advertisement Slot</p>
            </div>
          )}
        </section>
      ))}
      
      {Array.from({ length: Math.max(0, adSlots - 1) }, (_, i) => (
        <div key={i} className={`floating-ad-${Math.floor(Math.random() * 5) + 1}`}>
          <p>Floating Ad {i + 1}</p>
        </div>
      ))}
      
      {showSidebar && (
        <aside className={`sidebar-${Math.floor(Math.random() * 5) + 1}`}>
          <h3>Dynamic Sidebar</h3>
          <p>This sidebar appears randomly (70% chance)</p>
          <ul>
            <li><a href="/dynamic/sections/1">Section 1</a></li>
            <li><a href="/dynamic/sections/7">Section 7</a></li>
            <li><a href="/dynamic/sections/15">Section 15</a></li>
          </ul>
        </aside>
      )}
      
      <main className={`main-content-${layoutVariant}`}>
        <h2>Welcome to Dynamic Maze</h2>
        <p>This page structure changes with every request to test crawler adaptability.</p>
        <p>Current configuration:</p>
        <ul>
          <li>Layout: Version {layoutVariant}</li>
          <li>Section Order: {sectionOrder.join(' → ')}</li>
          <li>Sidebar: {showSidebar ? 'Visible' : 'Hidden'}</li>
          <li>Ad Slots: {adSlots}</li>
        </ul>
        
        <h3>Available Sections</h3>
        <div className="section-grid">
          {Array.from({ length: 20 }, (_, i) => (
            <a key={i} href={`/dynamic/sections/${i + 1}`} className={`grid-item-${(i % 3) + 1}`}>
              Section {i + 1}
            </a>
          ))}
        </div>
      </main>
      
      <footer className={`footer-style-${Math.floor(Math.random() * 2) + 1}`}>
        <p>DynamicMaze - Testing dynamic structure adaptation</p>
        <nav>
          <a href="/static">StaticLand</a>
          <a href="/client-only">ClientShadow</a>
          <a href="/anti-bot">BotWarden</a>
        </nav>
      </footer>
    </div>
  )
}