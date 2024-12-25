import { View, Text, Image, StyleSheet } from 'react-native';
import { decodeHTML } from 'entities';
import type { Props } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function NewsItemComponent({ item, index }: Props & { index: number }) {
  if (index === 0) {
    return (
      <View style={styles.featuredItem}>
        <Image source={{ uri: item.image }} style={styles.featuredImage} />
        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle}>{decodeHTML(item.title)}</Text>
          <Text style={styles.featuredDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
        </View>
      </View>
    );
  } else if (index === 1 || index === 2) {
    return (
      <View style={styles.secondaryItem}>
        <Image source={{ uri: item.image }} style={styles.secondaryImage} />
        <View style={styles.secondaryContent}>
          <Text style={styles.secondaryTitle}>{decodeHTML(item.title)}</Text>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Text style={styles.timeAndCategory}>{dayjs(item.pubDate).fromNow()}</Text>
            <View style={styles.divider} />
            <Text style={styles.timeAndCategory}>World</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.simpleItem}>
        <Text style={styles.secondaryTitle}>{decodeHTML(item.title)}</Text>
        <Text style={styles.simpleDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  featuredItem: {},
  featuredImage: {
    width: '100%',
    height: 215,
  },
  featuredContent: {
    margin: 14,
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
  featuredDescription: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'BBCReithSerifRg',
  },
  secondaryItem: {
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
    gap: 14,
  },
  secondaryTitle: {
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
  simpleItem: {
    marginHorizontal: 14,
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
  timeAndCategory: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'BBCReithSansrg',
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
});
