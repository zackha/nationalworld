import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/dimensions';

const styles = StyleSheet.create({
  articleOneImage: {
    width: '100%',
    height: hp(27),
    backgroundColor: '#262626',
  },
  articleOneContent: {
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
    height: 14,
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
    marginHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  seeMoreText: {
    fontFamily: 'BBCReithSerifBd',
    color: 'white',
    fontSize: 16,
    lineHeight: 18,
  },

  customArticleContainer: {
    backgroundColor: '#151618',
    paddingVertical: 14,
    gap: 14,
    borderTopWidth: 6,
    borderTopColor: '#262626',
  },
  customArticleItem: {
    marginRight: 14,
    width: wp(55),
  },
  customArticleImage: {
    width: '100%',
    height: hp(40),
    backgroundColor: '#262626',
    justifyContent: 'flex-end',
  },
  customArticleSeeMoreButton: {
    backgroundColor: '#262626',
    height: hp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  customArticleGradient: {
    width: '100%',
    height: '65%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  customArticleContent: {
    padding: 14,
    gap: 6,
  },
  customArticleTitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'BBCReithSerifMd',
    letterSpacing: -0.8,
  },
});

export default styles;
