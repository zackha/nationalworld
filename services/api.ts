import type { NewsItem } from '@/types';

const API_URL = 'https://www.nationalworld.com/rss';

const parseItem = (item: string): NewsItem => {
  const getValue = (regex: RegExp, defaultValue: string) => regex.exec(item)?.[1] || defaultValue;

  return {
    title: getValue(/<title><!\[CDATA\[(.*?)\]\]><\/title>/, 'Untitled'),
    link: getValue(/<link>(.*?)<\/link>/, '#'),
    description: getValue(/<description><!\[CDATA\[(.*?)\]\]><\/description>/, 'No description available.').replace(/<[^>]*>/g, ''),
    pubDate: getValue(/<pubDate>(.*?)<\/pubDate>/, new Date().toISOString()),
    mediaUrl: getValue(/<media:content url="(.*?)"/, ''),
    mediaCredit: getValue(/<media:credit>(.*?)<\/media:credit>/, 'Unknown'),
    creator: getValue(/<dc:creator><!\[CDATA\[(.*?)\]\]><\/dc:creator>/, 'Anonymous'),
    category: getValue(/<category><!\[CDATA\[(.*?)\]\]><\/category>/, 'General'),
  };
};

export const fetchNews = async (): Promise<NewsItem[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const text = await response.text();
  const items = text.match(/<item>(.*?)<\/item>/g) || [];
  return items.map(parseItem);
};
