export interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  mediaUrl: string;
  mediaCredit: string;
  creator: string;
  category: string;
}

export interface Props {
  item: NewsItem;
}
