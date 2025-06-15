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
    <div className={`section-layout-${layoutType}`}>
      <article className={`content-${selectedVariation}`}>
        <header className={`header-style-${Math.floor(Math.random() * 3) + 1}`}>
          <h1>Section {id}</h1>
          <meta name="description" content={`Dynamic content for section ${id}`} />
          <div className="breadcrumb">
            <a href="/dynamic">DynamicMaze</a> → Section {id}
          </div>
        </header>
        
        <main className={`main-${selectedVariation}-${layoutType}`}>
          {renderContent()}
          
          {id % 4 === 0 && (
            <div className={`special-content-${Math.floor(Math.random() * 2) + 1}`}>
              <h3>Special Content</h3>
              <p>This special section appears every 4th page (sections 4, 8, 12, 16, 20).</p>
            </div>
          )}
        </main>
        
        {showRelated && (
          <aside className={`related-${Math.floor(Math.random() * 3) + 1}`}>
            <h3>Related Sections</h3>
            <ul>
              {relatedSections.map(sectionId => (
                <li key={sectionId}>
                  <a href={`/dynamic/sections/${sectionId}`}>
                    Section {sectionId}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
        
        <nav className={`navigation-${Math.floor(Math.random() * 2) + 1}`}>
          <div className="nav-buttons">
            {id > 1 && (
              <a href={`/dynamic/sections/${id - 1}`} className="prev-btn">
                ← Section {id - 1}
              </a>
            )}
            {id < 20 && (
              <a href={`/dynamic/sections/${id + 1}`} className="next-btn">
                Section {id + 1} →
              </a>
            )}
          </div>
          <div className="nav-links">
            <a href="/dynamic">Back to DynamicMaze</a>
            <a href="/dynamic/random">Random Structure</a>
          </div>
        </nav>
        
        <footer className={`section-footer-${(id % 2) + 1}`}>
          <p>Section {id} - Content Type: {selectedVariation}</p>
          <p>Layout: {layoutType} | Related: {showRelated ? 'Yes' : 'No'}</p>
        </footer>
      </article>
    </div>
  )
}