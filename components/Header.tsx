import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Logo from '@/components/Logo';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import useBookmarks from '@/hooks/useBookmarks';
import type { NewsItemWp } from '@/types';

export const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
    </View>
  );
};

export const HeaderTwo = ({ title }: { title: string }) => {
  return (
    <View style={{ paddingHorizontal: 12, paddingTop: 12, gap: 6 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <IconSymbol name="arrow.backward" size={22} color="white" />
        <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 16 }}>Back</Text>
      </TouchableOpacity>
      <Text style={{ color: 'white', fontFamily: 'BBCReithSerifBd', fontSize: 34 }}>{title}</Text>
    </View>
  );
};

export const HeaderThree = ({ newsItem }: { newsItem: NewsItemWp }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const handleToggleBookmark = () => toggleBookmark(newsItem);
  return (
    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }} onPress={() => router.back()}>
        <IconSymbol name="arrow.backward" size={22} color="white" />
        <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 16 }}>Back</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        {/**<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }} onPress={() => router.back()}>
          <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 16 }}>Share</Text>
          <IconSymbol name="square.and.arrow.up" size={22} color="white" />
        </TouchableOpacity>**/}
        <TouchableOpacity onPress={handleToggleBookmark} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ color: 'white', fontFamily: 'BBCReithSansMd', fontSize: 16 }}>Save</Text>
          <IconSymbol name={isBookmarked(newsItem.guid) ? 'bookmark.fill' : 'bookmark'} size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }} onPress={() => router.back()}>
          <IconSymbol name="xmark" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  logoContainer: {
    paddingVertical: 2,
    alignItems: 'center',
    width: '100%',
    height: 42,
    color: '#fff',
  },
});
