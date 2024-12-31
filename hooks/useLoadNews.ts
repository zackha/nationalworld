import { useState, useCallback } from 'react';
import { fetchNews } from '@/services/apiWp';
import type { NewsDataState, LoadingState } from '@/types';
import { categoriesData } from '@/services/apiWp';

const useLoadNews = (selectedCategory: string) => {
  const [newsData, setNewsData] = useState<NewsDataState>({});
  const [loading, setLoading] = useState<LoadingState>({});
  const [page, setPage] = useState<{ [key: string]: number }>({});
  const [hasMore, setHasMore] = useState<{ [key: string]: boolean }>({});

  const loadNews = useCallback(
    async (categoryId: number, categoryName: string, pageNumber: number = 1) => {
      if (loading[categoryName] || hasMore[categoryName] === false) return;
      setLoading(prev => ({ ...prev, [categoryName]: true }));
      try {
        const newsItems = await fetchNews(pageNumber, categoryId);
        setNewsData(prev => ({
          ...prev,
          [categoryName]: pageNumber === 1 ? newsItems : [...(prev[categoryName] || []), ...newsItems],
        }));
        setHasMore(prev => ({ ...prev, [categoryName]: newsItems.length === 21 }));
        setPage(prev => ({ ...prev, [categoryName]: pageNumber }));
      } catch (error) {
        if (error instanceof Error && error.message.includes('rest_post_invalid_page_number')) {
          setHasMore(prev => ({ ...prev, [categoryName]: false }));
        }
      } finally {
        setLoading(prev => ({ ...prev, [categoryName]: false }));
      }
    },
    [loading, hasMore]
  );

  const loadMoreNews = useCallback(() => {
    const category = categoriesData.find(c => c.name === selectedCategory);
    if (category && hasMore[selectedCategory] && !loading[selectedCategory]) {
      loadNews(category.id, selectedCategory, (page[selectedCategory] || 1) + 1);
    }
  }, [selectedCategory, hasMore, loading, page, loadNews]);

  return { newsData, loading, hasMore, loadNews, page, loadMoreNews };
};

export default useLoadNews;
