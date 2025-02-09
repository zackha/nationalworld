import { useEffect, memo } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Image } from 'expo-image';
import { decodeHTML } from 'entities';
import type { NewsItemWp } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import styles from '@/styles/styles';
import { categoriesData } from '@/services/apiWp';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
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
        <Text style={styles.articleOneDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
        <View style={styles.articleOneMetaInfo}>
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
        <Text style={styles.articleTwoTitle}>{decodeHTML(item.title)}</Text>
        <View style={styles.articleTwoMetaInfo}>
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
      <Text style={styles.articleThreeTitle}>{decodeHTML(item.title)}</Text>
      <Text style={styles.articleThreeDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
      <View style={styles.articleThreeMetaInfo}>
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
    <Animated.View style={[styles.articleFourContainer, animatedStyle]}>
      <Image source={item.image} style={styles.articleFourImage} />
      <View style={styles.articleFourContent}>
        <Text style={styles.articleFourTitle}>{decodeHTML(item.title)}</Text>
        <Text style={styles.articleFourDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
        <View style={styles.articleFourMetaInfo}>
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
    <Animated.View style={[styles.articleFiveContainer, animatedStyle]}>
      <View style={styles.articleFiveContent}>
        <Text style={styles.articleFiveTitle}>{decodeHTML(item.title)}</Text>
        <Image source={item.image} style={styles.articleFiveImage} />
      </View>
      <Text style={styles.articleFiveDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
      <View style={styles.articleFiveMetaInfo}>
        <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
        <View style={styles.articleMetaInfoDivider} />
        <Text style={styles.articleMetaInfoText}>{item.categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
      </View>
    </Animated.View>
  );
});

export const CustomArticle = memo(({ item, isFirst }: { item: NewsItemWp; isFirst: boolean }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  return (
    <Animated.View style={[styles.customArticleItem, isFirst && { marginLeft: 14 }, animatedStyle]}>
      <Link
        href={{
          pathname: '/news/[id]',
          params: { id: item.guid },
        }}>
        <ImageBackground source={{ uri: item.image }} style={styles.customArticleImage}>
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']} style={styles.customArticleGradient} />
          <View style={styles.customArticleContent}>
            <Text style={styles.customArticleTitle}>{decodeHTML(item.title)}</Text>
            <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
          </View>
        </ImageBackground>
      </Link>
    </Animated.View>
  );
});
