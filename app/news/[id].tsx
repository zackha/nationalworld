import { ThemedView } from '@/components/ThemedView';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { decodeHTML } from 'entities';
import { categoriesData } from '@/services/apiWp';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default function NewsDetailPage() {
  const { data } = useLocalSearchParams();
  const newsItem = typeof data === 'string' ? JSON.parse(data) : {};

  console.log('newsItem', JSON.stringify(newsItem));
  return (
    <ThemedView>
      <View style={{ flex: 1, backgroundColor: '#121212', padding: 16 }}>
        {/* Geri Butonu */}
        <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={{ color: 'white', fontSize: 16, marginLeft: 8 }}>Geri</Text>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Haber Görseli */}
          {newsItem?.image && <Image source={{ uri: newsItem.image }} style={{ width: '100%', height: 220, borderRadius: 10, marginBottom: 16 }} resizeMode="cover" />}

          {/* Haber Başlığı */}
          {newsItem?.title && <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', marginBottom: 8 }}>{decodeHTML(newsItem.title)}</Text>}

          {/* Haber Tarihi */}
          {newsItem?.pubDate && <Text style={{ fontSize: 14, color: '#AAAAAA', marginBottom: 12 }}>{dayjs(newsItem.pubDate).fromNow()}</Text>}
          {newsItem?.categories && (
            <Text style={{ fontSize: 14, color: '#AAAAAA', marginBottom: 12 }}>
              {newsItem.categories.map((id: number) => categoriesData.find(cat => cat.id === id)?.name).join(', ')}
            </Text>
          )}

          {/* Haber İçeriği */}
          {newsItem?.content && <Text style={{ fontSize: 16, color: 'white', lineHeight: 24 }}>{decodeHTML(newsItem.content)}</Text>}
        </ScrollView>
      </View>
    </ThemedView>
  );
}
