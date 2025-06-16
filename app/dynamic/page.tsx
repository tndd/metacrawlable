export const metadata = {
  title: 'Dynamic Maze - Home',
  description: 'Dynamic layout testing environment for web crawlers',
}

export default function DynamicPage() {
  const layoutVariant = Math.floor(Math.random() * 3) + 1
  const sectionOrder = ['news', 'featured', 'trending'].sort(() => Math.random() - 0.5)
  const showSidebar = Math.random() > 0.3
  const adSlots = Math.floor(Math.random() * 4)
  const gradientVariant = Math.floor(Math.random() * 3) + 1
  
  const gradients = [
    'from-purple-600 via-pink-600 to-blue-600',
    'from-green-400 via-blue-500 to-purple-600', 
    'from-yellow-400 via-red-500 to-pink-500'
  ]
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradients[gradientVariant - 1]} layout-v${layoutVariant}`}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <header className="backdrop-blur-md bg-white/20 border-b border-white/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md">
                  <span className="text-white font-bold text-xl">🧩</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg">Dynamic Maze</h1>
                  <p className="text-white/80 text-sm">Layout variant: {layoutVariant} | Gradient: {gradientVariant}</p>
                </div>
              </div>
              <nav className="flex space-x-6">
                <a href="/dynamic" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                  Home
                </a>
                <a href="/dynamic/random" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                  Random Structure
                </a>
              </nav>
            </div>
          </div>
        </header>
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className={`grid ${layoutVariant === 1 ? 'grid-cols-1 lg:grid-cols-3' : layoutVariant === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-8`}>
            {sectionOrder.map((section, index) => {
              const sectionIcons = { news: '📰', featured: '⭐', trending: '🔥' }
              const cardColors = [
                'bg-white/20 hover:bg-white/30',
                'bg-black/10 hover:bg-black/20', 
                'bg-gradient-to-r from-white/10 to-white/20 hover:from-white/20 hover:to-white/30'
              ]
              
              return (
                <section key={section} className={`section-${section} order-${index} transform transition-all duration-500 hover:scale-105`}>
                  <div className={`${cardColors[index]} backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-2xl`}>
                    <div className="flex items-center space-x-3 mb-6">
                      <span className="text-3xl">{sectionIcons[section as keyof typeof sectionIcons]}</span>
                      <h2 className="text-2xl font-bold text-white capitalize">{section}</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Array.from({ length: 4 }, (_, i) => {
                        const sectionId = i * 5 + index + 1
                        return (
                          <a 
                            key={i}
                            href={`/dynamic/sections/${sectionId}`}
                            className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                <span className="text-white font-bold text-sm">{sectionId}</span>
                              </div>
                              <div>
                                <p className="text-white font-medium group-hover:text-white/90">{section} item {i + 1}</p>
                                <p className="text-white/60 text-xs">Section {sectionId}</p>
                              </div>
                            </div>
                          </a>
                        )
                      })}
                    </div>
                    
                    {index === 1 && adSlots > 0 && (
                      <div className={`mt-6 p-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-xl border border-yellow-300/30 ad-slot-${Math.floor(Math.random() * 3) + 1}`}>
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-300">💰</span>
                          <p className="text-white font-medium">Advertisement Slot</p>
                        </div>
                        <p className="text-white/70 text-sm mt-1">Dynamic ad placement</p>
                      </div>
                    )}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      
        {Array.from({ length: Math.max(0, adSlots - 1) }, (_, i) => (
          <div 
            key={i} 
            className={`fixed bottom-4 right-4 z-40 floating-ad-${Math.floor(Math.random() * 5) + 1}`}
            style={{
              transform: `translateY(${i * -80}px)`
            }}
          >
            <div className="bg-gradient-to-r from-pink-500/90 to-purple-600/90 backdrop-blur-md rounded-lg p-4 border border-white/30 shadow-xl animate-pulse">
              <div className="flex items-center space-x-2">
                <span className="text-white">🎯</span>
                <p className="text-white font-medium text-sm">Floating Ad {i + 1}</p>
              </div>
            </div>
          </div>
        ))}
        
        {showSidebar && (
          <aside className={`fixed left-4 top-1/2 transform -translate-y-1/2 w-64 z-30 sidebar-${Math.floor(Math.random() * 5) + 1}`}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🔗</span>
                <h3 className="text-xl font-bold text-white">Dynamic Sidebar</h3>
              </div>
              <p className="text-white/80 text-sm mb-6">This sidebar appears randomly (70% chance)</p>
              <div className="space-y-3">
                {[1, 7, 15].map(sectionNum => (
                  <a 
                    key={sectionNum}
                    href={`/dynamic/sections/${sectionNum}`}
                    className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-x-1 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <span className="text-white font-bold text-xs">{sectionNum}</span>
                      </div>
                      <span className="text-white font-medium group-hover:text-white/90">Section {sectionNum}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        )}
      
        <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 main-content-${layoutVariant}`}>
          <div className="text-center mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/30 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-6">Welcome to Dynamic Maze</h2>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                This page structure changes with every request to test crawler adaptability. 
                Experience a different layout and structure each time you visit.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-2">🎛️</div>
                  <h4 className="text-white font-bold mb-2">Layout</h4>
                  <p className="text-white/70">Version {layoutVariant}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-2">🔄</div>
                  <h4 className="text-white font-bold mb-2">Order</h4>
                  <p className="text-white/70">{sectionOrder.join(' → ')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-2">📱</div>
                  <h4 className="text-white font-bold mb-2">Sidebar</h4>
                  <p className="text-white/70">{showSidebar ? 'Visible' : 'Hidden'}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="text-white font-bold mb-2">Ads</h4>
                  <p className="text-white/70">{adSlots} slots</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-8">All Available Sections</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4">
              {Array.from({ length: 20 }, (_, i) => (
                <a 
                  key={i} 
                  href={`/dynamic/sections/${i + 1}`} 
                  className={`group bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/20 transition-all duration-300 hover:shadow-xl hover:scale-105 grid-item-${(i % 3) + 1}`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-white/30 transition-colors">
                      <span className="text-white font-bold">{i + 1}</span>
                    </div>
                    <p className="text-white/80 text-sm font-medium group-hover:text-white">Section {i + 1}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </main>
      
        <footer className={`bg-black/20 backdrop-blur-md border-t border-white/30 mt-20 footer-style-${Math.floor(Math.random() * 2) + 1}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">🧩</span>
                  <h4 className="text-xl font-bold text-white">DynamicMaze</h4>
                </div>
                <p className="text-white/70">Testing dynamic structure adaptation with every page load.</p>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-4">Other Sites</h5>
                <div className="space-y-2">
                  <a href="/static" className="block text-white/70 hover:text-white transition-colors">
                    🏠 StaticLand
                  </a>
                  <a href="/client-only" className="block text-white/70 hover:text-white transition-colors">
                    👻 ClientShadow
                  </a>
                  <a href="/anti-bot" className="block text-white/70 hover:text-white transition-colors">
                    🛡️ BotWarden
                  </a>
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-4">Quick Links</h5>
                <div className="space-y-2">
                  <a href="/dynamic" className="block text-white/70 hover:text-white transition-colors">
                    🏠 Home
                  </a>
                  <a href="/dynamic/random" className="block text-white/70 hover:text-white transition-colors">
                    🎲 Random Structure
                  </a>
                  <a href="/dynamic/sections/1" className="block text-white/70 hover:text-white transition-colors">
                    📄 Section 1
                  </a>
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-4">Features</h5>
                <div className="space-y-2 text-white/70 text-sm">
                  <p>✨ Dynamic layouts</p>
                  <p>🔄 Random ordering</p>
                  <p>📱 Responsive design</p>
                  <p>🎨 Gradient backgrounds</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-8 pt-8 text-center">
              <p className="text-white/60 text-sm">
                MetaCrawlable © 2024 - Dynamic structure testing environment
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}