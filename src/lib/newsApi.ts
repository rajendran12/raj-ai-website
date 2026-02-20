import fs from 'fs';
import path from 'path';
import { NewsArticle, NewsCache } from '@/types/news';

const CACHE_FILE_PATH = path.join(process.cwd(), 'data', 'news-cache.json');
const FETCH_HOUR_IST = 10; // 10 AM IST

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Get current date in IST
function getISTDate(): { date: string; hour: number } {
  const now = new Date();
  // Convert to IST (UTC+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);

  const year = istTime.getUTCFullYear();
  const month = String(istTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(istTime.getUTCDate()).padStart(2, '0');
  const hour = istTime.getUTCHours();

  return {
    date: `${year}-${month}-${day}`,
    hour
  };
}

// Check if we should fetch new news
function shouldFetchNews(cache: NewsCache | null): boolean {
  if (!cache) return true;

  const { date: currentDate, hour: currentHour } = getISTDate();

  // If we haven't fetched today and it's past 10 AM IST
  if (cache.lastFetchDate !== currentDate && currentHour >= FETCH_HOUR_IST) {
    return true;
  }

  return false;
}

// Read cache from file
function readCache(): NewsCache | null {
  try {
    ensureDataDir();
    if (fs.existsSync(CACHE_FILE_PATH)) {
      const data = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  return null;
}

// Write cache to file
function writeCache(cache: NewsCache) {
  try {
    ensureDataDir();
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.error('Error writing cache:', error);
  }
}

// Fetch news from NewsData.io API
async function fetchNewsFromAPI(): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWSDATA_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here') {
    console.warn('NewsData.io API key not configured. Using mock data.');
    return getMockNews();
  }

  try {
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=artificial%20intelligence%20OR%20AI%20OR%20machine%20learning&language=en&category=technology`;

    const response = await fetch(url, {
      next: { revalidate: 86400 } // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.results && Array.isArray(data.results)) {
      return data.results.slice(0, 3).map((article: any) => ({
        title: article.title,
        description: article.description || article.content || 'No description available',
        link: article.link,
        pubDate: article.pubDate,
        source_name: article.source_name || article.source_id,
        image_url: article.image_url
      }));
    }

    return getMockNews();
  } catch (error) {
    console.error('Error fetching news from API:', error);
    return getMockNews();
  }
}

// Mock news data for development/fallback
function getMockNews(): NewsArticle[] {
  return [
    {
      title: 'Breakthrough in Large Language Models',
      description: 'Researchers announce significant improvements in AI model efficiency and capability.',
      link: '#',
      pubDate: new Date().toISOString(),
      source_name: 'AI Research Journal'
    },
    {
      title: 'New AI Framework Revolutionizes Development',
      description: 'Latest framework promises to make AI development more accessible to developers worldwide.',
      link: '#',
      pubDate: new Date().toISOString(),
      source_name: 'Tech News Daily'
    },
    {
      title: 'AI in Healthcare: Major Milestone Achieved',
      description: 'Artificial intelligence systems now assisting doctors in diagnosing complex conditions.',
      link: '#',
      pubDate: new Date().toISOString(),
      source_name: 'Medical Tech Today'
    }
  ];
}

// Main function to get news (with caching logic)
export async function getAINews(): Promise<NewsArticle[]> {
  const cache = readCache();

  // Check if we should fetch new news
  if (shouldFetchNews(cache)) {
    console.log('Fetching fresh news from API...');
    const articles = await fetchNewsFromAPI();

    const { date: currentDate } = getISTDate();
    const newCache: NewsCache = {
      articles,
      fetchedAt: new Date().toISOString(),
      lastFetchDate: currentDate
    };

    writeCache(newCache);
    return articles;
  }

  // Return cached news
  console.log('Using cached news');
  return cache?.articles || getMockNews();
}
