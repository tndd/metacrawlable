export default function AntiBotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-900">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10">
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-500/30 rounded-full flex items-center justify-center backdrop-blur-md">
                  <span className="text-white font-bold text-xl">🛡️</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg">BotWarden</h1>
                  <p className="text-white/80 text-sm">Access Control System</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-green-400 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Access Granted</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <span className="text-4xl">🛡️</span>
                <h2 className="text-4xl font-bold text-white">Bot Warden - Access Control</h2>
              </div>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                You have successfully accessed this protected area. Your User-Agent has been verified as legitimate.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-2">🔒</div>
                  <h4 className="text-white font-bold mb-2">Protection Level</h4>
                  <p className="text-2xl text-orange-300 font-bold">High</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-2">🕷️</div>
                  <h4 className="text-white font-bold mb-2">Bots Blocked</h4>
                  <p className="text-2xl text-orange-300 font-bold">24/7</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-2">✅</div>
                  <h4 className="text-white font-bold mb-2">Your Status</h4>
                  <p className="text-2xl text-green-300 font-bold">Verified</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-3xl">🚪</span>
                <h3 className="text-3xl font-bold text-white">Protected Areas</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a 
                  href="/anti-bot/protected" 
                  className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-orange-500/30 rounded-full flex items-center justify-center group-hover:bg-orange-500/50 transition-colors">
                      <span className="text-white font-bold text-xl">🔐</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-white/90">Protected Content</h4>
                      <p className="text-white/60">Secure documents and data</p>
                    </div>
                  </div>
                  <p className="text-white/80 group-hover:text-white/90">
                    Access restricted documents that require authentication verification.
                  </p>
                </a>
                
                <a 
                  href="/anti-bot/honeypot" 
                  className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-500/30 rounded-full flex items-center justify-center group-hover:bg-yellow-500/50 transition-colors">
                      <span className="text-white font-bold text-xl">🍯</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-white/90">Support Page</h4>
                      <p className="text-white/60">Get help and assistance</p>
                    </div>
                  </div>
                  <p className="text-white/80 group-hover:text-white/90">
                    Need help accessing the system? Visit our support section.
                  </p>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-3xl">⚠️</span>
                <h3 className="text-3xl font-bold text-white">Security Notice</h3>
              </div>
              <div className="bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-orange-400/30">
                <p className="text-white/90 text-lg mb-4">
                  <strong>This content is only visible to non-bot user agents.</strong>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">🚫 Blocked User Agents:</h5>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Googlebot, Bingbot, DuckDuckBot</li>
                      <li>• Any agent containing 'bot', 'crawler', 'spider'</li>
                      <li>• Empty or missing User-Agent headers</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-2">✅ Allowed Access:</h5>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Standard web browsers</li>
                      <li>• Mobile browser agents</li>
                      <li>• Custom legitimate user agents</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-green-500/20 via-blue-500/20 to-green-500/20 backdrop-blur-md rounded-2xl p-8 border border-green-300/30 shadow-xl">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <span className="text-3xl animate-pulse">🔍</span>
                <h3 className="text-2xl font-bold text-white">Anti-Bot Testing Zone</h3>
              </div>
              <p className="text-white/80 text-lg mb-6">
                This area tests crawler ability to bypass User-Agent detection and handle access control mechanisms.
              </p>
              <div className="flex justify-center space-x-4">
                <a 
                  href="/static" 
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500/30 hover:bg-blue-500/50 backdrop-blur-sm rounded-xl border border-blue-400/50 text-white font-medium transition-all duration-300 hover:scale-105"
                >
                  <span>🏠</span>
                  <span>Return to StaticLand</span>
                </a>
                <a 
                  href="/dynamic" 
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-500/30 hover:bg-purple-500/50 backdrop-blur-sm rounded-xl border border-purple-400/50 text-white font-medium transition-all duration-300 hover:scale-105"
                >
                  <span>🧩</span>
                  <span>Visit DynamicMaze</span>
                </a>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="bg-black/30 backdrop-blur-md border-t border-white/20 mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">🛡️</span>
                  <h4 className="text-xl font-bold text-white">BotWarden</h4>
                </div>
                <p className="text-white/70">Advanced User-Agent detection and access control testing.</p>
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
                  <a href="/client-only" className="block text-white/70 hover:text-white transition-colors">
                    👻 ClientShadow
                  </a>
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-4">Protected Areas</h5>
                <div className="space-y-2">
                  <a href="/anti-bot/protected" className="block text-white/70 hover:text-white transition-colors">
                    🔐 Protected Content
                  </a>
                  <a href="/anti-bot/honeypot" className="block text-white/70 hover:text-white transition-colors">
                    🍯 Support Page
                  </a>
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-4">Security Features</h5>
                <div className="space-y-2 text-white/70 text-sm">
                  <p>🔍 User-Agent detection</p>
                  <p>🚫 Bot blocking</p>
                  <p>🍯 Honeypot traps</p>
                  <p>⚡ Real-time filtering</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-8 pt-8 text-center">
              <p className="text-white/60 text-sm">
                BotWarden © 2024 - User-Agent based access control testing environment
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}