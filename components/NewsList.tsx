import { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { screenWidth } from '@/utils/dimensions';
import type { NewsItemWp, NewsListProps, AllCategoryNews } from '@/types';
import { NewsListItemComponent } from '@/components/NewsListItem';
import { BlurView } from 'expo-blur';
import { AllCategoryItemComponent } from './AllCategoryItem';

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

  const renderAllCategoryItem = ({ item, index }: { item: AllCategoryNews; index: number }) => (
    <AllCategoryItemComponent item={item} index={index} memoizedCategories={memoizedCategories} newsListRef={newsListRef} setSelectedCategory={setSelectedCategory} />
  );

  const renderNewsItem = ({ item, index }: { item: NewsItemWp; index: number }) => <NewsListItemComponent item={item} index={index} />;

  const renderItem = ({ item, index }: { item: AllCategoryNews | NewsItemWp; index: number }) =>
    'categoryName' in item ? renderAllCategoryItem({ item, index }) : renderNewsItem({ item, index });

  const keyExtractor = (item: AllCategoryNews | NewsItemWp, index: number) => ('categoryName' in item ? `${item.categoryName}-${index}` : item.guid);

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
              data={newsData[item] as (AllCategoryNews | NewsItemWp)[]}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              contentContainerStyle={styles.newsList}
              onEndReached={loadMoreNews}
              onEndReachedThreshold={1}
              ListFooterComponent={hasMore[item] ? <ActivityIndicator style={{ padding: 28 }} /> : null}
              windowSize={6}
              initialNumToRender={6}
              maxToRenderPerBatch={6}
              removeClippedSubviews
              showsVerticalScrollIndicator={false}
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
});
