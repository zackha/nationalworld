import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { NewsItem } from '@/types';

interface Props {
  item: NewsItem;
  onPress: (url: string) => void;
}

export function NewsItemComponent({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={() => onPress(item.link)} style={styles.container}>
      <Image source={{ uri: item.mediaUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.meta}>
          {item.creator} | {new Date(item.pubDate).toLocaleString()}
        </Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    backgroundColor: '#0f0f0f',
    shadowColor: '#111',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#444',
  },
});
