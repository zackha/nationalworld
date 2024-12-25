export type NewsItemXml = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  creator: string;
  categories: string[];
  image: string;
};

export type NewsItemWp = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  creator: number;
  categories: number[];
  image: string;
};

export interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  author: number;
  categories: number[];
  content: { rendered: string };
}

export interface Props {
  item: NewsItemWp;
}
