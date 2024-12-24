import type { NewsItemWp, WPPost } from '@/types';
import wretch from 'wretch';

const API_WP = 'https://cumbriacrack.com';
const api = wretch(API_WP).options({
  mode: 'cors',
  credentials: 'include',
  cache: 'default',
});

//export const fetchMediaByUrl = async (mediaId: number) => {
//  return api
//    .url(`/wp-json/wp/v2/media/${mediaId}`)
//    .get()
//    .json(result => result.media_details?.sizes?.medium_large?.source_url);
//};

export const fetchNews = async (page: number = 1): Promise<NewsItemWp[]> => {
  return api
    .url(`/wp-json/wp/v2/posts?order_by=date&per_page=12&page=${page}`)
    .get()
    .json(result =>
      result.map((item: WPPost) => ({
        title: item.title.rendered,
        link: item.link,
        description: item.excerpt.rendered,
        pubDate: item.date,
        guid: item.id,
        creator: item.author,
        categories: item.categories,
        image: item.featured_media,
      }))
    );
};
