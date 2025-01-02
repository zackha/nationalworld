import { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { AllCategoryItemProps } from '@/types';
import styles from '@/styles/styles';

export const AllCategoryItemComponent: React.FC<AllCategoryItemProps> = ({ item, memoizedCategories, newsListRef, setSelectedCategory }) => {
  const handleSeeMore = useCallback(
    (categoryName: string) => {
      const categoryIndex = memoizedCategories.indexOf(categoryName);
      if (categoryIndex >= 0) {
        setSelectedCategory(categoryName);
        newsListRef.current?.scrollToIndex({ index: categoryIndex, animated: true });
      }
    },
    [memoizedCategories, newsListRef, setSelectedCategory]
  );

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', padding: 14 }}>{item.categoryName}</Text>
      {item.news.map(newsItem => (
        <Text key={newsItem.guid} style={styles.articleTitle}>
          {newsItem.title}
        </Text>
      ))}
      <TouchableOpacity style={styles.seeMoreButton} onPress={() => handleSeeMore(item.categoryName)}>
        <Text style={styles.seeMoreText}>See more</Text>
      </TouchableOpacity>
    </View>
  );
};
