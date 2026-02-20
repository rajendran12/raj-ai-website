# AI News Auto-Update Setup

This project automatically fetches and displays the top 3 latest AI news articles once daily at 10:00 AM IST.

## How It Works

1. **Time-Based Caching**: News is fetched only once per day at 10:00 AM IST
2. **Smart Caching**: During development and code changes, cached news is used instead of making new API calls
3. **Fallback**: If API fails or key is not configured, mock news data is displayed
4. **ISR (Incremental Static Regeneration)**: Next.js revalidates the page every hour, but actual API calls are controlled by time logic

## Setup Instructions

### 1. Get NewsData.io API Key (Free)

1. Visit [https://newsdata.io/register](https://newsdata.io/register)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier includes 200 API calls per day

### 2. Configure Environment Variables

1. Open `.env.local` file in the project root
2. Replace `your_api_key_here` with your actual API key:

```
NEWSDATA_API_KEY=your_actual_api_key_from_newsdata_io
```

3. Save the file

### 3. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your site with AI news.

## How the Daily Update Works

### Development Mode
- Uses cached news data to avoid unnecessary API calls during code changes
- Only fetches new data if:
  - No cache exists, OR
  - Current time is past 10:00 AM IST AND news hasn't been fetched today

### Production Mode (Recommended Setup)

For production deployment on Vercel or similar platforms:

#### Option A: Automatic (Using ISR)
- Next.js ISR will handle revalidation every hour
- The time-based logic ensures API is only called after 10 AM IST once per day
- No additional configuration needed

#### Option B: Cron Job (More Reliable)
Set up a cron job to trigger revalidation at exactly 10 AM IST:

1. **Vercel Cron** (Recommended for Vercel deployments):
   - Create `vercel.json` in project root:
   ```json
   {
     "crons": [
       {
         "path": "/api/revalidate-news",
         "schedule": "30 4 * * *"
       }
     ]
   }
   ```
   (4:30 AM UTC = 10:00 AM IST)

2. **Create API Route** (`src/app/api/revalidate-news/route.ts`):
   ```typescript
   import { revalidatePath } from 'next/cache';
   import { NextResponse } from 'next/server';

   export async function GET() {
     revalidatePath('/');
     return NextResponse.json({ revalidated: true, time: new Date().toISOString() });
   }
   ```

## File Structure

```
src/
├── lib/
│   └── newsApi.ts          # News fetching logic with time-based caching
├── types/
│   └── news.ts             # TypeScript interfaces
└── app/
    └── page.tsx            # Homepage with news display

data/
└── news-cache.json         # Cached news data (auto-generated, git-ignored)
```

## Troubleshooting

### News Not Updating
1. Check if current time is past 10:00 AM IST
2. Delete `data/news-cache.json` file to force a fresh fetch
3. Check `.env.local` has correct API key
4. Check console logs for any error messages

### API Key Not Working
1. Verify API key in `.env.local`
2. Ensure you haven't exceeded free tier limit (200 calls/day)
3. Check NewsData.io dashboard for account status

### Mock Data Showing
- This happens when:
  - API key is not configured
  - API request fails
  - API rate limit exceeded
- Check console logs for specific error messages

## Cache Management

- Cache file location: `data/news-cache.json`
- Cache structure includes:
  - Articles array (top 3 news items)
  - Fetch timestamp
  - Last fetch date (YYYY-MM-DD)
- To force fresh fetch: delete the cache file

## Cost and Rate Limits

- **NewsData.io Free Tier**: 200 API calls/day
- **Our Usage**: 1 call per day (at 10 AM IST)
- **Annual Usage**: ~365 calls/year
- **Cost**: $0 (well within free tier)

## Alternative APIs

If you prefer a different news API:
- **NewsAPI.org**: 100 requests/day free
- **Google News RSS**: Completely free, no API key needed
- Update `src/lib/newsApi.ts` with your preferred API

## Questions?

Check the main README.md for general project setup and development instructions.
