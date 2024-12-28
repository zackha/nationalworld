import { useCallback } from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  flatListRef: React.RefObject<FlatList<string>>;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, selectedCategory, onSelectCategory, flatListRef }) => {
  const renderCategoryItem = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => onSelectCategory(item)}>
          <View style={{ paddingHorizontal: 16 }}>
            <Text style={styles.categoryText}>{item}</Text>
            <View style={[styles.underline, item === selectedCategory && styles.underlineActive]} />
          </View>
        </TouchableOpacity>
        {index < categories.length - 1 && <View style={styles.divider} />}
      </View>
    ),
    [selectedCategory]
  );

  return (
    <View style={styles.container}>
      <FlatList ref={flatListRef} data={categories} horizontal showsHorizontalScrollIndicator={false} keyExtractor={item => item} renderItem={renderCategoryItem} />
    </View>
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'BBCReithSansMd',
  },
  underline: { borderBottomWidth: 2, borderBottomColor: 'transparent' },
  underlineActive: { borderBottomColor: '#fff' },
  divider: {
    height: '65%',
    width: 1,
    backgroundColor: '#444',
  },
});
