import { getAINews } from '@/lib/newsApi';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const newsArticles = await getAINews();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Rajendran's Profile
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My Accomplishments
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
            As an SDET Manager / Architect at Degreed, I contribute to the development and implementation of AI-driven test automation strategies, with a focus on embedding quality throughout the software delivery lifecycle. Leveraging my expertise in artificial intelligence, agent-based automation, and quality assurance, I have built scalable automation frameworks and tools that align with enterprise standards.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Latest AI News <span className="text-lg font-normal text-gray-500 dark:text-gray-400">(News update at 10am IST everyday)</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {newsArticles.map((article, index) => (
              <a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {new Date(article.pubDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-xs mb-4">
                  {article.source_name}
                </p>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                  {article.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center py-8 text-gray-600 dark:text-gray-400">
        <p>&copy; 2026 Raj. All rights reserved.</p>
      </footer>
    </div>
  );
}
