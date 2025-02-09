import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { Text, View } from 'react-native';

export default function Page() {
  return (
    <ThemedView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
        <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 18, textAlign: 'center' }}>{JSON.stringify(useLocalSearchParams())}</Text>
      </View>
    </ThemedView>
  );
}
