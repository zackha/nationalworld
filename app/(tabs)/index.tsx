import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { fetchNews, categoriesData } from '@/services/apiWp';
import type { NewsItemWp, LoadingState, NewsDataState } from '@/types';
import styles from '@/styles/styles';
import { getScreenWidth } from '@/utils/dimensions';

export default function HomeScreen() {
  const [newsData, setNewsData] = useState<NewsDataState>({});
  const [loading, setLoading] = useState<LoadingState>({});
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoriesData[0].name);
  const [page, setPage] = useState<{ [key: string]: number }>({});
  const [hasMore, setHasMore] = useState<{ [key: string]: boolean }>({});
  const flatListRef = useRef<FlatList<string>>(null);
  const newsListRef = useRef<FlatList<string>>(null);

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

  useEffect(() => {
    const category = categoriesData.find(c => c.name === selectedCategory);
    if (category && !newsData[selectedCategory]) {
      loadNews(category.id, selectedCategory);
    }
  }, [selectedCategory, loadNews, newsData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const category = categoriesData.find(c => c.name === selectedCategory);
    if (category) {
      await loadNews(category.id, selectedCategory);
    }
    setRefreshing(false);
  }, [loadNews, selectedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const index = categoriesData.findIndex(c => c.name === category);
    const categoriesToLoad = [category, categoriesData[index - 1]?.name, categoriesData[index + 1]?.name].filter(Boolean);

    categoriesToLoad.forEach(catName => {
      const category = categoriesData.find(c => c.name === catName);
      if (category && !newsData[catName]) {
        loadNews(category.id, catName);
      }
    });

    newsListRef.current?.scrollToIndex({ index, animated: true });
  };

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

  const memoizedCategories = useMemo(() => categoriesData.map(c => c.name), []);

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
          getItemLayout={(data, index) => ({ length: getScreenWidth(), offset: getScreenWidth() * index, index })}
          onScrollBeginDrag={event => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const currentIndex = Math.round(offsetX / getScreenWidth());
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
            const index = Math.round(event.nativeEvent.contentOffset.x / getScreenWidth());
            setSelectedCategory(categoriesData[index].name);
            flatListRef.current?.scrollToIndex({ index, animated: true });
          }}
          renderItem={({ item }) => (
            <View style={{ width: getScreenWidth() }}>
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
