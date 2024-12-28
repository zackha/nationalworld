import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import styles from '@/styles/styles';
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
              renderItem={({ item, index }) => <NewsListItemComponent item={item} index={index} />}
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
