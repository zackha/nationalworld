import React, { useState, useRef } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { View, Text, Animated, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { decodeHTML } from 'entities';
import { categoriesData } from '@/services/apiWp';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import RenderHtml from 'react-native-render-html';

export default function SimpleCollapsibleHeader() {
  const [scrollY] = useState(new Animated.Value(0));
  const lastOffsetY = useRef(0);
  const headerVisible = useRef(true);

  const HEADER_HEIGHT = 60;
  const SCROLL_THRESHOLD = 3;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const handleScroll = (event: any) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const diff = currentOffsetY - lastOffsetY.current;

    if (currentOffsetY <= 0) {
      if (!headerVisible.current) {
        Animated.timing(scrollY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
        headerVisible.current = true;
      }
    } else if (diff > SCROLL_THRESHOLD) {
      if (headerVisible.current) {
        Animated.timing(scrollY, {
          toValue: HEADER_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }).start();
        headerVisible.current = false;
      }
    } else if (diff < -SCROLL_THRESHOLD) {
      if (!headerVisible.current) {
        Animated.timing(scrollY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
        headerVisible.current = true;
      }
    }

    lastOffsetY.current = currentOffsetY;
  };

  const { data } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const newsItem = typeof data === 'string' ? JSON.parse(data) : {};

  console.log('newsItem', JSON.stringify(newsItem));

  const tagsStyles = {
    p: { color: 'white' },
    figcaption: { color: 'red' },
    img: { backgroundColor: 'red' },
  };

  return (
    <ThemedView newsDetail>
      <View style={styles.container}>
        {/* Animasyonlu Header */}
        <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
            <Text style={styles.headerText}>Back</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* ScrollView */}
        <Animated.ScrollView style={styles.scrollView} onScroll={handleScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {newsItem?.title && <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', marginBottom: 8 }}>{decodeHTML(newsItem.title)}</Text>}

            {newsItem?.pubDate && <Text style={{ fontSize: 14, color: '#AAAAAA', marginBottom: 12 }}>{dayjs(newsItem.pubDate).fromNow()}</Text>}

            {newsItem?.content && <RenderHtml contentWidth={width} source={{ html: newsItem.content }} tagsStyles={tagsStyles} />}

            {newsItem?.categories && (
              <Text style={{ fontSize: 14, color: '#AAAAAA', marginBottom: 12 }}>
                {newsItem.categories.map((id: number) => categoriesData.find(cat => cat.id === id)?.name).join(', ')}
              </Text>
            )}
          </View>
        </Animated.ScrollView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  scrollView: {
    marginBottom: -60,
  },
  content: {
    paddingTop: 60,
    paddingBottom: 60,
  },
});
