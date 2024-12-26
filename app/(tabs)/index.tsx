import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, RefreshControl, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { fetchNews, categoriesData } from '@/services/apiWp';
import type { NewsItemWp } from '@/types';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [newsData, setNewsData] = useState<{ [key: string]: NewsItemWp[] }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoriesData[0].name);
  const flatListRef = useRef<FlatList<string>>(null);
  const newsListRef = useRef<FlatList<string>>(null);

  const loadNews = useCallback(
    async (categoryId: number, categoryName: string) => {
      if (loading[categoryName] || newsData[categoryName]) return;
      console.log(`\x1b[33mFetching...... ${categoryName} (ID: ${categoryId})\x1b[0m`);
      setLoading(prev => ({ ...prev, [categoryName]: true }));
      try {
        const newsItems = await fetchNews(1, categoryId);
        console.log(`\x1b[32mFetched! ${categoryName}\x1b[0m`);
        setNewsData(prev => ({ ...prev, [categoryName]: newsItems }));
      } catch (error) {
        console.error(`Error fetching news for ${categoryName}:`, error);
      } finally {
        setLoading(prev => ({ ...prev, [categoryName]: false }));
      }
    },
    [loading, newsData]
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
    const index = categoriesData.findIndex(c => c.name === category);

    setSelectedCategory(category);

    const previousCategory = categoriesData[index - 1];
    const nextCategory = categoriesData[index + 1];

    const categoriesToLoad = [category, previousCategory?.name, nextCategory?.name].filter(Boolean);

    categoriesToLoad.forEach(catName => {
      const category = categoriesData.find(c => c.name === catName);
      if (category && !newsData[catName]) {
        loadNews(category.id, catName);
      }
    });

    newsListRef.current?.scrollToIndex({ index, animated: true });
  };

  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleCategorySelect(item)} style={styles.categoryButton}>
      <Text style={[styles.categoryText, item === selectedCategory && styles.selectedCategoryText]}>{item}</Text>
      {item === selectedCategory && <View style={styles.underline} />}
    </TouchableOpacity>
  );

  const renderNewsItem = useCallback(
    ({ item }: { item: NewsItemWp }) => (
      <View style={styles.newsItem}>
        <Text style={styles.newsText}>{item.title}</Text>
      </View>
    ),
    []
  );

  return (
    <ThemedView>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={categoriesData.map(c => c.name)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          renderItem={renderCategoryItem}
        />
        <FlatList
          ref={newsListRef}
          data={categoriesData.map(c => c.name)}
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

            // Sağa doğru kaydırma
            if (nextIndex < categoriesData.length) {
              const nextCategory = categoriesData[nextIndex];
              const nextNextCategory = categoriesData[nextIndex + 1];

              // Bir sonraki kategori ve onun komşusunu yükle
              const categoriesToLoad = [nextCategory?.name, nextNextCategory?.name].filter(Boolean);

              categoriesToLoad.forEach(catName => {
                const category = categoriesData.find(c => c.name === catName);
                if (category && !newsData[catName] && !loading[catName]) {
                  loadNews(category.id, catName);
                }
              });
            }

            // Sola doğru kaydırma
            if (previousIndex >= 0) {
              const previousCategory = categoriesData[previousIndex];
              const previousPreviousCategory = categoriesData[previousIndex - 1];

              // Bir önceki kategori ve onun komşusunu yükle
              const categoriesToLoad = [previousCategory?.name, previousPreviousCategory?.name].filter(Boolean);

              categoriesToLoad.forEach(catName => {
                const category = categoriesData.find(c => c.name === catName);
                if (category && !newsData[catName] && !loading[catName]) {
                  loadNews(category.id, catName);
                }
              });
            }
          }}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setSelectedCategory(categoriesData[index].name);
            flatListRef.current?.scrollToIndex({ index, animated: true });
          }}
          renderItem={({ item }) => (
            <View style={{ width: screenWidth }}>
              {loading[item] ? (
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
                />
              )}
            </View>
          )}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  categoryButton: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: '#555',
  },
  selectedCategoryText: {
    fontWeight: 'bold',
    color: '#000',
  },
  underline: {
    height: 2,
    backgroundColor: '#000',
    width: '100%',
    marginTop: 5,
  },
  newsList: {
    backgroundColor: 'red',
  },
  newsItem: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  newsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
