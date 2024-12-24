import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { NewsItemComponent } from '@/components/NewsItem';
import type { NewsItemWp } from '@/types';
import { fetchNews } from '@/services/apiWp';
import { Header } from '@/components/Header';

export default function HomeScreen() {
  const [newsData, setNewsData] = useState<NewsItemWp[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadNews = useCallback(async () => {
    const newsItems = await fetchNews();
    setNewsData(newsItems);
    console.log(newsItems);
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  }, [loadNews]);

  return (
    <ThemedView>
      <Header />
      <FlatList
        data={newsData}
        renderItem={({ item }) => <NewsItemComponent item={item} />}
        keyExtractor={item => item.guid}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.newsList}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  newsList: {
    padding: 20,
    // backgroundColor: 'red',
  },
});
