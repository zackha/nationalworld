import { type ViewProps } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks/ui/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{ flex: 1, backgroundColor, paddingBottom: 30 }]} edges={['top', 'bottom']} {...otherProps} />
    </SafeAreaProvider>
  );
}
