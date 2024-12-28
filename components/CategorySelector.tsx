import { useCallback } from 'react';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import styles from '@/styles/styles';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  flatListRef: React.RefObject<FlatList<string>>;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, selectedCategory, onSelectCategory, flatListRef }) => {
  const renderCategoryItem = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity onPress={() => onSelectCategory(item)}>
        <Text style={[styles.categoryText, item === selectedCategory && styles.selectedCategoryText]}>{item}</Text>
        {item === selectedCategory && <View style={styles.underline} />}
      </TouchableOpacity>
    ),
    [selectedCategory]
  );

  return <FlatList ref={flatListRef} data={categories} horizontal showsHorizontalScrollIndicator={false} keyExtractor={item => item} renderItem={renderCategoryItem} />;
};

export default CategorySelector;
