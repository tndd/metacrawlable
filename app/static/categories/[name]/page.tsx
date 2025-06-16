import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

const categories = {
  technology: {
    name: 'Technology',
    description: 'Explore the latest in technology, web development, and digital innovation.',
    articles: [
      { id: 1, title: 'Introduction to Web Crawling' },
      { id: 2, title: 'Understanding HTML Structure' },
      { id: 3, title: 'CSS Selectors for Data Extraction' },
      { id: 4, title: 'JavaScript and Dynamic Content' },
      { id: 5, title: 'Advanced HTML Parsing Techniques' },
      { id: 6, title: 'Web Scraping Ethics and Legal Considerations' }
    ]
  },
  science: {
    name: 'Science',
    description: 'Discover scientific research, data analysis methods, and computational approaches.',
    articles: [
      { id: 7, title: 'Data Science Fundamentals' },
      { id: 8, title: 'Statistical Analysis Methods' },
      { id: 9, title: 'Research Methodology in Digital Age' },
      { id: 10, title: 'Experimental Design Principles' },
      { id: 11, title: 'Bioinformatics and Computational Biology' },
      { id: 12, title: 'Machine Learning in Data Science' }
    ]
  },
  business: {
    name: 'Business',
    description: 'Learn about digital transformation, e-commerce, and modern business strategies.',
    articles: [
      { id: 13, title: 'Digital Transformation Strategies' },
      { id: 14, title: 'E-commerce Platform Optimization' },
      { id: 15, title: 'Data-Driven Decision Making' },
      { id: 16, title: 'Supply Chain Management' },
      { id: 17, title: 'Customer Relationship Management' },
      { id: 18, title: 'Business Intelligence Trends' }
    ]
  },
  sports: {
    name: 'Sports',
    description: 'Explore sports analytics, performance optimization, and athletic technologies.',
    articles: [
      { id: 19, title: 'Performance Analytics in Sports' },
      { id: 20, title: 'Training Optimization Techniques' },
      { id: 21, title: 'Injury Prevention and Recovery' },
      { id: 22, title: 'Team Strategy and Game Theory' },
      { id: 23, title: 'Sports Psychology and Mental Performance' },
      { id: 24, title: 'Technology in Sports Broadcasting' },
      { id: 25, title: 'Sports Analytics Revolution' }
    ]
  },
  entertainment: {
    name: 'Entertainment',
    description: 'Discover trends in digital media, gaming, and entertainment technology.',
    articles: [
      { id: 26, title: 'Digital Media and Content Creation' },
      { id: 27, title: 'Streaming Services and Consumer Behavior' },
      { id: 28, title: 'Gaming Industry Trends' },
      { id: 29, title: 'Social Media and Influencer Marketing' },
      { id: 30, title: 'Entertainment Industry Digital Transformation' }
    ]
  }
}

interface PageProps {
  params: Promise<{ name: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params
  const category = categories[name as keyof typeof categories]
  
  if (!category) {
    return {
      title: 'Category Not Found - StaticLand'
    }
  }

  return {
    title: `${category.name} Articles - StaticLand`,
    description: `${category.description} Browse ${category.articles.length} articles in the ${category.name.toLowerCase()} category.`,
    keywords: `${category.name.toLowerCase()}, articles, web crawling, static content, ${name}`,
    robots: 'index, follow',
    openGraph: {
      title: `${category.name} Articles - StaticLand`,
      description: category.description,
      type: 'website',
    }
  }
}

export async function generateStaticParams() {
  return Object.keys(categories).map((name) => ({
    name,
  }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { name } = await params
  const category = categories[name as keyof typeof categories]
  
  if (!category) {
    notFound()
  }

  const allCategories = Object.entries(categories).filter(([key, _]) => key !== name)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link href="/static" className="text-blue-600 hover:text-blue-800 font-medium mb-2 block">
                ← Back to StaticLand
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-gray-600 mt-1">{category.description}</p>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/static" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/static/articles/1" className="text-gray-700 hover:text-blue-600">Articles</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About {category.name}</h2>
            <p className="text-gray-700 mb-4">
              {category.description}
            </p>
            <p className="text-gray-600">
              This category contains {category.articles.length} comprehensive articles covering 
              various aspects of {category.name.toLowerCase()}. Each article provides in-depth 
              analysis and practical insights.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {category.name} Articles ({category.articles.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.articles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      Article #{article.id}
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    <Link 
                      href={`/static/articles/${article.id}`}
                      className="hover:text-blue-600"
                    >
                      {article.title}
                    </Link>
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Explore {article.title.toLowerCase()} with comprehensive coverage 
                    of key concepts and practical applications in {category.name.toLowerCase()}.
                  </p>
                  <Link 
                    href={`/static/articles/${article.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Other Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allCategories.map(([key, cat]) => (
              <div key={key} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link 
                      href={`/static/categories/${key}`}
                      className="hover:text-blue-600"
                    >
                      {cat.name}
                    </Link>
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {cat.articles.length} articles
                  </p>
                  <Link 
                    href={`/static/categories/${key}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Browse {cat.name} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 StaticLand. A static HTML testing environment for web crawlers.</p>
            <div className="mt-4 space-x-4">
              <Link href="/static" className="hover:text-blue-600">Home</Link>
              <Link href="/static/articles/1" className="hover:text-blue-600">Articles</Link>
              {Object.keys(categories).map((catName) => (
                <Link 
                  key={catName}
                  href={`/static/categories/${catName}`} 
                  className="hover:text-blue-600 capitalize"
                >
                  {catName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}