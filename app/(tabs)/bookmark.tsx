import { ArticleFive } from '@/components/ArticleItems';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text, View, FlatList } from 'react-native';
import type { NewsItemWp } from '@/types';
import { HeaderTwo } from '@/components/Header';

export default function BookmarkScreen() {
  const items = true;

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
      image: 'https://ichef.bbci.co.uk/news/480/cpsprodpb/75d3/live/4caa3010-cbac-11ef-94cb-5f844ceb9e30.jpg.webp',
    },
    {
      id: 336272,
      pubDate: '2024-12-30T09:15:22',
      guid: 'https://cumbriacrack.com/?p=336272',
      title: 'New Year celebrations around the world',
      description: 'A look at how different countries are celebrating the New Year.',
      categories: [15],
      image: 'https://ichef.bbci.co.uk/ace/standard/480/cpsprodpb/528e/live/18a5dca0-cc39-11ef-9fd6-0be88a764111.jpg.webp',
    },
    {
      id: 336273,
      pubDate: '2024-12-29T08:45:10',
      guid: 'https://cumbriacrack.com/?p=336273',
      title: 'Climate change impacts on global agriculture',
      description: 'An in-depth analysis of how climate change is affecting farming practices worldwide.',
      categories: [10],
      image: 'https://ichef.bbci.co.uk/news/480/cpsprodpb/56d8/live/9f42a4a0-bece-11ef-a2ca-e99d0c9a24e3.png.webp',
    },
    {
      id: 336274,
      pubDate: '2024-12-28T07:30:00',
      guid: 'https://cumbriacrack.com/?p=336274',
      title: 'Advancements in renewable energy technology',
      description: 'Exploring the latest innovations in renewable energy sources and their potential impact.',
      categories: [5],
      image: 'https://ichef.bbci.co.uk/news/480/cpsprodpb/dd07/live/14a09f80-cc22-11ef-b733-532f7fefade3.jpg.webp',
    },
  ];
  return (
    <ThemedView>
      <HeaderTwo title="Saved items" />
      {items ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={item}
          keyExtractor={newsItem => newsItem.id.toString()}
          renderItem={({ item: newsItem }) => <ArticleFive {...newsItem} />}
          contentContainerStyle={{ paddingBottom: 18 }}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <IconSymbol name="bookmark.circle.fill" size={58} color="white" />
          <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 18, textAlign: 'center' }}>You don't currently have{'\n'}any saved items.</Text>
        </View>
      )}
    </ThemedView>
  );
}
