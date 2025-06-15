export default function RandomPage() {
  const randomElements = Math.floor(Math.random() * 15) + 5
  const layoutComplexity = Math.floor(Math.random() * 5) + 1
  const nestedDepth = Math.floor(Math.random() * 4) + 2
  const elementTypes = ['div', 'section', 'article', 'aside', 'header', 'footer', 'main']
  const classPatterns = ['random', 'dynamic', 'variable', 'changing', 'fluid']
  
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
      
      if (linkType < 0.4) {
        href = `/dynamic/sections/${Math.floor(Math.random() * 20) + 1}`
        text = `Nav Section ${Math.floor(Math.random() * 20) + 1}`
      } else if (linkType < 0.7) {
        href = '/dynamic'
        text = 'Home'
      } else if (linkType < 0.85) {
        href = '/dynamic/random'
        text = 'Refresh Random'
      } else {
        href = `/static/articles/${Math.floor(Math.random() * 30) + 1}`
        text = `Cross-link ${Math.floor(Math.random() * 30) + 1}`
      }
      
      return (
        <li key={i} className={`nav-item-${i % 3}`}>
          <a href={href}>{text}</a>
        </li>
      )
    })
  }

  return (
    <div className={`random-layout-complexity-${layoutComplexity}`} style={{ position: 'relative' }}>
      <div className={`container-${Math.floor(Math.random() * 5)}`}>
        <nav className={`random-nav-${Math.floor(Math.random() * 3)}`}>
          <ul className="random-nav-list">
            {generateRandomNavigation()}
          </ul>
        </nav>
        
        <div className={`content-wrapper-${Math.floor(Math.random() * 4)}`}>
          {generateRandomContent(0, nestedDepth)}
        </div>
        
        <div className={`metadata-${Math.floor(Math.random() * 3)}`}>
          <h4>Page Metadata</h4>
          <ul>
            <li>Elements Generated: {randomElements}</li>
            <li>Layout Complexity: {layoutComplexity}</li>
            <li>Nesting Depth: {nestedDepth}</li>
            <li>Generation Time: {new Date().toISOString()}</li>
          </ul>
        </div>
        
        <div className={`random-links-${Math.floor(Math.random() * 2)}`}>
          <h4>Random Cross-references</h4>
          <ul>
            {Array.from({ length: Math.floor(Math.random() * 6) + 2 }, (_, i) => (
              <li key={i}>
                <a href={`/dynamic/sections/${Math.floor(Math.random() * 20) + 1}`}>
                  Random Section {Math.floor(Math.random() * 20) + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={`chaos-section-${Math.floor(Math.random() * 10)}`}>
          <p>This section tests extreme structural chaos for crawler robustness.</p>
          {Math.random() > 0.5 && (
            <div className="nested-chaos">
              <div className="level-1">
                <div className="level-2">
                  <div className="level-3">
                    <a href="/dynamic">Deep nested link</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {generateFloatingElements()}
      
      <footer className={`random-footer-${Math.floor(Math.random() * 4)}`}>
        <p>Random Structure Page - Completely unpredictable layout</p>
        <nav>
          <a href="/dynamic">DynamicMaze Home</a>
          <a href="/dynamic/random">Generate New Random</a>
        </nav>
        <p>Page Hash: {Math.random().toString(36).substr(2, 9)}</p>
      </footer>
    </div>
  )
}