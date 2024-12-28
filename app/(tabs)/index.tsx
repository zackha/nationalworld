import React, { useRef, useCallback, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { categoriesData } from '@/services/apiWp';
import type { NewsItemWp } from '@/types';
import styles from '@/styles/styles';
import screenWidth from '@/utils/dimensions';
import useLoadNews from '@/hooks/useLoadNews';
import useCategorySelection from '@/hooks/useCategorySelection';
import useRefreshNews from '@/hooks/useRefreshNews';

export default function HomeScreen() {
  const flatListRef = useRef<FlatList<string>>(null);

  const { newsData, loading, hasMore, loadNews, page } = useLoadNews();

  const { selectedCategory, handleCategorySelect, newsListRef, memoizedCategories, setSelectedCategory } = useCategorySelection(newsData, loadNews);

  useEffect(() => {
    const category = categoriesData.find(c => c.name === selectedCategory);
    if (category && !newsData[selectedCategory]) {
      loadNews(category.id, selectedCategory);
    }
  }, [selectedCategory, loadNews, newsData]);

  const { refreshing, onRefresh } = useRefreshNews(selectedCategory, loadNews);

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
        <FlatList
          ref={newsListRef}
          data={memoizedCategories}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          getItemLayout={(data, index) => ({ length: screenWidth, offset: screenWidth * index, index })}
          onScrollBeginDrag={event => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const currentIndex = Math.round(offsetX / screenWidth);
            const nextIndex = currentIndex + 1;
            const previousIndex = currentIndex - 1;

            const categoriesToLoad = [
              categoriesData[nextIndex]?.name,
              categoriesData[nextIndex + 1]?.name,
              categoriesData[previousIndex]?.name,
              categoriesData[previousIndex - 1]?.name,
            ].filter(Boolean);

            categoriesToLoad.forEach(catName => {
              const category = categoriesData.find(c => c.name === catName);
              if (category && !newsData[catName]) {
                loadNews(category.id, catName);
              }
            });
          }}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setSelectedCategory(categoriesData[index].name);
            flatListRef.current?.scrollToIndex({ index, animated: true });
          }}
          renderItem={({ item }) => (
            <View style={{ width: screenWidth }}>
              {loading[item] && !refreshing && !hasMore[item] ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
              ) : (
                <FlatList
                  windowSize={6}
                  key="articles"
                  removeClippedSubviews
                  initialNumToRender={6}
                  maxToRenderPerBatch={6}
                  data={newsData[item]}
                  keyExtractor={newsItem => newsItem.guid}
                  renderItem={renderNewsItem}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.newsList}
                  onEndReached={loadMoreNews}
                  onEndReachedThreshold={1}
                  ListFooterComponent={loading[item] && hasMore[item] ? <ActivityIndicator size="small" color="#0000ff" /> : null}
                />
              )}
            </View>
          )}
        />
      </View>
    </ThemedView>
  );
}
