export default function ProtectedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-900">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10">
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-red-500/30 rounded-full flex items-center justify-center backdrop-blur-md">
                  <span className="text-white font-bold text-xl">🔐</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white drop-shadow-lg">Protected Content</h1>
                  <div className="flex items-center space-x-2 text-white/80 text-sm">
                    <a href="/anti-bot" className="hover:text-white transition-colors">BotWarden</a>
                    <span>→</span>
                    <span>Protected</span>
                  </div>
                </div>
              </div>
              <nav className="flex space-x-4">
                <a href="/anti-bot" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                  Home
                </a>
                <a href="/anti-bot/honeypot" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                  Support
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <span className="text-4xl">🔐</span>
                <h2 className="text-4xl font-bold text-white">Secure Document Access</h2>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-400 text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Authentication Verified - Access Granted</span>
              </div>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                Welcome to the protected content area. This page contains sensitive information that is only accessible to verified, non-automated visitors.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-3xl">📋</span>
                <h3 className="text-3xl font-bold text-white">Confidential Documents</h3>
                <span className="text-sm text-white/60 bg-red-500/20 px-3 py-1 rounded-full">Restricted Access</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">📄</span>
                    <h4 className="text-xl font-bold text-white">Security Report Q4 2024</h4>
                  </div>
                  <div className="space-y-3 text-white/80">
                    <p><strong>Classification:</strong> Internal Use Only</p>
                    <p><strong>Document ID:</strong> SEC-2024-Q4-001</p>
                    <p><strong>Last Modified:</strong> 2024-06-16</p>
                    <p><strong>Access Level:</strong> Authenticated Users Only</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">🗂️</span>
                    <h4 className="text-xl font-bold text-white">API Access Logs</h4>
                  </div>
                  <div className="space-y-3 text-white/80">
                    <p><strong>Classification:</strong> Confidential</p>
                    <p><strong>Document ID:</strong> API-LOG-2024-001</p>
                    <p><strong>Last Modified:</strong> 2024-06-16</p>
                    <p><strong>Access Level:</strong> Security Team Only</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">🔍</span>
                    <h4 className="text-xl font-bold text-white">Bot Detection Analysis</h4>
                  </div>
                  <div className="space-y-3 text-white/80">
                    <p><strong>Classification:</strong> Internal Use Only</p>
                    <p><strong>Document ID:</strong> BOT-DETECT-2024-001</p>
                    <p><strong>Last Modified:</strong> 2024-06-16</p>
                    <p><strong>Access Level:</strong> Verified Users</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">⚡</span>
                    <h4 className="text-xl font-bold text-white">Real-time Alerts</h4>
                  </div>
                  <div className="space-y-3 text-white/80">
                    <p><strong>Classification:</strong> Operational</p>
                    <p><strong>Document ID:</strong> ALERT-SYS-2024-001</p>
                    <p><strong>Last Modified:</strong> 2024-06-16</p>
                    <p><strong>Access Level:</strong> Monitoring Team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-3xl">📊</span>
                <h3 className="text-3xl font-bold text-white">Access Statistics</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-3xl mb-2">🛡️</div>
                  <div className="text-2xl font-bold text-orange-300">2,847</div>
                  <div className="text-white/60 text-sm">Blocked Attempts</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="text-2xl font-bold text-green-300">156</div>
                  <div className="text-white/60 text-sm">Verified Access</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-3xl mb-2">🕷️</div>
                  <div className="text-2xl font-bold text-red-300">94.8%</div>
                  <div className="text-white/60 text-sm">Detection Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-3xl mb-2">⏱️</div>
                  <div className="text-2xl font-bold text-blue-300">&lt; 1ms</div>
                  <div className="text-white/60 text-sm">Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}