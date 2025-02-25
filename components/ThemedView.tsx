import { type ViewProps } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks/ui/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  newsDetail?: boolean;
};

export function ThemedView({ lightColor, darkColor, newsDetail, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{ flex: 1, backgroundColor, paddingBottom: newsDetail ? 60 : 30 }]} edges={newsDetail ? ['top'] : ['top', 'bottom']} {...otherProps} />
    </SafeAreaProvider>
  );
}
