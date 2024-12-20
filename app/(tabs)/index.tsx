import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, Alert } from 'react-native';
import { fetchNews } from '@/services/api';
import type { NewsItem } from '@/types';
import { NewsItemComponent } from '@/components/NewsItem';

const HomeScreen = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  const loadNews = useCallback(async () => {
    try {
      const newsData = await fetchNews();
      setNews(newsData);
    } catch {
      Alert.alert('Error', 'Failed to fetch news.');
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const handlePress = (url: string) => {
    Alert.alert('News URL', url);
  };

  return (
    <FlatList
      data={news}
      keyExtractor={item => item.link}
      renderItem={({ item }) => <NewsItemComponent item={item} onPress={handlePress} />}
      contentContainerStyle={styles.newsList}
    />
  );
};

const styles = StyleSheet.create({
  newsList: {
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
