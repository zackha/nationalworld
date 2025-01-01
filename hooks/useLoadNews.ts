import { useState, useCallback } from 'react';
import { fetchAllCategoryNews, fetchNews } from '@/services/apiWp';
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
      console.log(`\x1b[33m[LOADING] Fetching news for ${categoryName} (ID: ${categoryId}, Page: ${pageNumber})...\x1b[0m`);
      setLoading(prev => ({ ...prev, [categoryName]: true }));
      if (categoryName === 'All') {
        const newsItems = await fetchAllCategoryNews();
        setNewsData(prev => ({
          ...prev,
          [categoryName]: pageNumber === 1 ? newsItems : [...(prev[categoryName] || []), ...newsItems],
        }));
        console.log(`All Category News: ${newsItems.length}`);
      }
      try {
        const newsItems = await fetchNews(pageNumber, categoryId);
        console.log(`\x1b[32m[SUCCESS] Fetched ${newsItems.length} items for ${categoryName}\x1b[0m`);
        setNewsData(prev => {
          const updatedNewsData = {
            ...prev,
            [categoryName]: pageNumber === 1 ? newsItems : [...(prev[categoryName] || []), ...newsItems],
          };
          console.log(`\x1b[32m[UPDATED] News data updated for ${categoryName}\x1b[0m`);
          return updatedNewsData;
        });
        setHasMore(prev => {
          const updatedHasMore = { ...prev, [categoryName]: newsItems.length === 21 };
          console.log(`\x1b[32m[UPDATED] Has more news for ${categoryName}: ${updatedHasMore[categoryName]}\x1b[0m`);
          return updatedHasMore;
        });
        setPage(prev => {
          const updatedPage = { ...prev, [categoryName]: pageNumber };
          console.log(`\x1b[32m[UPDATED] Page updated for ${categoryName}: ${updatedPage[categoryName]}\x1b[0m`);
          return updatedPage;
        });
      } catch (error) {
        if (error instanceof Error && error.message.includes('rest_post_invalid_page_number')) {
          setHasMore(prev => {
            const updatedHasMore = { ...prev, [categoryName]: false };
            console.log(`\x1b[33m[WARNING] No more pages for ${categoryName}\x1b[0m`);
            return updatedHasMore;
          });
        }
        console.log(`\x1b[31m[ERROR] Error fetching news for ${categoryName}: ${error.message}\x1b[0m`);
      } finally {
        setLoading(prev => {
          const updatedLoading = { ...prev, [categoryName]: false };
          console.log(`\x1b[32m[COMPLETED] Loading state updated for ${categoryName}\x1b[0m`);
          return updatedLoading;
        });
      }
    },
    [loading, hasMore]
  );

  const loadMoreNews = useCallback(() => {
    const category = categoriesData.find(c => c.name === selectedCategory);
    if (category && hasMore[selectedCategory] && !loading[selectedCategory]) {
      console.log(`\x1b[33m[LOADING MORE] Loading more news for ${selectedCategory}...\x1b[0m`);
      loadNews(category.id, selectedCategory, (page[selectedCategory] || 1) + 1);
    }
  }, [selectedCategory, hasMore, loading, page, loadNews]);

  return { newsData, loading, hasMore, loadNews, page, loadMoreNews };
};

export default useLoadNews;
