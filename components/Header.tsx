import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Logo from '@/components/Logo';

const categories = ['All', 'News', 'Business', 'Innovation', 'Culture', 'Entertainment', 'Science', 'Health'];

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{category}</Text>
            {index < categories.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  logoContainer: {
    // backgroundColor: 'blue',
    paddingVertical: 4,
    alignItems: 'center',
    width: '100%',
    height: 40,
    color: '#fff',
  },
  categoryList: {
    // backgroundColor: 'green',
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '100%',
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
  divider: {
    height: '65%',
    width: 1,
    backgroundColor: '#444',
    marginHorizontal: 12,
  },
});
