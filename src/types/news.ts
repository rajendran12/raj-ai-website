export interface NewsArticle {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source_name: string;
  image_url?: string;
}

export interface NewsCache {
  articles: NewsArticle[];
  fetchedAt: string;
  lastFetchDate: string; // YYYY-MM-DD format
}
