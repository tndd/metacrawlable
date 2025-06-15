import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'StaticLand - Static HTML Testing Environment',
  description: 'A comprehensive static HTML website for testing web crawler capabilities including link traversal, metadata extraction, and sitemap utilization.',
  keywords: 'web crawling, static HTML, SEO testing, link traversal, metadata',
  robots: 'index, follow',
  openGraph: {
    title: 'StaticLand - Static HTML Testing Environment',
    description: 'Test your web crawler with our comprehensive static HTML website',
    type: 'website',
  }
}

export default function StaticLandHome() {
  const categories = [
    'technology',
    'science', 
    'business',
    'sports',
    'entertainment'
  ]

  const featuredArticles = [
    { id: 1, title: 'Introduction to Web Crawling', category: 'technology' },
    { id: 5, title: 'Advanced HTML Parsing Techniques', category: 'technology' },
    { id: 12, title: 'Machine Learning in Data Science', category: 'science' },
    { id: 18, title: 'Business Intelligence Trends', category: 'business' },
    { id: 25, title: 'Sports Analytics Revolution', category: 'sports' },
    { id: 30, title: 'Entertainment Industry Digital Transformation', category: 'entertainment' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">StaticLand</h1>
              <p className="text-gray-600 mt-1">Static HTML Testing Environment</p>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/static" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/static/articles/1" className="text-gray-700 hover:text-blue-600">Articles</Link>
              <Link href="/static/categories/technology" className="text-gray-700 hover:text-blue-600">Categories</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome to StaticLand</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 mb-4">
              StaticLand is a comprehensive static HTML website designed for testing web crawler capabilities. 
              It features semantic HTML structure, proper metadata, and organized content distribution across 
              articles and categories.
            </p>
            <p className="text-gray-700">
              This site contains {featuredArticles.length * 5} articles across {categories.length} categories, 
              providing a robust testing environment for link traversal, content extraction, and sitemap utilization.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                    {category}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Explore articles in the {category} category
                  </p>
                  <Link 
                    href={`/static/categories/${category}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Articles →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded capitalize">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    <Link 
                      href={`/static/articles/${article.id}`}
                      className="hover:text-blue-600"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Read more about {article.title.toLowerCase()} and discover insights in the {article.category} field.
                  </p>
                  <Link 
                    href={`/static/articles/${article.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
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
              <Link href="/static/categories/technology" className="hover:text-blue-600">Categories</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}