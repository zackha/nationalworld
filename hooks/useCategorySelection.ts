import { useState, useRef, useMemo } from 'react';
import { categoriesData } from '@/services/apiWp';
import { FlatList } from 'react-native';
import type { NewsDataState } from '@/types';

const useCategorySelection = (newsData: NewsDataState, loadNews: (categoryId: number, categoryName: string) => Promise<void>, setSelectedCategory: Function) => {
  const newsListRef = useRef<FlatList<string>>(null);
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const index = categoriesData.findIndex(c => c.name === category);
    const categoriesToLoad = [category, categoriesData[index - 1]?.name, categoriesData[index + 1]?.name].filter(Boolean);

    categoriesToLoad.forEach(catName => {
      const category = categoriesData.find(c => c.name === catName);
      if (category && !newsData[catName]) {
        loadNews(category.id, catName);
      }
    });

    newsListRef.current?.scrollToIndex({ index, animated: true });
  };

  const memoizedCategories = useMemo(() => categoriesData.map(c => c.name), []);

  return { handleCategorySelect, newsListRef, memoizedCategories };
};

export default useCategorySelection;
