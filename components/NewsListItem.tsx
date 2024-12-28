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
        <Image source={{ uri: item.image }} style={styles.featuredImage} />
        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle}>{decodeHTML(item.title)}</Text>
          <Text style={styles.description}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
            <View style={styles.metaInfoDivider} />
            <Text style={styles.metaInfoText}>World</Text>
          </View>
        </View>
      </View>
    );
  } else if (index === 1 || index === 2) {
    return (
      <View style={styles.secondaryContainer}>
        <Image source={{ uri: item.image }} style={styles.secondaryImage} />
        <View style={styles.secondaryContent}>
          <Text style={styles.listItemTitle}>{decodeHTML(item.title)}</Text>
          <View style={styles.metaInfo}>
            <Text style={styles.metaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
            <View style={styles.metaInfoDivider} />
            <Text style={styles.metaInfoText}>World</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.listItemContainer}>
        <Text style={styles.listItemTitle}>{decodeHTML(item.title)}</Text>
        <Text style={styles.description}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
        <View style={styles.metaInfo}>
          <Text style={styles.metaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
          <View style={styles.metaInfoDivider} />
          <Text style={styles.metaInfoText}>World</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  featuredImage: {
    width: '100%',
    height: 215,
  },
  featuredContent: {
    margin: 14,
    marginBottom: 0,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 12,
  },
  featuredTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'BBCReithSerifMd',
    letterSpacing: -0.8,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'BBCReithSerifRg',
  },
  secondaryContainer: {
    flexDirection: 'row',
    marginHorizontal: 14,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 14,
  },
  secondaryImage: {
    height: 80,
    width: '35%',
    objectFit: 'cover',
  },
  secondaryContent: {
    flex: 1,
    gap: 6,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'BBCReithSerifMd',
    letterSpacing: -0.8,
  },
  secondaryDescription: {
    fontSize: 12,
    color: '#fff',
  },
  listItemContainer: {
    marginHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 14,
    gap: 8,
  },
  simpleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  simpleDescription: {
    fontSize: 12,
    color: '#fff',
  },
  metaInfo: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  metaInfoText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'BBCReithSansrg',
  },
  metaInfoDivider: {
    height: '80%',
    width: 1,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
});
