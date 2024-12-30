import { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import screenWidth from '@/utils/dimensions';
import type { NewsItemWp } from '@/types';
import { NewsListItemComponent } from '@/components/NewsListItem';

interface NewsListProps {
  newsData: Record<string, NewsItemWp[]>;
  loading: Record<string, boolean>;
  hasMore: Record<string, boolean>;
  refreshing: boolean;
  memoizedCategories: any[];
  onRefresh: () => void;
  loadMoreNews: () => void;
  newsListRef: React.RefObject<FlatList<string>>;
  onScrollBeginDrag: (event: any) => void;
  onMomentumScrollEnd: (event: any) => void;
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
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [refreshing]);

  const toastStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(toastPosition.value, { duration: 100 }) }],
  }));

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
              <Text style={styles.lastUpdatedText}>Last updated: {lastUpdated}</Text>
            </Animated.View>
          )}
          {loading[item] && !refreshing && !hasMore[item] ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              windowSize={6}
              key="articles"
              removeClippedSubviews
              initialNumToRender={6}
              maxToRenderPerBatch={6}
              data={newsData[item]}
              keyExtractor={newsItem => newsItem.guid}
              renderItem={({ item, index }) => <NewsListItemComponent item={item} index={index} />}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.newsList}
              onEndReached={loadMoreNews}
              onEndReachedThreshold={1}
              ListFooterComponent={hasMore[item] ? <ActivityIndicator /> : null}
            />
          )}
        </View>
      )}
    />
  );
};

export default NewsList;

const styles = StyleSheet.create({
  newsList: {
    paddingBottom: 20,
  },
  lastUpdatedContainer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 99,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastUpdatedText: {
    fontFamily: 'BBCReithSansRg',
    color: 'white',
    fontSize: 14,
    lineHeight: 18,
  },
});
