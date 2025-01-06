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
          <View style={{ marginHorizontal: 12, position: 'relative' }}>
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
      <FlatList
        ref={flatListRef}
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        renderItem={renderCategoryItem}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      />
    </View>
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'BBCReithSansMd',
  },
  underline: { borderBottomWidth: 2, borderBottomColor: 'transparent', position: 'absolute', bottom: -4, left: 0, right: 0 },
  underlineActive: { borderBottomColor: '#fff' },
  divider: {
    height: '80%',
    width: 1,
    backgroundColor: '#444',
  },
});
