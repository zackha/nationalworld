import { useEffect, memo } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { decodeHTML } from 'entities';
import type { NewsItemWp } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import styles from '@/styles/styles';
import { categoriesData } from '@/services/apiWp';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import useBookmarks from '@/hooks/useBookmarks';

dayjs.extend(relativeTime);

export const ArticleOne = memo((item: NewsItemWp) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePress = () => {
    router.push({
      pathname: '/news/[id]',
      params: { id: item.guid, data: JSON.stringify(item) },
    });
  };

  const handleToggleBookmark = () => toggleBookmark(item);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={item.image} style={styles.articleOneImage} />
        <View style={styles.articleOneContent}>
          <Text style={styles.articleOneTitle}>{decodeHTML(item.title)}</Text>
          <Text style={styles.articleOneDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={styles.articleOneMetaInfo}>
              <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
              <View style={styles.articleMetaInfoDivider} />
              <Text style={styles.articleMetaInfoText}>{item.categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
            </View>
            <TouchableOpacity onPress={handleToggleBookmark} style={{ paddingTop: 10, paddingBottom: 2, paddingLeft: 10 }}>
              <IconSymbol name={isBookmarked(item.guid) ? 'bookmark.fill' : 'bookmark'} size={16} color={isBookmarked(item.guid) ? '#fff' : '#666'} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

export const ArticleTwo = memo((item: NewsItemWp) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePress = () => {
    router.push({
      pathname: '/news/[id]',
      params: { id: item.guid, data: JSON.stringify(item) },
    });
  };

  const handleToggleBookmark = () => toggleBookmark(item);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity onPress={handlePress} style={styles.articleTwoContainer}>
        <Image source={item.image} style={styles.articleTwoImage} />
        <View style={styles.articleTwoContent}>
          <Text style={styles.articleTwoTitle}>{decodeHTML(item.title)}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={styles.articleTwoMetaInfo}>
              <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
              <View style={styles.articleMetaInfoDivider} />
              <Text style={styles.articleMetaInfoText} numberOfLines={1} ellipsizeMode="tail">
                {item.categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}
              </Text>
            </View>
            <TouchableOpacity onPress={handleToggleBookmark} style={{ paddingTop: 8, paddingLeft: 10 }}>
              <IconSymbol name={isBookmarked(item.guid) ? 'bookmark.fill' : 'bookmark'} size={16} color={isBookmarked(item.guid) ? '#fff' : '#666'} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

export const ArticleThree = memo((item: NewsItemWp) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePress = () => {
    router.push({
      pathname: '/news/[id]',
      params: { id: item.guid, data: JSON.stringify(item) },
    });
  };

  const handleToggleBookmark = () => toggleBookmark(item);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity onPress={handlePress} style={styles.articleThreeContainer}>
        <Text style={styles.articleThreeTitle}>{decodeHTML(item.title)}</Text>
        <Text style={styles.articleThreeDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={styles.articleThreeMetaInfo}>
            <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
            <View style={styles.articleMetaInfoDivider} />
            <Text style={styles.articleMetaInfoText}>{item.categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
          </View>
          <TouchableOpacity onPress={handleToggleBookmark} style={{ paddingTop: 8, paddingLeft: 10 }}>
            <IconSymbol name={isBookmarked(item.guid) ? 'bookmark.fill' : 'bookmark'} size={16} color={isBookmarked(item.guid) ? '#fff' : '#666'} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

export const ArticleFour = memo((item: NewsItemWp) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePress = () => {
    router.push({
      pathname: '/news/[id]',
      params: { id: item.guid, data: JSON.stringify(item) },
    });
  };

  const handleToggleBookmark = () => toggleBookmark(item);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity onPress={handlePress} style={styles.articleFourContainer}>
        <Image source={item.image} style={styles.articleFourImage} />
        <View style={styles.articleFourContent}>
          <Text style={styles.articleFourTitle}>{decodeHTML(item.title)}</Text>
          <Text style={styles.articleFourDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={styles.articleFourMetaInfo}>
              <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
              <View style={styles.articleMetaInfoDivider} />
              <Text style={styles.articleMetaInfoText}>{item.categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
            </View>
            <TouchableOpacity onPress={handleToggleBookmark} style={{ paddingTop: 16, paddingLeft: 10 }}>
              <IconSymbol name={isBookmarked(item.guid) ? 'bookmark.fill' : 'bookmark'} size={16} color={isBookmarked(item.guid) ? '#fff' : '#666'} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

export const ArticleFive = memo((item: NewsItemWp) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePress = () => {
    router.push({
      pathname: '/news/[id]',
      params: { id: item.guid, data: JSON.stringify(item) },
    });
  };

  const handleToggleBookmark = () => toggleBookmark(item);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity onPress={handlePress} style={styles.articleFiveContainer}>
        <View style={styles.articleFiveContent}>
          <Text style={styles.articleFiveTitle}>{decodeHTML(item.title)}</Text>
          <Image source={item.image} style={styles.articleFiveImage} />
        </View>
        <Text style={styles.articleFiveDescription}>{decodeHTML(item.description.replace(/<\/?[^>]+(>|$)/g, '').trim())}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={styles.articleFiveMetaInfo}>
            <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
            <View style={styles.articleMetaInfoDivider} />
            <Text style={styles.articleMetaInfoText}>{item.categories.map(id => categoriesData.find(cat => cat.id === id)?.name).join(', ')}</Text>
          </View>
          <TouchableOpacity onPress={handleToggleBookmark} style={{ paddingTop: 18, paddingLeft: 10 }}>
            <IconSymbol name={isBookmarked(item.guid) ? 'bookmark.fill' : 'bookmark'} size={16} color={isBookmarked(item.guid) ? '#fff' : '#666'} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

export const CustomArticle = memo(({ item, isFirst }: { item: NewsItemWp; isFirst: boolean }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePress = () => {
    router.push({
      pathname: '/news/[id]',
      params: { id: item.guid, data: JSON.stringify(item) },
    });
  };

  const handleToggleBookmark = () => toggleBookmark(item);

  return (
    <Animated.View style={[styles.customArticleItem, isFirst && { marginLeft: 14 }, animatedStyle]}>
      <TouchableOpacity onPress={handlePress}>
        <ImageBackground source={{ uri: item.image }} style={styles.customArticleImage}>
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']} style={styles.customArticleGradient} />
          <View style={styles.customArticleContent}>
            <Text style={styles.customArticleTitle}>{decodeHTML(item.title)}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.articleMetaInfoText}>{dayjs(item.pubDate).fromNow()}</Text>
              <TouchableOpacity onPress={handleToggleBookmark} style={{ paddingLeft: 10 }}>
                <IconSymbol name={isBookmarked(item.guid) ? 'bookmark.fill' : 'bookmark'} size={16} color={isBookmarked(item.guid) ? '#fff' : '#666'} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
});
