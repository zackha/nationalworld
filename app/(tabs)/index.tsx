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
        windowSize={6}
        key="blogHome"
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        data={newsData}
        renderItem={({ item, index }) => <NewsItemComponent item={item} index={index} />}
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
    // backgroundColor: 'red',
  },
});
