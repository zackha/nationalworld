import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { NewsItemComponent } from '@/components/NewsItem';
import type { NewsItem } from '@/types';
import { fetchNews } from '@/services/api';

export default function HomeScreen() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadNews = async () => {
    const newsItems: NewsItem[] = await fetchNews();
    setNewsData(newsItems);
  };

  useEffect(() => {
    loadNews();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  };

  return (
    <ThemedView style={styles.titleContainer}>
      <FlatList
        data={newsData}
        renderItem={({ item }) => <NewsItemComponent item={item} />}
        keyExtractor={item => item.guid}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
