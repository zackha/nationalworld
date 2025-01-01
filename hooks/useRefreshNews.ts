import { useCallback, useState } from 'react';
import { categoriesData } from '@/services/apiWp';

const useRefreshNews = (selectedCategory: string, loadNews: (categoryId: number, categoryName: string) => Promise<void>) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const category = categoriesData.find(c => c.name === selectedCategory);
    if (category) {
      await loadNews(category.id, selectedCategory);
    }
    setRefreshing(false);
  }, [loadNews, selectedCategory]);
  return { refreshing, onRefresh };
};

export default useRefreshNews;
