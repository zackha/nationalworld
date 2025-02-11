import { useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import type { AllCategoryItemProps } from '@/types';
import styles from '@/styles/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ArticleFour, ArticleOne, ArticleThree, ArticleTwo, CustomArticle } from '@/components/ArticleItems';

export const AllCategoryItemComponent: React.FC<AllCategoryItemProps> = ({ item, memoizedCategories, newsListRef, setSelectedCategory, index }) => {
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

  if (index === 1) {
    return (
      <View style={styles.customArticleContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 14, gap: 14 }}>
          <View style={{ width: 4, height: 16, backgroundColor: 'red' }} />
          <Text style={{ fontFamily: 'BBCReithSerifBd', fontSize: 16, color: 'white' }}>Stories from {item.categoryName}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {item.news.map((item, idx) => (
            <CustomArticle key={item.guid} item={item} isFirst={idx === 0} />
          ))}
          <View style={styles.customArticleItem}>
            <TouchableOpacity style={styles.customArticleSeeMoreButton} onPress={() => handleSeeMore(item.categoryName)}>
              <Text style={styles.seeMoreText}>See more</Text>
              <IconSymbol name="arrow.forward" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View>
      {item.categoryName !== 'Latest News' && (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 14, gap: 14, backgroundColor: '#0d0d0d', borderTopWidth: 6, borderTopColor: '#262626' }}>
          <View style={{ width: 8, height: 38, backgroundColor: 'red' }} />
          <Text style={{ color: 'white', fontFamily: 'BBCReithSerifBd', fontSize: 38 }}>{item.categoryName}</Text>
        </View>
      )}
      {item.news.map((newsItem, index) => {
        if (index === 0) {
          return <ArticleOne key={newsItem.guid} {...newsItem} />;
        } else if (index === 1 || index === 2) {
          return <ArticleTwo key={newsItem.guid} {...newsItem} />;
        } else if (index >= 3 && index <= 5) {
          return <ArticleThree key={newsItem.guid} {...newsItem} />;
        } else {
          return <ArticleFour key={newsItem.guid} {...newsItem} />;
        }
      })}
      <TouchableOpacity style={styles.seeMoreButton} onPress={() => handleSeeMore(item.categoryName === 'Latest News' ? 'News' : item.categoryName)}>
        <Text style={styles.seeMoreText}>
          More <Text style={{ textTransform: 'lowercase' }}>{item.categoryName}</Text>
        </Text>
        <IconSymbol name="arrow.forward" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
};
