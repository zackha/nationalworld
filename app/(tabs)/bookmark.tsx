import { ArticleFive } from '@/components/ArticleItems';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text, View, FlatList } from 'react-native';
import { HeaderTwo } from '@/components/Header';
import useBookmarks from '@/hooks/useBookmarks';
import type { NewsItemWp } from '@/types';

export default function BookmarkScreen() {
  const { bookmarks } = useBookmarks();

  const renderItem = ({ item }: { item: NewsItemWp }) => <ArticleFive {...item} />;

  return (
    <ThemedView>
      <HeaderTwo title="Saved items" />
      {bookmarks.length > 0 ? (
        <FlatList data={bookmarks} renderItem={renderItem} keyExtractor={item => item.guid} contentContainerStyle={{ paddingBottom: 18 }} showsVerticalScrollIndicator={false} />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <IconSymbol name="bookmark.circle.fill" size={58} color="white" />
          <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 18, textAlign: 'center' }}>You don't currently have{'\n'}any saved items.</Text>
        </View>
      )}
    </ThemedView>
  );
}
