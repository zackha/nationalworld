import { useState, useCallback } from 'react';
import { fetchNews } from '@/services/apiWp';
import type { NewsDataState, LoadingState } from '@/types';

const useLoadNews = () => {
  const [newsData, setNewsData] = useState<NewsDataState>({});
  const [loading, setLoading] = useState<LoadingState>({});
  const [page, setPage] = useState<{ [key: string]: number }>({});
  const [hasMore, setHasMore] = useState<{ [key: string]: boolean }>({});

  const loadNews = useCallback(
    async (categoryId: number, categoryName: string, pageNumber: number = 1) => {
      if (!loading[categoryName]) {
        console.log(`\x1b[33mFetching...... ${categoryName} (ID: ${categoryId})\x1b[0m`);
        setLoading(prev => ({ ...prev, [categoryName]: true }));
        try {
          const newsItems = await fetchNews(pageNumber, categoryId);
          console.log(`\x1b[32mFetched! ${categoryName}\x1b[0m`);
          setNewsData(prev => ({
            ...prev,
            [categoryName]: pageNumber === 1 ? newsItems : [...(prev[categoryName] || []), ...newsItems],
          }));
          setHasMore(prev => ({ ...prev, [categoryName]: newsItems.length > 0 }));
          setPage(prev => ({ ...prev, [categoryName]: pageNumber }));
        } catch (error) {
          if (error instanceof Error && error.message.includes('rest_post_invalid_page_number')) {
            setHasMore(prev => ({ ...prev, [categoryName]: false }));
          }
          console.error(`Error fetching news for ${categoryName}:`, error);
        } finally {
          setLoading(prev => ({ ...prev, [categoryName]: false }));
        }
      }
    },
    [loading]
  );

  return { newsData, loading, hasMore, loadNews, page };
};

export default useLoadNews;
