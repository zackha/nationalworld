export type NewsItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  creator: string;
  categories: string[];
  image: string;
};

export interface Props {
  item: NewsItem;
}
