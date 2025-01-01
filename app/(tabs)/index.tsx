import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { categoriesData } from '@/services/apiWp';
import useLoadNews from '@/hooks/useLoadNews';
import useCategorySelection from '@/hooks/useCategorySelection';
import useRefreshNews from '@/hooks/useRefreshNews';
import useScrollHandlers from '@/hooks/useScrollHandlers';
import NewsList from '@/components/NewsList';
import CategorySelector from '@/components/CategorySelector';
import Header from '@/components/Header';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState(categoriesData[0].name);
  const { newsData, loading, hasMore, loadNews, loadMoreNews } = useLoadNews(selectedCategory);
  const { handleCategorySelect, newsListRef, memoizedCategories } = useCategorySelection(newsData, loadNews, setSelectedCategory);
  const { refreshing, onRefresh } = useRefreshNews(selectedCategory, loadNews);
  const { onScrollBeginDrag, onMomentumScrollEnd, flatListRef } = useScrollHandlers(newsData, loadNews, setSelectedCategory);

  useEffect(() => {
    const category = categoriesData.find(c => c.name === selectedCategory);
    if (category && !newsData[selectedCategory]) {
      loadNews(category.id, selectedCategory);
    }
  }, [selectedCategory, loadNews, newsData]);

  return (
    <ThemedView>
      <Header />
      <CategorySelector categories={memoizedCategories} selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} flatListRef={flatListRef} />
      <NewsList
        newsData={newsData}
        loading={loading}
        hasMore={hasMore}
        loadMoreNews={loadMoreNews}
        onRefresh={onRefresh}
        refreshing={refreshing}
        newsListRef={newsListRef}
        onScrollBeginDrag={onScrollBeginDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        memoizedCategories={memoizedCategories}
        setSelectedCategory={setSelectedCategory}
      />
    </ThemedView>
  );
}
