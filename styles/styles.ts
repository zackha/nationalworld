import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  articleOneImage: {
    width: '100%',
    height: 215,
    backgroundColor: '#262626',
  },
  articleOneDescription: {
    margin: 14,
    marginBottom: 0,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 12,
  },
  articleOneTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'BBCReithSerifMd',
    letterSpacing: -0.8,
  },
  articleDescription: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'BBCReithSerifRg',
  },
  articleTwoContainer: {
    flexDirection: 'row',
    marginHorizontal: 14,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 14,
  },
  articleTwoImage: {
    height: 80,
    width: '35%',
    objectFit: 'cover',
    backgroundColor: '#262626',
  },
  articleTwoContent: {
    flex: 1,
    gap: 6,
  },
  articleTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'BBCReithSerifMd',
    letterSpacing: -0.8,
  },
  articleTwoDescription: {
    fontSize: 12,
    color: '#fff',
  },
  articleThreeContainer: {
    marginHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 14,
    gap: 8,
  },
  articleMetaInfo: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  articleMetaInfoText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'BBCReithSansRg',
  },
  articleMetaInfoDivider: {
    height: '80%',
    width: 1,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
  articleFourImage: {
    width: '50%',
    height: 110,
    backgroundColor: '#262626',
  },
  articleFourContent: {
    flexDirection: 'row',
    gap: 8,
  },

  seeMoreButton: {
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  seeMoreText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;
