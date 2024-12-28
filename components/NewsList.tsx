import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import styles from '@/styles/styles';
import screenWidth from '@/utils/dimensions';
import type { NewsItemWp } from '@/types';

interface NewsListProps {
  newsData: Record<string, NewsItemWp[]>;
  loading: Record<string, boolean>;
  hasMore: Record<string, boolean>;
  refreshing: boolean;
  memoizedCategories: any[];
  onRefresh: () => void;
  loadMoreNews: () => void;
  renderNewsItem: ({ item }: { item: NewsItemWp }) => JSX.Element;
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
  renderNewsItem,
  newsListRef,
  onScrollBeginDrag,
  onMomentumScrollEnd,
}) => {
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
          {loading[item] && !refreshing && !hasMore[item] ? (
            <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
          ) : (
            <FlatList
              windowSize={6}
              key="articles"
              removeClippedSubviews
              initialNumToRender={6}
              maxToRenderPerBatch={6}
              data={newsData[item]}
              keyExtractor={newsItem => newsItem.guid}
              renderItem={renderNewsItem}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.newsList}
              onEndReached={loadMoreNews}
              onEndReachedThreshold={1}
              ListFooterComponent={loading[item] && hasMore[item] ? <ActivityIndicator size="small" color="#0000ff" /> : null}
            />
          )}
        </View>
      )}
    />
  );
};

export default NewsList;
