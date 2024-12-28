import React, { useCallback, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { categoriesData } from '@/services/apiWp';
import type { NewsItemWp } from '@/types';
import styles from '@/styles/styles';
import useLoadNews from '@/hooks/useLoadNews';
import useCategorySelection from '@/hooks/useCategorySelection';
import useRefreshNews from '@/hooks/useRefreshNews';
import useScrollHandlers from '@/hooks/useScrollHandlers';
import NewsList from '@/components/NewsList';

export default function HomeScreen() {
  const { newsData, loading, hasMore, loadNews, page } = useLoadNews();
  const { selectedCategory, handleCategorySelect, newsListRef, memoizedCategories, setSelectedCategory } = useCategorySelection(newsData, loadNews);
  const { refreshing, onRefresh } = useRefreshNews(selectedCategory, loadNews);
  const { onScrollBeginDrag, onMomentumScrollEnd, flatListRef } = useScrollHandlers(newsData, loadNews, setSelectedCategory);

  useEffect(() => {
    const category = categoriesData.find(c => c.name === selectedCategory);
    if (category && !newsData[selectedCategory]) {
      loadNews(category.id, selectedCategory);
    }
  }, [selectedCategory, loadNews, newsData]);

  const renderCategoryItem = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity onPress={() => handleCategorySelect(item)} style={styles.categoryButton}>
        <Text style={[styles.categoryText, item === selectedCategory && styles.selectedCategoryText]}>{item}</Text>
        {item === selectedCategory && <View style={styles.underline} />}
      </TouchableOpacity>
    ),
    [selectedCategory]
  );

  const renderNewsItem = useCallback(
    ({ item }: { item: NewsItemWp }) => (
      <View style={styles.newsItem}>
        <Text style={styles.newsText}>{item.title}</Text>
      </View>
    ),
    []
  );

  const loadMoreNews = useCallback(() => {
    const category = categoriesData.find(c => c.name === selectedCategory);
    if (category && hasMore[selectedCategory] && !loading[selectedCategory]) {
      loadNews(category.id, selectedCategory, (page[selectedCategory] || 1) + 1);
    }
  }, [selectedCategory, hasMore, loading, page, loadNews]);

  return (
    <ThemedView>
      <View style={styles.container}>
        <FlatList ref={flatListRef} data={memoizedCategories} horizontal showsHorizontalScrollIndicator={false} keyExtractor={item => item} renderItem={renderCategoryItem} />
        <NewsList
          newsData={newsData}
          loading={loading}
          hasMore={hasMore}
          loadMoreNews={loadMoreNews}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderNewsItem={renderNewsItem}
          newsListRef={newsListRef}
          onScrollBeginDrag={onScrollBeginDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          memoizedCategories={memoizedCategories}
        />
      </View>
    </ThemedView>
  );
}
