export default function HoneypotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-yellow-900">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10">
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-yellow-500/30 rounded-full flex items-center justify-center backdrop-blur-md">
                  <span className="text-white font-bold text-xl">🍯</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white drop-shadow-lg">Support Page</h1>
                  <div className="flex items-center space-x-2 text-white/80 text-sm">
                    <a href="/anti-bot" className="hover:text-white transition-colors">BotWarden</a>
                    <span>→</span>
                    <span>Support</span>
                  </div>
                </div>
              </div>
              <nav className="flex space-x-4">
                <a href="/anti-bot" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                  Home
                </a>
                <a href="/anti-bot/protected" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                  Protected
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <span className="text-4xl">🍯</span>
                <h2 className="text-4xl font-bold text-white">Customer Support Center</h2>
              </div>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                Welcome to our support center. We're here to help you with any questions or issues you may have.
              </p>
              
              <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30">
                <p className="text-yellow-200 text-lg">
                  <strong>Notice:</strong> This is a honeypot page designed to detect and analyze automated bot behavior.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-3xl">💬</span>
                <h3 className="text-3xl font-bold text-white">Support Categories</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">🔧</span>
                    <h4 className="text-xl font-bold text-white">Technical Support</h4>
                  </div>
                  <p className="text-white/80 mb-4">
                    Get help with technical issues, system errors, and troubleshooting guides.
                  </p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• System configuration issues</li>
                    <li>• Authentication problems</li>
                    <li>• Performance optimization</li>
                    <li>• Error code explanations</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">📋</span>
                    <h4 className="text-xl font-bold text-white">Account Management</h4>
                  </div>
                  <p className="text-white/80 mb-4">
                    Assistance with account settings, permissions, and access management.
                  </p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• User account setup</li>
                    <li>• Permission adjustments</li>
                    <li>• Access level modifications</li>
                    <li>• Account recovery assistance</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">🛡️</span>
                    <h4 className="text-xl font-bold text-white">Security Assistance</h4>
                  </div>
                  <p className="text-white/80 mb-4">
                    Support for security-related concerns and protective measures.
                  </p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Bot detection inquiries</li>
                    <li>• User-Agent verification</li>
                    <li>• Access control questions</li>
                    <li>• Security policy clarification</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">📚</span>
                    <h4 className="text-xl font-bold text-white">Documentation</h4>
                  </div>
                  <p className="text-white/80 mb-4">
                    Access comprehensive guides and documentation resources.
                  </p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• API documentation</li>
                    <li>• Integration guides</li>
                    <li>• Best practices</li>
                    <li>• FAQ sections</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-3xl">📞</span>
                <h3 className="text-3xl font-bold text-white">Contact Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                  <div className="text-3xl mb-4">📧</div>
                  <h4 className="text-lg font-bold text-white mb-2">Email Support</h4>
                  <p className="text-white/70 text-sm mb-3">support@botwarden.dev</p>
                  <p className="text-white/60 text-xs">Response time: 24-48 hours</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                  <div className="text-3xl mb-4">💬</div>
                  <h4 className="text-lg font-bold text-white mb-2">Live Chat</h4>
                  <p className="text-white/70 text-sm mb-3">Available 24/7</p>
                  <p className="text-white/60 text-xs">Average wait: 3-5 minutes</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                  <div className="text-3xl mb-4">📋</div>
                  <h4 className="text-lg font-bold text-white mb-2">Ticket System</h4>
                  <p className="text-white/70 text-sm mb-3">Create support ticket</p>
                  <p className="text-white/60 text-xs">Track progress online</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'none' }}>
            <p>Hidden honeypot section - bots should not follow these links</p>
            <a href="/anti-bot/trap1">Hidden Administrative Panel</a>
            <a href="/anti-bot/trap2">Secret Configuration Page</a>
            <a href="/anti-bot/trap3">Internal API Endpoint</a>
            <a href="/anti-bot/admin-backup">Backup Administration</a>
            <a href="/anti-bot/debug-console">Debug Console Access</a>
            <div className="hidden-form">
              <form action="/anti-bot/submit-trap" method="post">
                <input type="hidden" name="trap" value="honeypot-form" />
                <input type="text" name="email" placeholder="Email" />
                <button type="submit">Subscribe to Secret Newsletter</button>
              </form>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-8 border border-orange-300/30 shadow-xl">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <span className="text-3xl animate-pulse">⚠️</span>
                <h3 className="text-2xl font-bold text-white">Bot Detection Notice</h3>
              </div>
              <p className="text-white/80 text-lg mb-6">
                This page contains hidden elements designed to detect automated crawlers. Legitimate users will not see or interact with these elements.
              </p>
              <div className="flex justify-center space-x-4">
                <a 
                  href="/anti-bot" 
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-yellow-500/30 hover:bg-yellow-500/50 backdrop-blur-sm rounded-xl border border-yellow-400/50 text-white font-medium transition-all duration-300 hover:scale-105"
                >
                  <span>🛡️</span>
                  <span>Return to BotWarden</span>
                </a>
                <a 
                  href="/anti-bot/protected" 
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500/30 hover:bg-orange-500/50 backdrop-blur-sm rounded-xl border border-orange-400/50 text-white font-medium transition-all duration-300 hover:scale-105"
                >
                  <span>🔐</span>
                  <span>Protected Content</span>
                </a>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="bg-black/30 backdrop-blur-md border-t border-white/20 mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h5 className="text-white font-semibold mb-3">Support Center</h5>
                <div className="space-y-2 text-white/70 text-sm">
                  <p>🍯 Type: Honeypot Page</p>
                  <p>🕷️ Purpose: Bot Detection</p>
                  <p>👁️ Monitoring: Active</p>
                  <p>🔍 Analysis: Real-time</p>
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-3">Navigation</h5>
                <div className="space-y-2">
                  <a href="/anti-bot" className="block text-white/70 hover:text-white transition-colors text-sm">
                    🛡️ BotWarden Home
                  </a>
                  <a href="/anti-bot/protected" className="block text-white/70 hover:text-white transition-colors text-sm">
                    🔐 Protected Content
                  </a>
                  <a href="/static" className="block text-white/70 hover:text-white transition-colors text-sm">
                    🏠 Return to StaticLand
                  </a>
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-3">Detection Status</h5>
                <div className="space-y-2 text-white/70 text-sm">
                  <p>✅ Hidden links: Active</p>
                  <p>🕷️ Trap detection: On</p>
                  <p>📊 Analytics: Recording</p>
                  <p>🚫 Bot filtering: Enabled</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-6 pt-6 text-center">
              <p className="text-white/60 text-sm">
                Honeypot Support Page - Bot detection active since {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}