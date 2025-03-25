import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import type { NewsItemWp } from '@/types';

const storage = new MMKV({ id: 'bookmarks-storage' });

const getBookmarks = (): NewsItemWp[] => {
  const data = storage.getString('bookmarks');
  return data ? JSON.parse(data) : [];
};

const setBookmarks = (bookmarks: NewsItemWp[]): void => storage.set('bookmarks', JSON.stringify(bookmarks));

interface BookmarksHook {
  bookmarks: NewsItemWp[];
  toggleBookmark: (newsItem: NewsItemWp) => void;
  isBookmarked: (guid: string) => boolean;
}

const useBookmarks = (): BookmarksHook => {
  const queryClient = useQueryClient();

  const { data: bookmarks = [] } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: getBookmarks,
    initialData: getBookmarks,
    staleTime: Infinity,
  });

  const { mutate: toggleBookmark } = useMutation({
    mutationFn: (newsItem: NewsItemWp) => {
      const updated = bookmarks.some(item => item.guid === newsItem.guid) ? bookmarks.filter(item => item.guid !== newsItem.guid) : [...bookmarks, newsItem];
      setBookmarks(updated);
      return Promise.resolve(updated);
    },
    onSuccess: updated => queryClient.setQueryData(['bookmarks'], updated),
  });

  const isBookmarked = (guid: string): boolean => bookmarks.some(item => item.guid === guid);

  return { bookmarks, toggleBookmark, isBookmarked };
};

export default useBookmarks;
