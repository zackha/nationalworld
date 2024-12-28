import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  categoryButton: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: '#555',
  },
  selectedCategoryText: {
    fontWeight: 'bold',
    color: '#000',
  },
  underline: {
    height: 2,
    backgroundColor: '#000',
    width: '100%',
    marginTop: 5,
  },
  newsList: {},
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
