export default function RandomPage() {
  const randomElements = Math.floor(Math.random() * 15) + 5
  const layoutComplexity = Math.floor(Math.random() * 5) + 1
  const nestedDepth = Math.floor(Math.random() * 4) + 2
  const elementTypes = ['div', 'section', 'article', 'aside', 'header', 'footer', 'main']
  const classPatterns = ['random', 'dynamic', 'variable', 'changing', 'fluid']
  const gradientVariant = Math.floor(Math.random() * 5) + 1
  
  const gradients = [
    'from-red-500 via-orange-500 to-yellow-500',
    'from-blue-500 via-indigo-500 to-purple-500',
    'from-green-500 via-emerald-500 to-teal-500',
    'from-pink-500 via-rose-500 to-red-500',
    'from-cyan-500 via-blue-500 to-indigo-500'
  ]
  
  const generateRandomContent = (depth: number, maxDepth: number): React.JSX.Element[] => {
    if (depth >= maxDepth) return []
    
    const numElements = Math.floor(Math.random() * 4) + 1
    return Array.from({ length: numElements }, (_, i) => {
      const elementType = elementTypes[Math.floor(Math.random() * elementTypes.length)]
      const classPattern = classPatterns[Math.floor(Math.random() * classPatterns.length)]
      const randomId = Math.floor(Math.random() * 1000)
      const hasChildren = depth < maxDepth - 1 && Math.random() > 0.6
      
      const Element = elementType as keyof React.JSX.IntrinsicElements
      
      return (
        <Element 
          key={`${depth}-${i}-${randomId}`} 
          className={`${classPattern}-${randomId % 10} depth-${depth} type-${elementType}`}
        >
          {depth === 0 && i === 0 && <h1>Completely Random Structure</h1>}
          {depth === 1 && <h2>Random Section {i + 1}</h2>}
          {depth === 2 && <h3>Subsection {randomId % 100}</h3>}
          <p>Content at depth {depth}, element {i + 1} (ID: {randomId})</p>
          
          {Math.random() > 0.7 && (
            <a href={`/dynamic/sections/${(randomId % 20) + 1}`}>
              Link to Section {(randomId % 20) + 1}
            </a>
          )}
          
          {hasChildren && generateRandomContent(depth + 1, maxDepth)}
          
          {Math.random() > 0.8 && (
            <div className={`embedded-${Math.floor(Math.random() * 5)}`}>
              <span>Embedded content {Math.floor(Math.random() * 100)}</span>
            </div>
          )}
        </Element>
      )
    })
  }

  const generateFloatingElements = () => {
    const numFloating = Math.floor(Math.random() * 8) + 2
    return Array.from({ length: numFloating }, (_, i) => (
      <div 
        key={`floating-${i}`} 
        className={`floating-element-${i % 5} position-${Math.floor(Math.random() * 10)}`}
        style={{
          position: 'absolute' as const,
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
          zIndex: Math.floor(Math.random() * 5) + 1
        }}
      >
        Floating {i + 1}
        {Math.random() > 0.6 && (
          <a href={`/dynamic/sections/${Math.floor(Math.random() * 20) + 1}`}>
            Hidden Link
          </a>
        )}
      </div>
    ))
  }

  const generateRandomNavigation = () => {
    const navItems = Math.floor(Math.random() * 10) + 3
    return Array.from({ length: navItems }, (_, i) => {
      const linkType = Math.random()
      let href = ''
      let text = ''
      let icon = ''
      
      if (linkType < 0.4) {
        const sectionNum = Math.floor(Math.random() * 20) + 1
        href = `/dynamic/sections/${sectionNum}`
        text = `Section ${sectionNum}`
        icon = '📄'
      } else if (linkType < 0.7) {
        href = '/dynamic'
        text = 'Home'
        icon = '🏠'
      } else if (linkType < 0.85) {
        href = '/dynamic/random'
        text = 'Refresh'
        icon = '🔄'
      } else {
        const articleNum = Math.floor(Math.random() * 30) + 1
        href = `/static/articles/${articleNum}`
        text = `Article ${articleNum}`
        icon = '📰'
      }
      
      return (
        <a 
          key={i} 
          href={href}
          className={`group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105 nav-item-${i % 3}`}
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg">{icon}</span>
            <span className="text-white font-medium group-hover:text-white/90 text-sm">{text}</span>
          </div>
        </a>
      )
    })
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradients[gradientVariant - 1]} random-layout-complexity-${layoutComplexity}`} style={{ position: 'relative' }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <header className="backdrop-blur-md bg-white/20 border-b border-white/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md animate-spin">
                  <span className="text-white font-bold text-xl">🎲</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg">Random Chaos Structure</h1>
                  <p className="text-white/80 text-sm">Complexity: {layoutComplexity} | Depth: {nestedDepth} | Elements: {randomElements}</p>
                </div>
              </div>
              <nav className="flex space-x-4">
                <a href="/dynamic" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                  Home
                </a>
                <a href="/dynamic/random" className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-medium transition-all duration-300 hover:scale-105">
                  Regenerate
                </a>
              </nav>
            </div>
          </div>
        </header>
        
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 container-${Math.floor(Math.random() * 5)}`}>
          <nav className={`mb-12 random-nav-${Math.floor(Math.random() * 3)}`}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">🧭</span>
                <h2 className="text-2xl font-bold text-white">Random Navigation Matrix</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 random-nav-list">
                {generateRandomNavigation()}
              </div>
            </div>
          </nav>
        
          <div className={`mb-12 content-wrapper-${Math.floor(Math.random() * 4)}`}>
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-3xl animate-bounce">⚡</span>
                <h2 className="text-3xl font-bold text-white">Chaotic Content Generation</h2>
              </div>
              <div className="space-y-6">
                {generateRandomContent(0, nestedDepth)}
              </div>
            </div>
          </div>
          
          <div className={`mb-12 metadata-${Math.floor(Math.random() * 3)}`}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">📊</span>
                <h4 className="text-2xl font-bold text-white">Generation Metadata</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🔢</div>
                    <h5 className="text-white font-bold mb-1">Elements</h5>
                    <p className="text-white/70">{randomElements}</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎛️</div>
                    <h5 className="text-white font-bold mb-1">Complexity</h5>
                    <p className="text-white/70">Level {layoutComplexity}</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📏</div>
                    <h5 className="text-white font-bold mb-1">Depth</h5>
                    <p className="text-white/70">{nestedDepth} levels</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-center">
                    <div className="text-3xl mb-2">⏰</div>
                    <h5 className="text-white font-bold mb-1">Generated</h5>
                    <p className="text-white/70 text-xs">{new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <div className={`mb-12 random-links-${Math.floor(Math.random() * 2)}`}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">🔗</span>
                <h4 className="text-2xl font-bold text-white">Random Cross-references</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: Math.floor(Math.random() * 6) + 2 }, (_, i) => {
                  const sectionNum = Math.floor(Math.random() * 20) + 1
                  return (
                    <a 
                      key={i}
                      href={`/dynamic/sections/${sectionNum}`}
                      className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <span className="text-white font-bold text-sm">{sectionNum}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium group-hover:text-white/90">Random Section {sectionNum}</p>
                          <p className="text-white/60 text-xs">Cross-reference</p>
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
          
          <div className={`mb-12 chaos-section-${Math.floor(Math.random() * 10)}`}>
            <div className="bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-8 border border-orange-300/30 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl animate-pulse">⚠️</span>
                <h4 className="text-2xl font-bold text-white">Extreme Chaos Testing</h4>
              </div>
              <p className="text-white/80 text-lg mb-6">
                This section tests extreme structural chaos for crawler robustness and adaptability.
              </p>
              {Math.random() > 0.5 && (
                <div className="nested-chaos bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="level-1 border-l-4 border-red-400/50 pl-4 mb-4">
                    <h5 className="text-white font-semibold mb-2">Level 1: Outer Chaos</h5>
                    <div className="level-2 border-l-4 border-orange-400/50 pl-4 mb-4">
                      <h6 className="text-white/80 font-medium mb-2">Level 2: Nested Confusion</h6>
                      <div className="level-3 border-l-4 border-yellow-400/50 pl-4">
                        <p className="text-white/70 mb-2">Level 3: Deep Nesting</p>
                        <a 
                          href="/dynamic" 
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                        >
                          <span>🕳️</span>
                          <span>Deep nested link</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      
        {generateFloatingElements()}
        
        <footer className={`bg-black/30 backdrop-blur-md border-t border-white/30 mt-20 random-footer-${Math.floor(Math.random() * 4)}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl animate-spin">🎲</span>
                  <h4 className="text-xl font-bold text-white">Random Chaos</h4>
                </div>
                <p className="text-white/70">Completely unpredictable layout structure for advanced crawler testing.</p>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-4">Quick Actions</h5>
                <div className="space-y-3">
                  <a 
                    href="/dynamic" 
                    className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                  >
                    <span>🏠</span>
                    <span>DynamicMaze Home</span>
                  </a>
                  <a 
                    href="/dynamic/random" 
                    className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                  >
                    <span>🔄</span>
                    <span>Generate New Random</span>
                  </a>
                  <a 
                    href="/dynamic/sections/1" 
                    className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                  >
                    <span>📄</span>
                    <span>Section 1</span>
                  </a>
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-semibold mb-4">Generation Info</h5>
                <div className="space-y-2 text-white/70 text-sm">
                  <p>🎨 Gradient: Variant {gradientVariant}</p>
                  <p>🧩 Complexity: Level {layoutComplexity}</p>
                  <p>📏 Depth: {nestedDepth} levels</p>
                  <p>🔑 Hash: {Math.random().toString(36).substr(2, 9)}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-8 pt-8 text-center">
              <p className="text-white/60 text-sm">
                Random Chaos Structure - Generated at {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}