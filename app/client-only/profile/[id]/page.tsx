'use client'

import { useEffect, useState } from 'react'

export async function generateStaticParams() {
  return Array.from({ length: 25 }, (_, i) => ({
    id: (i + 1).toString()
  }))
}

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [relatedProfiles, setRelatedProfiles] = useState<any[]>([])
  
  // Extract id from params
  const [id, setId] = useState<string>('')
  
  useEffect(() => {
    params.then(({ id: paramId }) => {
      setId(paramId)
    })
  }, [params])
  
  useEffect(() => {
    if (!id) return
    
    // API風のデータ取得をシミュレート
    const timer = setTimeout(() => {
      const profileId = parseInt(id)
      const profileTypes = ['Developer', 'Designer', 'Manager', 'Analyst', 'Consultant']
      const skillSets = [
        ['React', 'TypeScript', 'Node.js'],
        ['Figma', 'Sketch', 'Adobe XD'], 
        ['Leadership', 'Strategy', 'Planning'],
        ['SQL', 'Python', 'Tableau'],
        ['Business', 'Process', 'Optimization']
      ]
      const profileType = profileTypes[profileId % 5]
      const skills = skillSets[profileId % 5]
      
      setProfile({
        id: id,
        name: `User ${id}`,
        title: `${profileType} #${id}`,
        bio: `Experienced ${profileType.toLowerCase()} with a passion for innovation and technology. User ${id} has been working in the field for ${Math.floor(Math.random() * 10) + 1} years.`,
        email: `user${id}@clientshadow.dev`,
        location: `City ${Math.floor(Math.random() * 50) + 1}`,
        joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
        skills: skills,
        posts: [
          `Introduction post by User ${id}`,
          `${profileType} insights from User ${id}`,
          `Latest project updates from User ${id}`,
          `Professional tips by User ${id}`
        ].slice(0, Math.floor(Math.random() * 4) + 2),
        stats: {
          posts: Math.floor(Math.random() * 50) + 10,
          followers: Math.floor(Math.random() * 1000) + 50,
          following: Math.floor(Math.random() * 200) + 20
        },
        lastActive: Math.floor(Math.random() * 7) + 1,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${id}`,
        preferences: {
          theme: profileId % 3 === 0 ? 'dark' : profileId % 3 === 1 ? 'light' : 'auto',
          notifications: Math.random() > 0.5,
          publicProfile: Math.random() > 0.3
        }
      })
      
      // Generate related profiles (JavaScript-only discovery)
      const related = []
      for (let i = 0; i < 4; i++) {
        let relatedId = profileId + i - 1
        if (relatedId <= 0) relatedId = profileId + i + 1
        if (relatedId > 25) relatedId = profileId - i - 1
        if (relatedId !== profileId && relatedId >= 1 && relatedId <= 25) {
          related.push({
            id: relatedId,
            name: `User ${relatedId}`,
            title: profileTypes[relatedId % 5],
            url: `/client-only/profile/${relatedId}`
          })
        }
      }
      setRelatedProfiles(related.slice(0, 3))
      
      setLoading(false)
    }, 150) // API取得をシミュレート
    
    return () => clearTimeout(timer)
  }, [id])
  
  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center p-8">
            <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white/60 text-lg">Loading profile...</p>
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-500/30 rounded-full flex items-center justify-center backdrop-blur-md">
                  <span className="text-white font-bold">{profile.id}</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white drop-shadow-lg">{profile.name}</h1>
                  <div className="flex items-center space-x-2 text-white/80 text-sm">
                    <a href="/client-only" className="hover:text-white transition-colors">ClientShadow</a>
                    <span>→</span>
                    <span>Profile {profile.id}</span>
                  </div>
                </div>
              </div>
              <nav className="flex space-x-4">
                <a href="/client-only" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                  Home
                </a>
                <a href="/client-only/dashboard" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                  Dashboard
                </a>
              </nav>
            </div>
          </div>
        </header>
        
        <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Header */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {profile.id}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2">{profile.name}</h2>
                    <p className="text-xl text-purple-300 mb-2">{profile.title}</p>
                    <div className="flex items-center space-x-4 text-white/60 text-sm">
                      <span>📍 {profile.location}</span>
                      <span>📅 Joined {profile.joinDate}</span>
                      <span>🕐 Active {profile.lastActive} days ago</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-green-400 text-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>JS Generated</span>
                  </div>
                </div>
                
                <p className="text-white/80 text-lg leading-relaxed mb-6">{profile.bio}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <div className="text-2xl font-bold text-purple-300">{profile.stats.posts}</div>
                    <div className="text-white/60 text-sm">Posts</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <div className="text-2xl font-bold text-purple-300">{profile.stats.followers}</div>
                    <div className="text-white/60 text-sm">Followers</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                    <div className="text-2xl font-bold text-purple-300">{profile.stats.following}</div>
                    <div className="text-white/60 text-sm">Following</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-white/80 font-medium">Contact:</span>
                  <a href={`mailto:${profile.email}`} className="text-purple-300 hover:text-purple-200 transition-colors">
                    {profile.email}
                  </a>
                </div>
              </div>
              
              {/* Skills */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                  <span>🛠️</span>
                  <span>Skills & Expertise</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill: string, index: number) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-purple-500/20 text-purple-200 rounded-full text-sm font-medium border border-purple-400/30 hover:bg-purple-500/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Posts */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <span>📝</span>
                  <span>Recent Posts</span>
                  <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">Dynamic Content</span>
                </h3>
                <div className="space-y-4">
                  {profile.posts.map((post: string, index: number) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-white/90 font-medium">{post}</p>
                          <p className="text-white/50 text-xs mt-1">
                            {Math.floor(Math.random() * 30) + 1} days ago • {Math.floor(Math.random() * 50) + 5} likes
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Preferences */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <span>⚙️</span>
                  <span>Preferences</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Theme</span>
                    <span className="text-purple-300 capitalize">{profile.preferences.theme}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Notifications</span>
                    <span className={`${profile.preferences.notifications ? 'text-green-400' : 'text-red-400'}`}>
                      {profile.preferences.notifications ? 'On' : 'Off'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Public Profile</span>
                    <span className={`${profile.preferences.publicProfile ? 'text-green-400' : 'text-red-400'}`}>
                      {profile.preferences.publicProfile ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Related Profiles */}
              {relatedProfiles.length > 0 && (
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <span>🔗</span>
                    <span>Related Profiles</span>
                  </h4>
                  <div className="space-y-3">
                    {relatedProfiles.map((relatedProfile: any) => (
                      <a 
                        key={relatedProfile.id}
                        href={relatedProfile.url}
                        className="group block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center group-hover:bg-purple-500/50 transition-colors">
                            <span className="text-white font-bold text-sm">{relatedProfile.id}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium group-hover:text-white/90">{relatedProfile.name}</p>
                            <p className="text-white/60 text-xs">{relatedProfile.title}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Navigation Helper */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <span>🧭</span>
                  <span>Quick Navigation</span>
                </h4>
                <div className="space-y-3">
                  {parseInt(profile.id) > 1 && (
                    <a 
                      href={`/client-only/profile/${parseInt(profile.id) - 1}`} 
                      className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-white font-medium transition-all duration-300 hover:shadow-lg hover:-translate-x-1"
                    >
                      ← Previous Profile
                    </a>
                  )}
                  {parseInt(profile.id) < 25 && (
                    <a 
                      href={`/client-only/profile/${parseInt(profile.id) + 1}`} 
                      className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-white font-medium transition-all duration-300 hover:shadow-lg hover:translate-x-1"
                    >
                      Next Profile →
                    </a>
                  )}
                  <a 
                    href="/client-only" 
                    className="block bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-sm rounded-lg p-3 border border-purple-400/30 text-white font-medium transition-all duration-300 hover:scale-105"
                  >
                    🏠 Back to Home
                  </a>
                  <a 
                    href="/client-only/dashboard" 
                    className="block bg-pink-500/20 hover:bg-pink-500/30 backdrop-blur-sm rounded-lg p-3 border border-pink-400/30 text-white font-medium transition-all duration-300 hover:scale-105"
                  >
                    📊 Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
        
        <footer className="bg-black/30 backdrop-blur-md border-t border-white/20 mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h5 className="text-white font-semibold mb-3">Profile Info</h5>
                <div className="space-y-2 text-white/70 text-sm">
                  <p>👤 User {profile.id}</p>
                  <p>💼 {profile.title}</p>
                  <p>🎨 Theme: {profile.preferences.theme}</p>
                  <p>⚡ JS Generated Content</p>
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-3">Navigation</h5>
                <div className="space-y-2">
                  <a href="/client-only" className="block text-white/70 hover:text-white transition-colors text-sm">
                    🏠 ClientShadow Home
                  </a>
                  <a href="/client-only/dashboard" className="block text-white/70 hover:text-white transition-colors text-sm">
                    📊 Dashboard
                  </a>
                  {parseInt(profile.id) > 1 && (
                    <a href={`/client-only/profile/${parseInt(profile.id) - 1}`} className="block text-white/70 hover:text-white transition-colors text-sm">
                      ← Previous Profile
                    </a>
                  )}
                  {parseInt(profile.id) < 25 && (
                    <a href={`/client-only/profile/${parseInt(profile.id) + 1}`} className="block text-white/70 hover:text-white transition-colors text-sm">
                      Next Profile →
                    </a>
                  )}
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-3">Features</h5>
                <div className="space-y-2 text-white/70 text-sm">
                  <p>⚡ useEffect data</p>
                  <p>🔄 Dynamic stats</p>
                  <p>📱 Responsive</p>
                  <p>🎨 Gradient themes</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-6 pt-6 text-center">
              <p className="text-white/60 text-sm">
                Profile {profile.id} - Generated via useEffect at {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}