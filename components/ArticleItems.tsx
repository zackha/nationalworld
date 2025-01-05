import { useEffect, memo } from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { decodeHTML } from 'entities';
import type { NewsItemWp } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import styles from '@/styles/styles';
import { categoriesData } from '@/services/apiWp';
dayjs.extend(relativeTime);

export const ArticleOne = memo((item: NewsItemWp) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Image source={item.image} style={styles.articleOneImage} />
      <View style={styles.articleOneContent}>
        <Text style={styles.articleOneTitle}>{decodeHTML(item.title)}</Text>
        <Text style={styles.articleDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
        <View style={styles.articleMetaInfo}>
          <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
          <View style={styles.articleMetaInfoDivider} />
          <Text style={styles.articleMetaInfoText}>{item.categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
        </View>
      </View>
    </Animated.View>
  );
});

export const ArticleTwo = memo((item: NewsItemWp) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.articleTwoContainer, animatedStyle]}>
      <Image source={item.image} style={styles.articleTwoImage} />
      <View style={styles.articleTwoContent}>
        <Text style={styles.articleTitle}>{decodeHTML(item.title)}</Text>
        <View style={styles.articleMetaInfo}>
          <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
          <View style={styles.articleMetaInfoDivider} />
          <Text style={styles.articleMetaInfoText}>{item.categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
        </View>
      </View>
    </Animated.View>
  );
});

export const ArticleThree = memo((item: NewsItemWp) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.articleThreeContainer, animatedStyle]}>
      <Text style={styles.articleTitle}>{decodeHTML(item.title)}</Text>
      <Text style={styles.articleDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
      <View style={styles.articleMetaInfo}>
        <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
        <View style={styles.articleMetaInfoDivider} />
        <Text style={styles.articleMetaInfoText}>{item.categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
      </View>
    </Animated.View>
  );
});

export const ArticleFour = memo((item: NewsItemWp) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.articleThreeContainer, animatedStyle]}>
      <Image source={item.image} style={styles.articleOneImage} />
      <View style={styles.articleTwoContent}>
        <Text style={styles.articleTitle}>{decodeHTML(item.title)}</Text>
        <Text style={styles.articleDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
        <View style={styles.articleMetaInfo}>
          <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
          <View style={styles.articleMetaInfoDivider} />
          <Text style={styles.articleMetaInfoText}>{item.categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
        </View>
      </View>
    </Animated.View>
  );
});

export const ArticleFive = memo((item: NewsItemWp) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.articleThreeContainer, animatedStyle]}>
      <View style={styles.articleFourContent}>
        <Text style={styles.articleTitle}>{decodeHTML(item.title)}</Text>
        <Image source={item.image} style={styles.articleFourImage} />
      </View>
      <Text style={styles.articleDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
      <View style={styles.articleMetaInfo}>
        <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
        <View style={styles.articleMetaInfoDivider} />
        <Text style={styles.articleMetaInfoText}>{item.categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
      </View>
    </Animated.View>
  );
});
