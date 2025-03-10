import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/dimensions';

const styles = StyleSheet.create({
  articleOneImage: {
    width: '100%',
    height: hp(26),
    backgroundColor: '#262626',
  },
  articleOneContent: {
    margin: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 20,
  },
  articleOneTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'BBCReithSerifMd',
    letterSpacing: -0.8,
    lineHeight: 28,
  },
  articleOneDescription: {
    paddingVertical: 2,
    fontSize: 14,
    color: '#fff',
    fontFamily: 'BBCReithSerifRg',
  },
  articleOneMetaInfo: {
    paddingTop: 10,
    paddingBottom: 2,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  articleMetaInfoText: {
    fontSize: 12,
    color: '#ddd',
    fontFamily: 'BBCReithSansRg',
  },
  articleMetaInfoDivider: {
    height: 14,
    width: 1,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
  //////////////////////////
  articleTwoContainer: {
    flexDirection: 'row',
    marginHorizontal: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 12,
    marginVertical: 2,
  },
  articleTwoImage: {
    height: hp(8),
    width: wp(32),
    objectFit: 'cover',
    backgroundColor: '#262626',
  },
  articleTwoContent: {
    flex: 1,
    gap: 6,
  },
  articleTwoTitle: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'BBCReithSerifMd',
    letterSpacing: -0.8,
    lineHeight: 22,
  },
  articleTwoMetaInfo: {
    maxWidth: '50%',
    paddingTop: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  //////////////////////////
  articleThreeContainer: {
    marginHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingTop: 14,
    paddingBottom: 10,
    gap: 8,
  },
  articleThreeTitle: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'BBCReithSerifMd',
    letterSpacing: -0.8,
    lineHeight: 22,
  },
  articleThreeDescription: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'BBCReithSerifRg',
  },
  articleThreeMetaInfo: {
    paddingTop: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  //////////////////////////
  articleFourContainer: {
    marginHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingTop: 14,
    paddingBottom: 12,
    gap: 12,
  },
  articleFourImage: {
    width: '100%',
    height: hp(24),
    backgroundColor: '#262626',
  },
  articleFourContent: {
    flex: 1,
    gap: 8,
  },
  articleFourTitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'BBCReithSerifMd',
    letterSpacing: -0.8,
    lineHeight: 22,
  },
  articleFourDescription: {
    paddingVertical: 2,
    fontSize: 14,
    color: '#fff',
    fontFamily: 'BBCReithSerifRg',
  },
  articleFourMetaInfo: {
    paddingTop: 16,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  //////////////////////////
  articleFiveContainer: {
    marginHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingTop: 24,
    paddingBottom: 12,
    gap: 4,
  },
  articleFiveContent: {
    flexDirection: 'row',
    gap: 14,
  },
  articleFiveTitle: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
    fontFamily: 'BBCReithSerifMd',
    letterSpacing: -0.8,
    lineHeight: 24,
  },
  articleFiveImage: {
    width: '48%',
    height: hp(12),
    backgroundColor: '#262626',
  },
  articleFiveDescription: {
    paddingVertical: 2,
    fontSize: 14,
    color: '#fff',
    fontFamily: 'BBCReithSerifRg',
  },
  articleFiveMetaInfo: {
    paddingTop: 18,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  //////////////////////////

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
