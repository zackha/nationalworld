import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Logo from '@/components/Logo';

const categories = ['All', 'News', 'Business', 'Technology', 'Sports', 'Entertainment', 'Science', 'Health'];

export function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
        {categories.map((category, index) => (
          <Text key={index} style={styles.categoryText}>
            {category}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // backgroundColor: 'pink',
    alignItems: 'center',
  },
  logoContainer: {
    paddingVertical: 4,
    // backgroundColor: 'blue',
    alignItems: 'center',
    width: '100%',
  },
  categoryList: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    // backgroundColor: 'green',
    width: '100%',
  },
  categoryText: {
    fontSize: 14,
    color: 'white',
    marginRight: 20,
    fontWeight: 'bold',
  },
});
