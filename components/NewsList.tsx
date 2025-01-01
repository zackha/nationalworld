import { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import screenWidth from '@/utils/dimensions';
import type { NewsItemWp, NewsDataState, LoadingState, AllCategoryNews } from '@/types';
import { NewsListItemComponent } from '@/components/NewsListItem';
import { BlurView } from 'expo-blur';

interface NewsListProps {
  newsData: NewsDataState;
  loading: LoadingState;
  hasMore: LoadingState;
  refreshing: boolean;
  memoizedCategories: string[];
  onRefresh: () => void;
  loadMoreNews: () => void;
  newsListRef: React.RefObject<FlatList<string>>;
  onScrollBeginDrag: (event: any) => void;
  onMomentumScrollEnd: (event: any) => void;
  setSelectedCategory: (category: string) => void;
}

const NewsList: React.FC<NewsListProps> = ({
  newsData,
  loading,
  hasMore,
  refreshing,
  memoizedCategories,
  onRefresh,
  loadMoreNews,
  newsListRef,
  onScrollBeginDrag,
  onMomentumScrollEnd,
  setSelectedCategory,
}) => {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const toastPosition = useSharedValue(-50);

  useEffect(() => {
    if (Object.keys(loading).length && !refreshing) {
      setLastUpdated('Just now');
      toastPosition.value = 10;
      const timer = setTimeout(() => {
        toastPosition.value = -50;
        setLastUpdated(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [refreshing]);

  const toastStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(toastPosition.value, { duration: 100 }) }],
  }));

  const handleSeeMore = (categoryName: string) => {
    const categoryIndex = memoizedCategories.findIndex(cat => cat === categoryName);
    if (categoryIndex >= 0) {
      setSelectedCategory(categoryName);
      newsListRef.current?.scrollToIndex({ index: categoryIndex, animated: true });
    }
  };

  const renderAllCategoryItem = ({ item }: { item: AllCategoryNews }) => (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.categoryTitle}>{item.categoryName}</Text>
      {item.news.map(newsItem => (
        <Text key={newsItem.guid} style={styles.newsTitle}>
          {newsItem.title}
        </Text>
      ))}
      <TouchableOpacity style={styles.seeMoreButton} onPress={() => handleSeeMore(item.categoryName)}>
        <Text style={styles.seeMoreText}>See more</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNewsItem = ({ item, index }: { item: NewsItemWp; index: number }) => <NewsListItemComponent item={item} index={index} />;

  const renderCategoryContent = (category: string) => {
    return category === 'All' ? renderAllCategoryItem : renderNewsItem;
  };

  const keyExtractor = (newsItem: any, index: number) =>
    memoizedCategories.includes('All') ? `${(newsItem as AllCategoryNews).categoryName}-${index}` : (newsItem as NewsItemWp).guid;

  return (
    <FlatList
      ref={newsListRef}
      data={memoizedCategories}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item}
      getItemLayout={(data, index) => ({ length: screenWidth, offset: screenWidth * index, index })}
      onScrollBeginDrag={onScrollBeginDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      renderItem={({ item }) => (
        <View style={{ width: screenWidth }}>
          {lastUpdated && (
            <Animated.View style={[styles.lastUpdatedContainer, toastStyle]}>
              <BlurView intensity={70} style={styles.blurContainer}>
                <Text style={styles.lastUpdatedText}>Last updated: {lastUpdated}</Text>
              </BlurView>
            </Animated.View>
          )}
          {loading[item] && !refreshing && !hasMore[item] ? (
            <ActivityIndicator style={{ flex: 1 }} />
          ) : (
            <FlatList
              windowSize={6}
              key="articles"
              removeClippedSubviews
              initialNumToRender={6}
              maxToRenderPerBatch={6}
              data={newsData[item] as AllCategoryNews[] | NewsItemWp[]}
              keyExtractor={keyExtractor}
              renderItem={renderCategoryContent(item)}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.newsList}
              onEndReached={loadMoreNews}
              onEndReachedThreshold={1}
              ListFooterComponent={hasMore[item] ? <ActivityIndicator style={{ padding: 28 }} /> : null}
            />
          )}
        </View>
      )}
    />
  );
};

export default NewsList;

const styles = StyleSheet.create({
  newsList: {},
  lastUpdatedContainer: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
  },
  blurContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  lastUpdatedText: {
    fontFamily: 'BBCReithSansRg',
    color: 'white',
    fontSize: 14,
    lineHeight: 18,
  },
  seeMoreButton: {
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  seeMoreText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoryTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 14,
  },
  newsTitle: {
    color: 'white',
    padding: 14,
  },
});
