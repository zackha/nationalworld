import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { fetchNews, categoriesData } from '@/services/apiWp';
import type { NewsItemWp } from '@/types';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [newsData, setNewsData] = useState<NewsItemWp[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoriesData[0].name);
  const flatListRef = useRef<FlatList<string>>(null);
  const newsListRef = useRef<FlatList<string>>(null);

  const loadNews = useCallback(async (categoryId: number) => {
    const newsItems = await fetchNews(1, categoryId);
    setNewsData(newsItems);
  }, []);

  useEffect(() => {
    const category = categoriesData.find(c => c.name === selectedCategory);
    if (category) {
      loadNews(category.id);
    }
  }, [selectedCategory, loadNews]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const category = categoriesData.find(c => c.name === selectedCategory);
    if (category) {
      await loadNews(category.id);
    }
    setRefreshing(false);
  }, [loadNews, selectedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const index = categoriesData.findIndex(c => c.name === category);
    newsListRef.current?.scrollToIndex({ index, animated: true });
  };

  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleCategorySelect(item)} style={styles.categoryButton}>
      <Text style={[styles.categoryText, item === selectedCategory && styles.selectedCategoryText]}>{item}</Text>
      {item === selectedCategory && <View style={styles.underline} />}
    </TouchableOpacity>
  );

  const renderNewsItem = ({ item }: { item: NewsItemWp }) => (
    <View style={styles.newsItem}>
      <Text style={styles.newsText}>{item.title}</Text>
    </View>
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
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setSelectedCategory(categoriesData[index].name);
            flatListRef.current?.scrollToIndex({ index, animated: true });
          }}
          renderItem={() => (
            <FlatList
              windowSize={6}
              key="articles"
              removeClippedSubviews
              initialNumToRender={6}
              maxToRenderPerBatch={6}
              data={newsData}
              keyExtractor={item => item.guid}
              renderItem={renderNewsItem}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.newsList}
            />
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
});
