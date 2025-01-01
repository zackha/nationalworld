import type { NewsItemWp, WPPost, CategoryData, AllCategoryNews } from '@/types';
import wretch from 'wretch';

const API_WP = 'http://172.20.10.2:3001';
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
export const extractImageUrl = (description: string): string | null => {
  const match = description.match(/https?:\/\/[^\s]+(?=\s768w|748w)|<img[^>]+src="([^"]+)"/);
  return match ? match[1] || match[0] : null;
};

export const categoriesData: CategoryData[] = [
  { id: 0, name: 'All' },
  { id: 20, name: 'News' },
  { id: 2, name: 'Headlines' },
  { id: 7, name: 'Sport' },
  { id: 33246, name: 'Business Crack' },
  { id: 33242, name: 'Review' },
  { id: 33187, name: 'Sponsored' },
  { id: 33230, name: 'Cumbria Food Awards' },
  { id: 33235, name: 'Cumbria Cat' },
  { id: 51, name: "What's on" },
  { id: 8458, name: 'Carlisle United' },
  { id: 33247, name: 'General Election 2024' },
  { id: 33231, name: 'Fell Foodie' },
  { id: 33236, name: "Walshie's Week" },
];

export const fetchNews = async (page: number = 1, categoryId: number = 20, perPage: number = 21): Promise<NewsItemWp[]> => {
  return api
    .url(`/wp-json/wp/v2/posts?order_by=date&per_page=${perPage}&page=${page}&categories=${categoryId}`)
    .get()
    .json((result: WPPost[]) =>
      result.map(item => ({
        title: item.title.rendered,
        link: item.link,
        description: item.excerpt.rendered,
        pubDate: item.date,
        guid: `${item.id}`, // Benzersiz key sağlamak için string olarak dönüştürüldü
        creator: item.author,
        categories: item.categories,
        image: extractImageUrl(item.content.rendered),
      }))
    );
};

export const fetchAllCategoryNews = async (): Promise<AllCategoryNews[]> => {
  const predefinedCategories = [
    { id: 7, name: 'Sport', perPage: 2 },
    { id: 33246, name: 'Business Crack', perPage: 2 },
  ];

  const fetchPromises = predefinedCategories.map(async category => {
    const news = await fetchNews(1, category.id, category.perPage);
    return { categoryName: category.name, news };
  });

  return await Promise.all(fetchPromises);
};
