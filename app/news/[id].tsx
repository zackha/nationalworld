import React, { useState, useRef } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { decodeHTML } from 'entities';
import { categoriesData } from '@/services/apiWp';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import RenderHtml from 'react-native-render-html';

dayjs.extend(relativeTime);

export default function NewsDetailPage() {
  const HEADER_HEIGHT = 60;
  const SCROLL_THRESHOLD = 3;

  const [scrollY] = useState(new Animated.Value(0));
  const lastOffsetY = useRef(0);
  const headerVisible = useRef(true);

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  const handleScroll = (event: any) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const diff = currentOffsetY - lastOffsetY.current;

    if (currentOffsetY <= 0) {
      if (!headerVisible.current) {
        showHeader();
      }
    } else if (diff > SCROLL_THRESHOLD) {
      if (headerVisible.current) {
        hideHeader();
      }
    } else if (diff < -SCROLL_THRESHOLD) {
      if (!headerVisible.current) {
        showHeader();
      }
    }

    lastOffsetY.current = currentOffsetY;
  };

  const hideHeader = () => {
    Animated.timing(scrollY, {
      toValue: HEADER_HEIGHT,
      duration: 200,
      useNativeDriver: false,
    }).start();
    headerVisible.current = false;
  };

  const showHeader = () => {
    Animated.timing(scrollY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    headerVisible.current = true;
  };

  const { data } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const newsItem = typeof data === 'string' ? JSON.parse(data) : {};

  const tagsStyles = {
    p: { color: 'white' },
    figcaption: { color: 'red' },
    img: { backgroundColor: 'red' },
  };

  console.log('newsItem', JSON.stringify(newsItem));

  return (
    <ThemedView newsDetail>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.header,
            {
              transform: [{ translateY: headerTranslateY }],
              height: headerHeight,
            },
          ]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
            <Text style={styles.headerText}>Back</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.ScrollView style={styles.scrollView} onScroll={handleScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {newsItem?.title && <Text style={styles.title}>{decodeHTML(newsItem.title)}</Text>}
            {newsItem?.pubDate && <Text style={styles.date}>{dayjs(newsItem.pubDate).fromNow()}</Text>}
            {newsItem?.content && <RenderHtml contentWidth={width} source={{ html: newsItem.content }} tagsStyles={tagsStyles} />}
            {newsItem?.categories && <Text style={styles.categories}>{newsItem.categories.map((id: number) => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>}
          </View>
        </Animated.ScrollView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#000',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
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
    flex: 1,
    marginBottom: -60,
  },
  content: {
    paddingTop: 60,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 12,
  },
  categories: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 12,
  },
});
