import { View, Text, Image, StyleSheet } from 'react-native';
import { decodeHTML } from 'entities';
import type { Props } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const NewsListItemComponent = ({ item, index }: Props & { index: number }) => {
  if (index === 0) {
    return (
      <View>
        <Image source={{ uri: item.image }} style={styles.articleOneImage} />
        <View style={styles.articleOneDescription}>
          <Text style={styles.articleOneTitle}>{decodeHTML(item.title)}</Text>
          <Text style={styles.articleDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
          <View style={styles.articleMetaInfo}>
            <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
            <View style={styles.articleMetaInfoDivider} />
            <Text style={styles.articleMetaInfoText}>World</Text>
          </View>
        </View>
      </View>
    );
  } else if (index >= 1 && index <= 3) {
    return (
      <View style={styles.articleTwoContainer}>
        <Image source={{ uri: item.image }} style={styles.articleTwoImage} />
        <View style={styles.articleTwoContent}>
          <Text style={styles.articleTitle}>{decodeHTML(item.title)}</Text>
          <View style={styles.articleMetaInfo}>
            <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
            <View style={styles.articleMetaInfoDivider} />
            <Text style={styles.articleMetaInfoText}>World</Text>
          </View>
        </View>
      </View>
    );
  } else if (index === 4) {
    return (
      <View style={styles.articleThreeContainer}>
        <Image source={{ uri: item.image }} style={styles.articleOneImage} />
        <View style={styles.articleTwoContent}>
          <Text style={styles.articleTitle}>{decodeHTML(item.title)}</Text>
          <Text style={styles.articleDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
          <View style={styles.articleMetaInfo}>
            <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
            <View style={styles.articleMetaInfoDivider} />
            <Text style={styles.articleMetaInfoText}>World</Text>
          </View>
        </View>
      </View>
    );
  } else if (index === 5 || index === 6) {
    return (
      <View style={styles.articleThreeContainer}>
        <Text style={styles.articleTitle}>{decodeHTML(item.title)}</Text>
        <Text style={styles.articleDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
        <View style={styles.articleMetaInfo}>
          <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
          <View style={styles.articleMetaInfoDivider} />
          <Text style={styles.articleMetaInfoText}>World</Text>
        </View>
      </View>
    );
  } else if (index >= 7 && index <= 20) {
    return (
      <View style={styles.articleThreeContainer}>
        <Image source={{ uri: item.image }} style={styles.articleOneImage} />
        <View style={styles.articleTwoContent}>
          <Text style={styles.articleTitle}>{decodeHTML(item.title)}</Text>
          <Text style={styles.articleDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
          <View style={styles.articleMetaInfo}>
            <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
            <View style={styles.articleMetaInfoDivider} />
            <Text style={styles.articleMetaInfoText}>World</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.articleThreeContainer}>
        <View style={styles.articleFourContent}>
          <Text style={styles.articleTitle}>{decodeHTML(item.title)}</Text>
          <Image source={{ uri: item.image }} style={styles.articleFourImage} />
        </View>
        <Text style={styles.articleDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
        <View style={styles.articleMetaInfo}>
          <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
          <View style={styles.articleMetaInfoDivider} />
          <Text style={styles.articleMetaInfoText}>World</Text>
        </View>
      </View>
    );
  }
};

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
});
