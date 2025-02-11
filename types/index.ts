import { FlatList, StyleProp, ViewStyle } from 'react-native';

export interface NewsItemWp {
  title: string;
  link: string;
  description: string;
  content: string;
  pubDate: string;
  guid: string;
  creator: number;
  categories: number[];
  image: string;
}

export interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  author: number;
  categories: number[];
  content: { rendered: string };
}

export interface CategoryData {
  id: number;
  name: string;
}

export interface AllCategoryNews {
  categoryName: string;
  news: NewsItemWp[];
}

export interface LoadingState {
  [key: string]: boolean;
}

export interface NewsDataState {
  [key: string]: NewsItemWp[] | AllCategoryNews[];
}

export interface PaginationState {
  [key: string]: number;
}

export interface HasMoreState {
  [key: string]: boolean;
}

export interface AllCategoryItemProps {
  item: AllCategoryNews;
  memoizedCategories: string[];
  newsListRef: React.RefObject<FlatList<string>>;
  setSelectedCategory: (category: string) => void;
  index: number;
}

export interface NewsListProps {
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

export interface SettingsListItemProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
