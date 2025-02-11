import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/ui/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    BBCReithSerifMd: require('@/assets/fonts/BBCReithSerif_A_Md.ttf'),
    BBCReithSerifRg: require('@/assets/fonts/BBCReithSerif_A_Rg.ttf'),
    BBCReithSerifBd: require('@/assets/fonts/BBCReithSerif_A_Bd.ttf'),
    BBCReithSansMd: require('@/assets/fonts/BBCReithSans_A_Md.ttf'),
    BBCReithSansRg: require('@/assets/fonts/BBCReithSans_A_Rg.ttf'),
    BBCReithSansBd: require('@/assets/fonts/BBCReithSans_A_Bd.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="news/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
