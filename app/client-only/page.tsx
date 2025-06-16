'use client'

import { useEffect, useState } from 'react'

export default function ClientOnlyPage() {
  const [content, setContent] = useState<any>(null)
  const [navigation, setNavigation] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // JavaScript実行後のみコンテンツを生成
    const timer = setTimeout(() => {
      setContent({
        title: 'ClientShadow - JavaScript-Only Content',
        description: 'This content only appears with JavaScript enabled. Perfect for testing crawler JavaScript execution capabilities.',
        subtitle: 'Testing CSR Content Discovery',
        features: [
          'useEffect-generated content',
          'Dynamic navigation links', 
          'Client-side data fetching simulation',
          'Delayed content rendering'
        ],
        articles: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          title: `Profile ${i + 1}`,
          description: `User profile ${i + 1} with dynamic content`,
          url: `/client-only/profile/${i + 1}`,
          category: i % 3 === 0 ? 'Featured' : i % 3 === 1 ? 'Popular' : 'Recent'
        })),
        stats: {
          totalProfiles: 25,
          dynamicPages: 27,
          jsRequiredPercent: 100
        }
      })
      
      setNavigation([
        { label: 'Home', url: '/client-only', icon: '🏠' },
        { label: 'Dashboard', url: '/client-only/dashboard', icon: '📊' },
        { label: 'All Profiles', url: '/client-only/profile/1', icon: '👥' },
        { label: 'Profile 5', url: '/client-only/profile/5', icon: '👤' },
        { label: 'Profile 10', url: '/client-only/profile/10', icon: '👤' },
        { label: 'Profile 15', url: '/client-only/profile/15', icon: '👤' },
        { label: 'Profile 20', url: '/client-only/profile/20', icon: '👤' },
        { label: 'Profile 25', url: '/client-only/profile/25', icon: '👤' }
      ])
      
      setLoading(false)
    }, 100) // わずかな遅延でJS実行を明確化
    
    return () => clearTimeout(timer)
  }, [])
  
  // SSR時は空のコンテナのみ（JavaScript無効時もこの状態）
  if (loading || !content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div id="app-container" className="text-center p-8">
            <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60 text-lg">Loading ClientShadow...</p>
            <p className="text-white/40 text-sm mt-2">JavaScript execution required</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-500/30 rounded-full flex items-center justify-center backdrop-blur-md">
                  <span className="text-white font-bold text-xl">👻</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg">ClientShadow</h1>
                  <p className="text-white/80 text-sm">JavaScript-Only Content Testing</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-green-400 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>JS Active</span>
              </div>
            </div>
          </div>
        </header>

        <nav className="bg-white/5 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 py-4 overflow-x-auto">
              {navigation.map((item, index) => (
                <a
                  key={item.url}
                  href={item.url}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <span className="text-4xl">👻</span>
                <h2 className="text-4xl font-bold text-white">{content.title}</h2>
              </div>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                {content.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="text-white font-bold mb-2">Total Profiles</h4>
                  <p className="text-2xl text-purple-300 font-bold">{content.stats.totalProfiles}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-2">🌐</div>
                  <h4 className="text-white font-bold mb-2">Dynamic Pages</h4>
                  <p className="text-2xl text-purple-300 font-bold">{content.stats.dynamicPages}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="text-white font-bold mb-2">JS Required</h4>
                  <p className="text-2xl text-purple-300 font-bold">{content.stats.jsRequiredPercent}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-3xl">🎯</span>
                <h3 className="text-3xl font-bold text-white">Testing Features</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <span className="text-2xl">✨</span>
                    <span className="text-white font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-3xl">👥</span>
                <h3 className="text-3xl font-bold text-white">Dynamic Profile Links</h3>
                <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">Generated via useEffect</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {content.articles.map((article: any) => (
                  <a
                    key={article.id}
                    href={article.url}
                    className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-purple-500/30 rounded-full flex items-center justify-center group-hover:bg-purple-500/50 transition-colors">
                        <span className="text-white font-bold">{article.id}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium group-hover:text-white/90">{article.title}</h4>
                        <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-white/60 text-sm group-hover:text-white/80">{article.description}</p>
                  </a>
                ))}
              </div>
              
              {/* Additional profile links (11-25) */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                  <span>🔗</span>
                  <span>Extended Profile Network</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {Array.from({ length: 15 }, (_, i) => {
                    const profileId = i + 11
                    return (
                      <a
                        key={profileId}
                        href={`/client-only/profile/${profileId}`}
                        className="group bg-white/5 hover:bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/10 transition-all duration-300 hover:shadow-lg hover:scale-105 text-center"
                      >
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-500/40 transition-colors">
                          <span className="text-white font-bold text-sm">{profileId}</span>
                        </div>
                        <p className="text-white/70 text-xs group-hover:text-white/90">User {profileId}</p>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-8 border border-purple-300/30 shadow-xl">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <span className="text-3xl animate-pulse">⚠️</span>
                <h3 className="text-2xl font-bold text-white">JavaScript Testing Zone</h3>
              </div>
              <p className="text-white/80 text-lg mb-6">
                All content on this page is generated client-side using React useEffect. 
                Crawlers without JavaScript execution will only see the loading state.
              </p>
              <div className="flex justify-center space-x-4">
                <a 
                  href="/client-only/dashboard" 
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-500/30 hover:bg-purple-500/50 backdrop-blur-sm rounded-xl border border-purple-400/50 text-white font-medium transition-all duration-300 hover:scale-105"
                >
                  <span>📊</span>
                  <span>Advanced Dashboard</span>
                </a>
                <a 
                  href="/client-only/profile/1" 
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-pink-500/30 hover:bg-pink-500/50 backdrop-blur-sm rounded-xl border border-pink-400/50 text-white font-medium transition-all duration-300 hover:scale-105"
                >
                  <span>👤</span>
                  <span>Profile Explorer</span>
                </a>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="bg-black/30 backdrop-blur-md border-t border-white/20 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">👻</span>
                  <h4 className="text-xl font-bold text-white">ClientShadow</h4>
                </div>
                <p className="text-white/70">JavaScript-only content for advanced crawler testing.</p>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-4">Other Sites</h5>
                <div className="space-y-2">
                  <a href="/static" className="block text-white/70 hover:text-white transition-colors">
                    🏠 StaticLand
                  </a>
                  <a href="/dynamic" className="block text-white/70 hover:text-white transition-colors">
                    🧩 DynamicMaze
                  </a>
                  <a href="/anti-bot" className="block text-white/70 hover:text-white transition-colors">
                    🛡️ BotWarden
                  </a>
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-4">Profile Range</h5>
                <div className="space-y-2">
                  <a href="/client-only/profile/1" className="block text-white/70 hover:text-white transition-colors">
                    👤 Profiles 1-10
                  </a>
                  <a href="/client-only/profile/11" className="block text-white/70 hover:text-white transition-colors">
                    👤 Profiles 11-20
                  </a>
                  <a href="/client-only/profile/21" className="block text-white/70 hover:text-white transition-colors">
                    👤 Profiles 21-25
                  </a>
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-4">JS Features</h5>
                <div className="space-y-2 text-white/70 text-sm">
                  <p>⚡ useEffect rendering  </p>
                  <p>🔄 Dynamic navigation</p>
                  <p>📱 Client-side routing</p>
                  <p>🎨 Delayed content</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-8 pt-8 text-center">
              <p className="text-white/60 text-sm">
                ClientShadow © 2024 - JavaScript execution testing environment | Content generated at {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}