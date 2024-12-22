import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { Props } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function NewsItemComponent({ item }: Props) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.time}>{item.creator}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description.replace(/<\/?[^>]+(>|$)/g, '')}</Text>
        {item.categories.length > 0 && (
          <View style={styles.categories}>
            {item.categories.map((category, index) => (
              <Text key={index} style={styles.category}>
                # {category}
              </Text>
            ))}
          </View>
        )}
        <Text style={styles.time}>{dayjs(item.pubDate).fromNow()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#141414',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 12,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
    gap: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  categories: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  category: {
    fontSize: 12,
    color: '#999',
    backgroundColor: '#333',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 99,
  },
  time: {
    fontSize: 10,
    color: '#777',
  },
});
