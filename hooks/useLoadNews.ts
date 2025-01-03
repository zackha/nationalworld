import { useState, useCallback } from 'react';
import { fetchAllCategoryNews, fetchNews } from '@/services/apiWp';
import type { NewsDataState, LoadingState, AllCategoryNews, NewsItemWp, PaginationState, HasMoreState } from '@/types';
import { categoriesData } from '@/services/apiWp';

const useLoadNews = (selectedCategory: string) => {
  const [newsData, setNewsData] = useState<NewsDataState>({});
  const [loading, setLoading] = useState<LoadingState>({});
  const [page, setPage] = useState<PaginationState>({});
  const [hasMore, setHasMore] = useState<HasMoreState>({});

  const loadNews = useCallback(
    async (categoryId: number, categoryName: string, pageNumber: number = 1) => {
      if (loading[categoryName] || hasMore[categoryName] === false) return;
      console.log(`\x1b[1m\x1b[33m[LOADING]\x1b[0m\x1b[33m Fetching news for ${categoryName} (ID: ${categoryId}, Page: ${pageNumber})...\x1b[0m`);
      setLoading(prev => ({ ...prev, [categoryName]: true }));
      try {
        if (categoryName === 'All') {
          const allNews = await fetchAllCategoryNews();
          console.log(`\x1b[1m\x1b[32m[SUCCESS]\x1b[0m\x1b[32m Fetched ${allNews.length} items for ${categoryName}\x1b[0m`);
          setNewsData(prev => {
            const updatedNewsData = {
              ...prev,
              [categoryName]: pageNumber === 1 ? allNews : [...((prev[categoryName] as AllCategoryNews[]) || []), ...allNews],
            };
            console.log(`\x1b[1m\x1b[32m[UPDATED]\x1b[0m\x1b[32m News data updated for ${categoryName}\x1b[0m`);
            return updatedNewsData;
          });
        } else {
          const newsItems = await fetchNews(pageNumber, categoryId);
          console.log(`\x1b[1m\x1b[32m[SUCCESS]\x1b[0m\x1b[32m Fetched ${newsItems.length} items for ${categoryName}\x1b[0m`);
          setNewsData(prev => {
            const updatedNewsData = {
              ...prev,
              [categoryName]: pageNumber === 1 ? newsItems : [...((prev[categoryName] as NewsItemWp[]) || []), ...newsItems],
            };
            console.log(`\x1b[1m\x1b[32m[UPDATED]\x1b[0m\x1b[32m News data updated for ${categoryName}\x1b[0m`);
            return updatedNewsData;
          });
          setHasMore(prev => {
            const updatedHasMore = { ...prev, [categoryName]: newsItems.length === 21 };
            console.log(`\x1b[1m\x1b[32m[UPDATED]\x1b[0m\x1b[32m Has more news for ${categoryName}: ${updatedHasMore[categoryName]}\x1b[0m`);
            return updatedHasMore;
          });
          setPage(prev => {
            const updatedPage = { ...prev, [categoryName]: pageNumber };
            console.log(`\x1b[1m\x1b[32m[UPDATED]\x1b[0m\x1b[32m Page updated for ${categoryName}: ${updatedPage[categoryName]}\x1b[0m`);
            return updatedPage;
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes('rest_post_invalid_page_number')) {
            setHasMore(prev => {
              const updatedHasMore = { ...prev, [categoryName]: false };
              console.log(`\x1b[1m\x1b[33m[WARNING]\x1b[0m\x1b[33m No more pages for ${categoryName}\x1b[0m`);
              return updatedHasMore;
            });
          }
          console.log(`\x1b[1m\x1b[31m[ERROR]\x1b[0m\x1b[31m Error fetching news for ${categoryName}: ${error.message}\x1b[0m`);
        } else {
          console.log(`\x1b[1m\x1b[31m[ERROR]\x1b[0m\x1b[31m Unknown error fetching news for ${categoryName}\x1b[0m`);
        }
      } finally {
        setLoading(prev => {
          const updatedLoading = { ...prev, [categoryName]: false };
          console.log(`\x1b[1m\x1b[32m[COMPLETED]\x1b[0m\x1b[32m Loading state updated for ${categoryName}\x1b[0m`);
          return updatedLoading;
        });
      }
    },
    [loading, hasMore]
  );

  const loadMoreNews = useCallback(() => {
    const category = categoriesData.find(c => c.name === selectedCategory);
    if (category && hasMore[selectedCategory] && !loading[selectedCategory]) {
      console.log(`\x1b[1m\x1b[33m[LOADING MORE]\x1b[0m\x1b[33m Loading more news for ${selectedCategory}...\x1b[0m`);
      const nextPage = (page[selectedCategory] || 1) + 1;
      loadNews(category.id, selectedCategory, nextPage);
    }
  }, [selectedCategory, hasMore, loading, page, loadNews]);

  return { newsData, loading, hasMore, loadNews, page, loadMoreNews };
};

export default useLoadNews;
