import { useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import type { AllCategoryItemProps } from '@/types';
import styles from '@/styles/styles';
import { decodeHTML } from 'entities';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { LinearGradient } from 'expo-linear-gradient';
import { categoriesData } from '@/services/apiWp';
import Octicons from '@expo/vector-icons/Octicons';

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

  if (index === 2) {
    return (
      <View style={styles.customArticleContainer}>
        <Text style={{ fontFamily: 'BBCReithSerifBd', fontSize: 16, color: 'white', marginHorizontal: 14, paddingBottom: 7, borderBottomColor: '#393b40', borderBottomWidth: 1 }}>
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
              <Text style={styles.customArticleSeeMoreText}>See More</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View>
      {item.news.map((newsItem, index) => {
        if (index === 0) {
          return (
            <View key={newsItem.guid}>
              <Image source={{ uri: newsItem.image }} style={styles.articleOneImage} />
              <View style={styles.articleOneContent}>
                <Text style={styles.articleOneTitle}>{decodeHTML(newsItem.title)}</Text>
                <Text style={styles.articleDescription}>{decodeHTML(newsItem.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
                <View style={styles.articleMetaInfo}>
                  <Text style={styles.articleMetaInfoText}>{dayjs(newsItem.pubDate).fromNow()}</Text>
                  <View style={styles.articleMetaInfoDivider} />
                  <Text style={styles.articleMetaInfoText}>{item.news[0].categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
                </View>
              </View>
            </View>
          );
        } else if (index === 1 || index === 2) {
          return (
            <View key={newsItem.guid} style={styles.articleTwoContainer}>
              <Image source={{ uri: newsItem.image }} style={styles.articleTwoImage} />
              <View style={styles.articleTwoContent}>
                <Text style={styles.articleTitle}>{decodeHTML(newsItem.title)}</Text>
                <View style={styles.articleMetaInfo}>
                  <Text style={styles.articleMetaInfoText}>{dayjs(newsItem.pubDate).fromNow()}</Text>
                  <View style={styles.articleMetaInfoDivider} />
                  <Text style={styles.articleMetaInfoText}>{item.news[0].categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
                </View>
              </View>
            </View>
          );
        } else if (index >= 3 && index <= 5) {
          return (
            <View key={newsItem.guid} style={styles.articleThreeContainer}>
              <Text style={styles.articleTitle}>{decodeHTML(newsItem.title)}</Text>
              <Text style={styles.articleDescription}>{decodeHTML(newsItem.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
              <View style={styles.articleMetaInfo}>
                <Text style={styles.articleMetaInfoText}>{dayjs(newsItem.pubDate).fromNow()}</Text>
                <View style={styles.articleMetaInfoDivider} />
                <Text style={styles.articleMetaInfoText}>{newsItem.categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
              </View>
            </View>
          );
        } else {
          return (
            <View key={newsItem.guid} style={styles.articleThreeContainer}>
              <Image source={{ uri: newsItem.image }} style={styles.articleOneImage} />
              <View style={styles.articleTwoContent}>
                <Text style={styles.articleTitle}>{decodeHTML(newsItem.title)}</Text>
                <Text style={styles.articleDescription}>{decodeHTML(newsItem.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
                <View style={styles.articleMetaInfo}>
                  <Text style={styles.articleMetaInfoText}>{dayjs(newsItem.pubDate).fromNow()}</Text>
                  <View style={styles.articleMetaInfoDivider} />
                  <Text style={styles.articleMetaInfoText}>{newsItem.categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
                </View>
              </View>
            </View>
          );
        }
      })}
      {item.categoryName === 'All' ? (
        <TouchableOpacity
          style={{ marginHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12 }}
          onPress={() => handleSeeMore(item.categoryName)}>
          <Text style={{ fontFamily: 'BBCReithSerifBd', color: 'white', fontSize: 16, lineHeight: 18 }}>More latest news</Text>
          <Octicons name="arrow-right" size={22} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.seeMoreButton} onPress={() => handleSeeMore(item.categoryName)}>
          <Text style={styles.seeMoreText}>More {item.categoryName}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
