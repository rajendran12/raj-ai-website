import { getAINews } from '@/lib/newsApi';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const newsArticles = await getAINews();
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-60"
          style={{ backgroundImage: 'url(/ai-background.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/70 to-gray-100/70 dark:from-gray-900/70 dark:to-gray-800/70" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Rajendran's Profile
          </h1>
          <div className="flex flex-col items-center gap-3 mt-6">
            {/* Email */}
            <a
              href="mailto:rajendran.12@gmail.com"
              className="flex items-center gap-2 text-lg text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>rajendran.12@gmail.com</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919945395190"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>+91 9945395190</span>
            </a>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">My Accomplishments</h2>
          <div className="max-w-3xl mx-auto bg-cyan-50/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-lg p-8">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
            As an SDET Manager / Architect at Degreed, I contribute to the development and implementation of AI-driven test automation strategies, with a focus on embedding quality throughout the software delivery lifecycle. Leveraging my expertise in artificial intelligence, agent-based automation, and quality assurance, I have built scalable automation frameworks and tools that align with enterprise standards.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Latest AI News <span className="text-lg font-normal text-gray-500 dark:text-gray-400">(Daily refresh at 10am IST)</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {newsArticles.map((article, index) => (
              <a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-50/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
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

      <footer className="relative z-10 text-center py-8 text-gray-600 dark:text-gray-400">
        <p>&copy; 2026 Raj. All rights reserved.</p>
      </footer>
    </div>
  );
}
