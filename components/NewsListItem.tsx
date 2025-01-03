import type { NewsItemWp } from '@/types';
import { ArticleFive, ArticleFour, ArticleOne, ArticleThree, ArticleTwo } from '@/components/ArticleItems';
const randomRangeEnd = 1 + (Math.random() < 0.5 ? 2 : 3);

export const NewsListItemComponent = ({ item, index }: { item: NewsItemWp; index: number }) => {
  if (index === 0) {
    return <ArticleOne {...item} />;
  } else if (index > 0 && index <= randomRangeEnd) {
    return <ArticleTwo {...item} />;
  } else if (index === randomRangeEnd + 1) {
    return <ArticleFour {...item} />;
  } else if (index === randomRangeEnd + 2 || index === randomRangeEnd + 3) {
    return <ArticleThree {...item} />;
  } else if (index > randomRangeEnd + 3 && index <= 20) {
    return <ArticleFour {...item} />;
  } else {
    return <ArticleFive {...item} />;
  }
};
