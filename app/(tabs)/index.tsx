import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { categoriesData } from '@/services/apiWp';
import styles from '@/styles/styles';
import useLoadNews from '@/hooks/useLoadNews';
import useCategorySelection from '@/hooks/useCategorySelection';
import useRefreshNews from '@/hooks/useRefreshNews';
import useScrollHandlers from '@/hooks/useScrollHandlers';
import NewsList from '@/components/NewsList';

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

  const renderCategoryItem = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity onPress={() => handleCategorySelect(item)} style={styles.categoryButton}>
        <Text style={[styles.categoryText, item === selectedCategory && styles.selectedCategoryText]}>{item}</Text>
        {item === selectedCategory && <View style={styles.underline} />}
      </TouchableOpacity>
    ),
    [selectedCategory]
  );

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
          newsListRef={newsListRef}
          onScrollBeginDrag={onScrollBeginDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          memoizedCategories={memoizedCategories}
        />
      </View>
    </ThemedView>
  );
}
