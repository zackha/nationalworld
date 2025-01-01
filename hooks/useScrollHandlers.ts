import { useCallback, useRef } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, FlatList } from 'react-native';
import { categoriesData } from '@/services/apiWp';
import screenWidth from '@/utils/dimensions';
import type { NewsDataState } from '@/types';

const useScrollHandlers = (newsData: NewsDataState, loadNews: (categoryId: number, categoryName: string) => Promise<void>, setSelectedCategory: Function) => {
  const flatListRef = useRef<FlatList<string>>(null);
  const onScrollBeginDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(offsetX / screenWidth);
      const nextIndex = currentIndex + 1;
      const previousIndex = currentIndex - 1;

      const categoriesToLoad = [
        categoriesData[nextIndex]?.name,
        categoriesData[nextIndex + 1]?.name,
        categoriesData[previousIndex]?.name,
        categoriesData[previousIndex - 1]?.name,
      ].filter(Boolean);

      categoriesToLoad.forEach(catName => {
        const category = categoriesData.find(c => c.name === catName);
        if (category && !newsData[catName]) {
          loadNews(category.id, catName);
        }
      });
    },
    [loadNews, newsData]
  );

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
      setSelectedCategory(categoriesData[index].name);
      flatListRef.current?.scrollToIndex({ index, animated: true });
    },
    [setSelectedCategory, flatListRef]
  );

  return { onScrollBeginDrag, onMomentumScrollEnd, flatListRef };
};

export default useScrollHandlers;
