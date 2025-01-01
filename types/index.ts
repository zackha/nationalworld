// Haber veri tipi (WordPress)
export type NewsItemWp = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  creator: number;
  categories: number[];
  image: string | null;
};

// Haber veri tipi (WordPress API)
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

export type AllCategoryNews = {
  categoryName: string;
  news: NewsItemWp[];
};

export interface LoadingState {
  [key: string]: boolean;
}

export interface NewsDataState {
  [key: string]: NewsItemWp[];
}
