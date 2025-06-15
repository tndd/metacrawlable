import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

const articles = [
  { id: 1, title: 'Introduction to Web Crawling', category: 'technology', content: 'Web crawling is the process of systematically browsing and downloading web pages...' },
  { id: 2, title: 'Understanding HTML Structure', category: 'technology', content: 'HTML provides the semantic structure that web crawlers rely on...' },
  { id: 3, title: 'CSS Selectors for Data Extraction', category: 'technology', content: 'CSS selectors are powerful tools for targeting specific elements...' },
  { id: 4, title: 'JavaScript and Dynamic Content', category: 'technology', content: 'Modern websites increasingly rely on JavaScript for content rendering...' },
  { id: 5, title: 'Advanced HTML Parsing Techniques', category: 'technology', content: 'Effective HTML parsing requires understanding of DOM manipulation...' },
  { id: 6, title: 'Web Scraping Ethics and Legal Considerations', category: 'technology', content: 'Web scraping operates in a complex legal and ethical landscape...' },
  { id: 7, title: 'Data Science Fundamentals', category: 'science', content: 'Data science combines statistics, programming, and domain expertise...' },
  { id: 8, title: 'Statistical Analysis Methods', category: 'science', content: 'Statistical analysis provides the foundation for data-driven insights...' },
  { id: 9, title: 'Research Methodology in Digital Age', category: 'science', content: 'Digital research methods have transformed how we collect and analyze data...' },
  { id: 10, title: 'Experimental Design Principles', category: 'science', content: 'Proper experimental design is crucial for valid scientific conclusions...' },
  { id: 11, title: 'Bioinformatics and Computational Biology', category: 'science', content: 'Computational approaches are revolutionizing biological research...' },
  { id: 12, title: 'Machine Learning in Data Science', category: 'science', content: 'Machine learning algorithms enable computers to learn from data...' },
  { id: 13, title: 'Digital Transformation Strategies', category: 'business', content: 'Digital transformation is reshaping how businesses operate...' },
  { id: 14, title: 'E-commerce Platform Optimization', category: 'business', content: 'E-commerce platforms require careful optimization for success...' },
  { id: 15, title: 'Data-Driven Decision Making', category: 'business', content: 'Data analytics enables more informed business decisions...' },
  { id: 16, title: 'Supply Chain Management', category: 'business', content: 'Modern supply chains require sophisticated management systems...' },
  { id: 17, title: 'Customer Relationship Management', category: 'business', content: 'CRM systems help businesses maintain customer relationships...' },
  { id: 18, title: 'Business Intelligence Trends', category: 'business', content: 'Business intelligence tools are evolving rapidly...' },
  { id: 19, title: 'Performance Analytics in Sports', category: 'sports', content: 'Sports analytics has revolutionized performance measurement...' },
  { id: 20, title: 'Training Optimization Techniques', category: 'sports', content: 'Scientific approaches to training are improving athletic performance...' },
  { id: 21, title: 'Injury Prevention and Recovery', category: 'sports', content: 'Sports medicine focuses on preventing and treating athletic injuries...' },
  { id: 22, title: 'Team Strategy and Game Theory', category: 'sports', content: 'Game theory provides insights into optimal team strategies...' },
  { id: 23, title: 'Sports Psychology and Mental Performance', category: 'sports', content: 'Mental aspects of athletic performance are increasingly recognized...' },
  { id: 24, title: 'Technology in Sports Broadcasting', category: 'sports', content: 'Broadcasting technology enhances the sports viewing experience...' },
  { id: 25, title: 'Sports Analytics Revolution', category: 'sports', content: 'Data analytics is transforming how sports are played and understood...' },
  { id: 26, title: 'Digital Media and Content Creation', category: 'entertainment', content: 'Digital platforms have democratized content creation...' },
  { id: 27, title: 'Streaming Services and Consumer Behavior', category: 'entertainment', content: 'Streaming has fundamentally changed entertainment consumption...' },
  { id: 28, title: 'Gaming Industry Trends', category: 'entertainment', content: 'The gaming industry continues to evolve with new technologies...' },
  { id: 29, title: 'Social Media and Influencer Marketing', category: 'entertainment', content: 'Social media has created new forms of entertainment and marketing...' },
  { id: 30, title: 'Entertainment Industry Digital Transformation', category: 'entertainment', content: 'Digital transformation is reshaping the entertainment landscape...' }
]

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const article = articles.find(a => a.id === parseInt(id))
  
  if (!article) {
    return {
      title: 'Article Not Found - StaticLand'
    }
  }

  return {
    title: `${article.title} - StaticLand`,
    description: `${article.content.substring(0, 160)}...`,
    keywords: `${article.category}, ${article.title.toLowerCase()}, web crawling, static content`,
    robots: 'index, follow',
    openGraph: {
      title: article.title,
      description: `${article.content.substring(0, 160)}...`,
      type: 'article',
    }
  }
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id.toString(),
  }))
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params
  const article = articles.find(a => a.id === parseInt(id))
  
  if (!article) {
    notFound()
  }

  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3)

  const nextArticle = articles.find(a => a.id === article.id + 1)
  const prevArticle = articles.find(a => a.id === article.id - 1)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/static" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to StaticLand
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/static" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link href={`/static/categories/${article.category}`} className="text-gray-700 hover:text-blue-600 capitalize">
                {article.category}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-sm">
          <div className="px-8 py-8">
            <div className="mb-6">
              <Link 
                href={`/static/categories/${article.category}`}
                className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded capitalize hover:bg-blue-200"
              >
                {article.category}
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="lead text-xl text-gray-600 mb-6">
                {article.content}
              </p>
              
              <p className="mb-4">
                This comprehensive article explores the key concepts and practical applications 
                related to {article.title.toLowerCase()}. The content is designed to provide 
                valuable insights for both beginners and advanced practitioners in the field 
                of {article.category}.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Concepts</h2>
              <p className="mb-4">
                Understanding the fundamental principles is essential for mastering 
                {article.title.toLowerCase()}. This section covers the core concepts that 
                form the foundation of effective implementation.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Practical Applications</h2>
              <p className="mb-4">
                Real-world applications demonstrate the value and versatility of these concepts. 
                From basic implementations to advanced techniques, this knowledge can be applied 
                across various scenarios in the {article.category} domain.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Best Practices</h2>
              <p className="mb-4">
                Following established best practices ensures optimal results and maintainable 
                solutions. These guidelines have been developed through extensive research and 
                practical experience in the field.
              </p>
            </div>
          </div>
        </article>

        <div className="flex justify-between items-center mt-8 mb-8">
          <div>
            {prevArticle && (
              <Link 
                href={`/static/articles/${prevArticle.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← {prevArticle.title}
              </Link>
            )}
          </div>
          <div>
            {nextArticle && (
              <Link 
                href={`/static/articles/${nextArticle.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {nextArticle.title} →
              </Link>
            )}
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <div key={related.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <Link 
                        href={`/static/articles/${related.id}`}
                        className="hover:text-blue-600"
                      >
                        {related.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {related.content.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}