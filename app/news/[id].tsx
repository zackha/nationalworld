import React, { useState, useRef } from 'react';
import { View, Text, Animated, StyleSheet, useWindowDimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { decodeHTML } from 'entities';
import { categoriesData } from '@/services/apiWp';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { HeaderThree } from '@/components/Header';

dayjs.extend(relativeTime);

export default function NewsDetailPage() {
  const HEADER_HEIGHT = 40;
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

  const systemFonts = [...defaultSystemFonts, 'BBCReithSerifRg'];

  const tagsStyles = {
    body: { paddingHorizontal: 16, color: 'white', fontFamily: 'BBCReithSerifRg' },
    p: { fontSize: 16, letterSpacing: -0.1, lineHeight: 26, marginVertical: 9 },
    figcaption: { color: '#bbb', fontSize: 12, lineHeight: 28 },
    img: { backgroundColor: '#262626' },
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
          <HeaderThree />
        </Animated.View>

        <Animated.ScrollView style={styles.scrollView} onScroll={handleScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={{ paddingHorizontal: 16, paddingTop: 32, gap: 24 }}>
              {newsItem?.title && <Text style={styles.title}>{decodeHTML(newsItem.title)}</Text>}
              {newsItem?.pubDate && <Text style={styles.date}>{dayjs(newsItem.pubDate).fromNow()}</Text>}
            </View>
            {newsItem?.content && <RenderHtml contentWidth={width} source={{ html: newsItem.content }} tagsStyles={tagsStyles} systemFonts={systemFonts} />}
            {newsItem?.categories && (
              <View style={styles.categoriesContainer}>
                {newsItem.categories
                  .map((id: number) => categoriesData.find(cat => cat.id === id)?.name)
                  .map((name: string, index: number) => (
                    <Text key={index} style={styles.categoryTag}>
                      {name}
                    </Text>
                  ))}
              </View>
            )}
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
    paddingHorizontal: 16,
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
    marginBottom: -40,
  },
  content: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'BBCReithSerifMd',
    fontSize: 28,
    letterSpacing: -0.8,
    lineHeight: 36,
    color: 'white',
  },
  date: {
    fontFamily: 'BBCReithSansRg',
    fontSize: 12,
    color: '#ddd',
  },
  categoriesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 10,
  },
  categoryTag: {
    backgroundColor: '#212224',
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#fff',
  },
});
