import { ArticleFive } from '@/components/ArticleItems';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text, View, TouchableOpacity } from 'react-native';
import type { NewsItemWp } from '@/types';
import { useNavigation } from '@react-navigation/native';

export default function BookmarkScreen() {
  const navigation = useNavigation();
  const items = false;

  const item: NewsItemWp[] = [
    {
      id: 336270,
      pubDate: '2024-12-31T10:37:44',
      guid: 'https://cumbriacrack.com/?p=336270',
      title: 'Channel migrants: The real reason so many are fleeing Vietnam',
      description: 'More Vietnamese attemteted small-boat crossing in early 2024 than any other nationality - h-what makes them risk this dangerous journey?',
      categories: [20],
      image: 'https://ichef.bbci.co.uk/news/320/cpsprodpb/7b93/live/09527390-b7ca-11ef-aff0-072ce821b6ab.png.webp',
    },
    {
      id: 336271,
      pubDate: '2024-12-31T10:37:44',
      guid: 'https://cumbriacrack.com/?p=336270',
      title: 'Channel migrants: The real reason so many are fleeing Vietnam',
      description: 'More Vietnamese attemteted small-boat crossing in early 2024 than any other nationality - h-what makes them risk this dangerous journey?',
      categories: [20],
      image: 'https://ichef.bbci.co.uk/news/320/cpsprodpb/7b93/live/09527390-b7ca-11ef-aff0-072ce821b6ab.png.webp',
    },
  ];
  return (
    <ThemedView>
      <View style={{ paddingHorizontal: 12, paddingTop: 12, gap: 6 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <IconSymbol name="arrow.backward" size={22} color="white" />
          <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 16 }}>Back</Text>
        </TouchableOpacity>
        <Text style={{ color: 'white', fontFamily: 'BBCReithSerifBd', fontSize: 34, backgroundColor: '' }}>Saved items</Text>
      </View>
      {items ? (
        <View style={{ flex: 1 }}>
          {item.map((newsItem, index) => (
            <ArticleFive key={index} {...newsItem} />
          ))}
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <IconSymbol name="bookmark.circle.fill" size={58} color="white" />
          <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 18, textAlign: 'center' }}>You don't currently have{'\n'}any saved items.</Text>
        </View>
      )}
    </ThemedView>
  );
}
