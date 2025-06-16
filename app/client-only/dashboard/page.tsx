'use client'

import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [chartData, setChartData] = useState<any>(null)
  const [realTimeData, setRealTimeData] = useState<any>(null)
  
  useEffect(() => {
    // Dashboard data generation - complex JavaScript operations
    const timer = setTimeout(() => {
      const currentTime = new Date()
      const profileData = Array.from({ length: 25 }, (_, i) => {
        const id = i + 1
        return {
          id,
          name: `User ${id}`,
          lastActive: Math.floor(Math.random() * 30) + 1,
          posts: Math.floor(Math.random() * 50) + 10,
          engagement: Math.floor(Math.random() * 100),
          status: Math.random() > 0.3 ? 'active' : 'inactive',
          category: ['Developer', 'Designer', 'Manager', 'Analyst', 'Consultant'][id % 5]
        }
      })
      
      const analytics = {
        totalUsers: 25,
        activeUsers: profileData.filter(p => p.status === 'active').length,
        totalPosts: profileData.reduce((sum, p) => sum + p.posts, 0),
        avgEngagement: Math.floor(profileData.reduce((sum, p) => sum + p.engagement, 0) / 25),
        topCategories: {
          'Developer': profileData.filter(p => p.category === 'Developer').length,
          'Designer': profileData.filter(p => p.category === 'Designer').length,
          'Manager': profileData.filter(p => p.category === 'Manager').length,
          'Analyst': profileData.filter(p => p.category === 'Analyst').length,
          'Consultant': profileData.filter(p => p.category === 'Consultant').length
        }
      }
      
      setDashboardData({
        profiles: profileData,
        analytics,
        lastUpdated: currentTime.toLocaleString(),
        systemInfo: {
          uptime: '99.9%',
          version: '2.1.4',
          environment: 'Production',
          jsEnabled: true
        }
      })
      
      // Generate chart data
      setChartData({
        daily: Array.from({ length: 7 }, (_, i) => ({
          day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
          users: Math.floor(Math.random() * 100) + 50,
          posts: Math.floor(Math.random() * 200) + 100
        })),
        monthly: Array.from({ length: 12 }, (_, i) => ({
          month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
          growth: Math.floor(Math.random() * 30) + 10
        }))
      })
      
      setLoading(false)
    }, 200) // Complex dashboard loading simulation
    
    return () => clearTimeout(timer)
  }, [])
  
  // Real-time data updates (JavaScript-only feature)
  useEffect(() => {
    if (!dashboardData) return
    
    const interval = setInterval(() => {
      setRealTimeData({
        timestamp: new Date().toLocaleTimeString(),
        onlineUsers: Math.floor(Math.random() * 15) + 10,
        currentRequests: Math.floor(Math.random() * 50) + 20,
        serverLoad: Math.floor(Math.random() * 40) + 30
      })
    }, 3000)
    
    return () => clearInterval(interval)
  }, [dashboardData])
  
  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center p-8">
            <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <p className="text-white/60 text-xl">Loading Dashboard...</p>
            <p className="text-white/40 text-sm mt-2">Complex JavaScript operations in progress</p>
            <div className="mt-4 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  const TabButton = ({ id, label, icon }: { id: string, label: string, icon: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        activeTab === id 
          ? 'bg-purple-500/30 text-white border border-purple-400/50' 
          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-500/30 rounded-full flex items-center justify-center backdrop-blur-md">
                  <span className="text-white font-bold text-xl">📊</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg">Dashboard</h1>
                  <div className="flex items-center space-x-2 text-white/80 text-sm">
                    <a href="/client-only" className="hover:text-white transition-colors">ClientShadow</a>
                    <span>→</span>
                    <span>Dashboard</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {realTimeData && (
                  <div className="flex items-center space-x-2 text-green-400 text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>Live: {realTimeData.onlineUsers} online</span>
                  </div>
                )}
                <nav className="flex space-x-2">
                  <a href="/client-only" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                    Home
                  </a>
                  <a href="/client-only/profile/1" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                    Profiles
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Real-time Status Bar */}
          {realTimeData && (
            <div className="mb-8 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-6 border border-green-400/30 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl animate-pulse">⚡</span>
                  <h3 className="text-xl font-bold text-white">Real-time System Status</h3>
                  <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">Live Updates</span>
                </div>
                <span className="text-white/60 text-sm">Updated: {realTimeData.timestamp}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">👥</span>
                    <span className="text-white font-medium">Online Users</span>
                  </div>
                  <div className="text-2xl font-bold text-green-300 mt-1">{realTimeData.onlineUsers}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400">🔄</span>
                    <span className="text-white font-medium">Current Requests</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-300 mt-1">{realTimeData.currentRequests}/min</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-400">⚙️</span>
                    <span className="text-white font-medium">Server Load</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-300 mt-1">{realTimeData.serverLoad}%</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <TabButton id="overview" label="Overview" icon="📈" />
              <TabButton id="profiles" label="User Profiles" icon="👥" />
              <TabButton id="analytics" label="Analytics" icon="📊" />
              <TabButton id="system" label="System" icon="⚙️" />
            </div>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <span>📈</span>
                  <span>Key Metrics</span>
                  <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">JavaScript Generated</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                    <div className="text-3xl mb-2">👥</div>
                    <div className="text-3xl font-bold text-purple-300">{dashboardData.analytics.totalUsers}</div>
                    <div className="text-white/60">Total Users</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-3xl font-bold text-green-300">{dashboardData.analytics.activeUsers}</div>
                    <div className="text-white/60">Active Users</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                    <div className="text-3xl mb-2">📝</div>
                    <div className="text-3xl font-bold text-blue-300">{dashboardData.analytics.totalPosts}</div>
                    <div className="text-white/60">Total Posts</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="text-3xl font-bold text-yellow-300">{dashboardData.analytics.avgEngagement}%</div>
                    <div className="text-white/60">Avg Engagement</div>
                  </div>
                </div>
              </div>
              
              {/* Category Distribution */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <span>🎯</span>
                  <span>User Categories</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {Object.entries(dashboardData.analytics.topCategories).map(([category, count]) => (
                    <div key={category} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
                      <div className="text-2xl mb-2">
                        {category === 'Developer' ? '💻' : 
                         category === 'Designer' ? '🎨' : 
                         category === 'Manager' ? '👔' : 
                         category === 'Analyst' ? '📊' : '🎯'}
                      </div>
                      <div className="text-xl font-bold text-purple-300">{count as number}</div>
                      <div className="text-white/60 text-sm">{category}s</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'profiles' && (
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <span>👥</span>
                <span>User Profile Management</span>
                <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">25 Profiles</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {dashboardData.profiles.map((profile: any) => (
                  <a
                    key={profile.id}
                    href={`/client-only/profile/${profile.id}`}
                    className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        profile.status === 'active' ? 'bg-green-500/30' : 'bg-red-500/30'
                      } group-hover:opacity-80 transition-opacity`}>
                        <span className="text-white font-bold">{profile.id}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium group-hover:text-white/90">{profile.name}</h4>
                        <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
                          {profile.category}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between text-white/60">
                        <span>Posts:</span>
                        <span className="text-white">{profile.posts}</span>
                      </div>
                      <div className="flex justify-between text-white/60">
                        <span>Engagement:</span>
                        <span className="text-white">{profile.engagement}%</span>
                      </div>
                      <div className="flex justify-between text-white/60">
                        <span>Last Active:</span>
                        <span className="text-white">{profile.lastActive}d ago</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'analytics' && chartData && (
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <span>📊</span>
                  <span>Weekly Activity</span>
                </h3>
                <div className="grid grid-cols-7 gap-4">
                  {chartData.daily.map((day: any, index: number) => (
                    <div key={index} className="text-center">
                      <div className="text-white/60 text-sm mb-2">{day.day}</div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="text-lg font-bold text-purple-300 mb-1">{day.users}</div>
                        <div className="text-xs text-white/60">Users</div>
                        <div className="text-sm font-medium text-blue-300 mt-2">{day.posts}</div>
                        <div className="text-xs text-white/60">Posts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <span>📈</span>
                  <span>Monthly Growth</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {chartData.monthly.slice(0, 6).map((month: any, index: number) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
                      <div className="text-white/60 text-sm mb-2">{month.month}</div>
                      <div className="text-2xl font-bold text-green-300">{month.growth}%</div>
                      <div className="text-xs text-white/60">Growth</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'system' && (
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <span>⚙️</span>
                <span>System Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Application Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg border border-white/20">
                      <span className="text-white/80">Uptime</span>
                      <span className="text-green-300 font-medium">{dashboardData.systemInfo.uptime}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg border border-white/20">
                      <span className="text-white/80">Version</span>
                      <span className="text-purple-300 font-medium">{dashboardData.systemInfo.version}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg border border-white/20">
                      <span className="text-white/80">Environment</span>
                      <span className="text-blue-300 font-medium">{dashboardData.systemInfo.environment}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg border border-white/20">
                      <span className="text-white/80">JavaScript Enabled</span>
                      <span className="text-green-300 font-medium">✅ Yes</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Last Updated</h4>
                  <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                    <p className="text-white/80">{dashboardData.lastUpdated}</p>
                    <p className="text-white/60 text-sm mt-2">Dashboard data refreshed automatically via JavaScript</p>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-white mb-4 mt-6">Quick Actions</h4>
                  <div className="space-y-3">
                    <a href="/client-only" className="block bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-sm rounded-lg p-3 border border-purple-400/30 text-white font-medium transition-all duration-300 hover:scale-105 text-center">
                      🏠 Return to Home
                    </a>
                    <a href="/client-only/profile/1" className="block bg-pink-500/20 hover:bg-pink-500/30 backdrop-blur-sm rounded-lg p-3 border border-pink-400/30 text-white font-medium transition-all duration-300 hover:scale-105 text-center">
                      👤 View Profiles
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
        
        <footer className="bg-black/30 backdrop-blur-md border-t border-white/20 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">📊</span>
                  <h4 className="text-xl font-bold text-white">Dashboard</h4>
                </div>
                <p className="text-white/70">Advanced analytics and user management system with JavaScript-powered real-time updates.</p>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-4">Navigation</h5>
                <div className="space-y-2">
                  <a href="/client-only" className="block text-white/70 hover:text-white transition-colors">
                    🏠 ClientShadow Home
                  </a>
                  <a href="/client-only/profile/1" className="block text-white/70 hover:text-white transition-colors">
                    👤 User Profiles
                  </a>
                  <a href="/client-only/dashboard" className="block text-white/70 hover:text-white transition-colors">
                    📊 Dashboard
                  </a>
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-4">Data Stats</h5>
                <div className="space-y-2 text-white/70 text-sm">
                  <p>👥 {dashboardData.analytics.totalUsers} Total Users</p>
                  <p>✅ {dashboardData.analytics.activeUsers} Active Users</p>
                  <p>📝 {dashboardData.analytics.totalPosts} Total Posts</p>
                  <p>⚡ {dashboardData.analytics.avgEngagement}% Avg Engagement</p>
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-4">System</h5>
                <div className="space-y-2 text-white/70 text-sm">
                  <p>⚡ JavaScript Active</p>
                  <p>🔄 Real-time Updates</p>
                  <p>📱 Responsive Design</p>
                  <p>🎨 Dynamic Tabs</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-8 pt-8 text-center">
              <p className="text-white/60 text-sm">
                Dashboard - Complex JavaScript operations | Updated: {dashboardData.lastUpdated}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}