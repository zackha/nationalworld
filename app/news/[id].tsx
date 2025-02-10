import { useEffect } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function NewsDetailPage() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <ThemedView>
      <Animated.View style={animatedStyle}>
        <Text>test</Text>
      </Animated.View>
    </ThemedView>
  );
}
