import { XMLParser } from 'fast-xml-parser';
import type { NewsItem } from '@/types';

const API_URL = 'https://www.nationalworld.com/rss';

export const fetchNews = async (): Promise<NewsItem[]> => {
  const response = await fetch(API_URL);
  const xmlData = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
  });
  const parsedData = parser.parse(xmlData);

  const newsItems: NewsItem[] = parsedData.rss.channel.item.map((item: any) => ({
    title: item.title,
    link: item.link,
    description: item.description,
    pubDate: item.pubDate,
    guid: item.guid?.['#text'],
    creator: item['dc:creator'],
    categories: Array.isArray(item.category) ? item.category : [item.category].filter(Boolean),
    image: item['media:content']?.['@_url'],
  }));

  return newsItems;
};
