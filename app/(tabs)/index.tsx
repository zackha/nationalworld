import { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { NewsItemComponent } from '@/components/NewsItem';
import type { NewsItem } from '@/types';
import { fetchNews } from '@/services/api';

export default function HomeScreen() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNews().then((newsItems: NewsItem[]) => {
      setNewsData(newsItems);
    });
  }, []);

  return (
    <ThemedView style={styles.titleContainer}>
      <FlatList data={newsData} renderItem={({ item }) => <NewsItemComponent item={item} />} keyExtractor={item => item.guid} showsVerticalScrollIndicator={false} />
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
