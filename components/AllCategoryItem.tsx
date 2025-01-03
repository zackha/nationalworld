import { useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import type { AllCategoryItemProps } from '@/types';
import styles from '@/styles/styles';
import { decodeHTML } from 'entities';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { LinearGradient } from 'expo-linear-gradient';
import Octicons from '@expo/vector-icons/Octicons';
import { ArticleFour, ArticleOne, ArticleThree, ArticleTwo } from '@/components/ArticleItems';

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
        <Text style={{ fontFamily: 'BBCReithSerifBd', fontSize: 16, color: 'white', marginHorizontal: 14, paddingBottom: 8, borderBottomColor: '#393b40', borderBottomWidth: 1 }}>
          Stories from {item.categoryName}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {item.news.map((newsItem, idx) => (
            <View key={newsItem.guid} style={[styles.customArticleItem, idx === 0 && { marginLeft: 14 }]}>
              <ImageBackground source={{ uri: newsItem.image }} style={styles.customArticleImage}>
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']} style={styles.customArticleGradient} />
                <View style={styles.customArticleContent}>
                  <Text style={styles.customArticleTitle}>{decodeHTML(newsItem.title)}</Text>
                  <Text style={styles.articleMetaInfoText}>{dayjs(newsItem.pubDate).fromNow()}</Text>
                </View>
              </ImageBackground>
            </View>
          ))}
          <View style={styles.customArticleItem}>
            <TouchableOpacity style={styles.customArticleSeeMoreButton} onPress={() => handleSeeMore(item.categoryName)}>
              <Text style={styles.seeMoreText}>See more</Text>
              <Octicons name="arrow-right" size={22} color="white" />
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
          <View style={{ width: 8, height: 38, backgroundColor: 'red' }}></View>
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
      <TouchableOpacity
        style={{ marginHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12 }}
        onPress={() => handleSeeMore(item.categoryName === 'Latest News' ? 'News' : item.categoryName)}>
        <Text style={styles.seeMoreText}>
          More <Text style={{ textTransform: 'lowercase' }}>{item.categoryName}</Text>
        </Text>
        <Octicons name="arrow-right" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};
