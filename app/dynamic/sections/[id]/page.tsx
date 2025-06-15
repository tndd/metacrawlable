export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString()
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return {
    title: `Section ${id} - DynamicMaze`,
    description: `Dynamic content for section ${id}`,
  }
}

export default async function SectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramId } = await params
  const id = parseInt(paramId)
  const contentVariations = ['long', 'short', 'medium']
  const selectedVariation = contentVariations[id % 3]
  const layoutType = Math.floor(Math.random() * 4) + 1
  const showRelated = Math.random() > 0.4
  const gradientVariant = Math.floor(Math.random() * 4) + 1
  
  const gradients = [
    'from-blue-600 via-purple-600 to-pink-600',
    'from-emerald-500 via-teal-600 to-cyan-600', 
    'from-orange-500 via-red-500 to-pink-500',
    'from-indigo-500 via-purple-500 to-pink-500'
  ]
  
  const relatedSections = [
    Math.max(1, id - 2),
    Math.max(1, id - 1),
    Math.min(20, id + 1),
    Math.min(20, id + 2),
    Math.floor(Math.random() * 20) + 1
  ].filter((sectionId, index, arr) => 
    sectionId !== id && arr.indexOf(sectionId) === index
  ).slice(0, 3)

  const renderContent = () => {
    switch (selectedVariation) {
      case 'long':
        return (
          <>
            <p>This is a comprehensive section with detailed information about topic {id}.</p>
            <p>The content structure varies based on the section ID to test crawler adaptability.</p>
            <div className="subsection">
              <h3>Detailed Analysis</h3>
              <p>Here we dive deeper into the specifics of section {id}.</p>
              <ul>
                <li>Key point 1 for section {id}</li>
                <li>Key point 2 for section {id}</li>
                <li>Key point 3 for section {id}</li>
              </ul>
            </div>
            <div className="conclusion">
              <h3>Summary</h3>
              <p>In conclusion, section {id} demonstrates important concepts in dynamic content generation.</p>
            </div>
          </>
        )
      case 'short':
        return (
          <>
            <p>Brief content for section {id}.</p>
            <p>Concise information testing minimal content parsing.</p>
          </>
        )
      default: // medium
        return (
          <>
            <p>Medium-length content for section {id}.</p>
            <p>This section provides moderate detail for testing purposes.</p>
            <div className="highlights">
              <h3>Key Highlights</h3>
              <p>Important information about section {id} topic.</p>
            </div>
          </>
        )
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradients[gradientVariant - 1]} section-layout-${layoutType}`}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <header className={`backdrop-blur-md bg-white/20 border-b border-white/30 sticky top-0 z-50 header-style-${Math.floor(Math.random() * 3) + 1}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md">
                  <span className="text-white font-bold text-lg">{id}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg">Section {id}</h1>
                  <div className="flex items-center space-x-2 text-white/80 text-sm mt-1">
                    <a href="/dynamic" className="hover:text-white transition-colors">DynamicMaze</a>
                    <span>→</span>
                    <span>Section {id}</span>
                  </div>
                </div>
              </div>
              <nav className="flex space-x-4">
                <a href="/dynamic" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                  Home
                </a>
                <a href="/dynamic/random" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                  Random
                </a>
              </nav>
            </div>
          </div>
        </header>
        
        <article className={`content-${selectedVariation}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
            <main className={`main-${selectedVariation}-${layoutType}`}>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/30 shadow-2xl mb-12">
                <div className="prose prose-lg prose-invert max-w-none">
                  {renderContent()}
                </div>
                
                {id % 4 === 0 && (
                  <div className={`mt-8 p-6 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-2xl border border-yellow-300/30 special-content-${Math.floor(Math.random() * 2) + 1}`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">⭐</span>
                      <h3 className="text-2xl font-bold text-white">Special Content</h3>
                    </div>
                    <p className="text-white/80 text-lg">
                      This special section appears every 4th page (sections 4, 8, 12, 16, 20). 
                      It demonstrates conditional content rendering based on section numbers.
                    </p>
                  </div>
                )}
              </div>
            </main>
        
            {showRelated && (
              <aside className={`related-${Math.floor(Math.random() * 3) + 1} mb-12`}>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-2xl">🔗</span>
                    <h3 className="text-2xl font-bold text-white">Related Sections</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedSections.map(sectionId => (
                      <a 
                        key={sectionId}
                        href={`/dynamic/sections/${sectionId}`}
                        className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <span className="text-white font-bold">{sectionId}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium group-hover:text-white/90">Section {sectionId}</p>
                            <p className="text-white/60 text-xs">Related content</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </aside>
            )}
        
            <nav className={`navigation-${Math.floor(Math.random() * 2) + 1} mb-12`}>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                  <div className="flex space-x-4">
                    {id > 1 && (
                      <a 
                        href={`/dynamic/sections/${id - 1}`} 
                        className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 text-white font-medium transition-all duration-300 hover:shadow-lg hover:-translate-x-1 prev-btn"
                      >
                        <span>←</span>
                        <span>Section {id - 1}</span>
                      </a>
                    )}
                    {id < 20 && (
                      <a 
                        href={`/dynamic/sections/${id + 1}`} 
                        className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 text-white font-medium transition-all duration-300 hover:shadow-lg hover:translate-x-1 next-btn"
                      >
                        <span>Section {id + 1}</span>
                        <span>→</span>
                      </a>
                    )}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a 
                      href="/dynamic" 
                      className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                    >
                      🏠 DynamicMaze
                    </a>
                    <a 
                      href="/dynamic/random" 
                      className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                    >
                      🎲 Random
                    </a>
                  </div>
                </div>
              </div>
            </nav>
        
            <footer className={`bg-black/20 backdrop-blur-md border-t border-white/30 section-footer-${(id % 2) + 1}`}>
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-3">Section Info</h5>
                    <div className="space-y-2 text-white/70 text-sm">
                      <p>📄 Section {id}</p>
                      <p>📝 Content: {selectedVariation}</p>
                      <p>🎨 Layout: Type {layoutType}</p>
                      <p>🔗 Related: {showRelated ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-3">Navigation</h5>
                    <div className="space-y-2">
                      <a href="/dynamic" className="block text-white/70 hover:text-white transition-colors text-sm">
                        🏠 DynamicMaze Home
                      </a>
                      <a href="/dynamic/random" className="block text-white/70 hover:text-white transition-colors text-sm">
                        🎲 Random Structure
                      </a>
                      {id > 1 && (
                        <a href={`/dynamic/sections/${id - 1}`} className="block text-white/70 hover:text-white transition-colors text-sm">
                          ← Previous Section
                        </a>
                      )}
                      {id < 20 && (
                        <a href={`/dynamic/sections/${id + 1}`} className="block text-white/70 hover:text-white transition-colors text-sm">
                          Next Section →
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-3">Features</h5>
                    <div className="space-y-2 text-white/70 text-sm">
                      <p>✨ Dynamic content</p>
                      <p>🔄 Random layouts</p>
                      <p>📱 Responsive design</p>
                      <p>🎨 Gradient themes</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/20 mt-6 pt-6 text-center">
                  <p className="text-white/60 text-sm">
                    Dynamic Section {id} - Generated with variant {gradientVariant}
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </div>
  )
}