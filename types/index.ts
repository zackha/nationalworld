export interface NewsItemWp {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  creator: number;
  categories: number[];
  image: string;
}

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

export interface CategoryData {
  id: number;
  name: string;
}

export interface AllCategoryNews {
  categoryName: string;
  news: NewsItemWp[];
}

export interface LoadingState {
  [key: string]: boolean;
}

export interface NewsDataState {
  [key: string]: NewsItemWp[] | AllCategoryNews[];
}

export interface PaginationState {
  [key: string]: number;
}

export interface HasMoreState {
  [key: string]: boolean;
}
