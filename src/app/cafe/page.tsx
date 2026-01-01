import getCafeArticles from '@/api/getCafeArticles';
import ClientLayout from '@/components/ClientLayout';

import type { ArticleListProps } from './ArticleList';
import ArticleList from './ArticleList';

const Home = async () => {
  const articleList = (await getCafeArticles()).result.articleList.map(
    (item) => item.item,
  );

  const data: ArticleListProps['data'] = articleList.map((item) => ({
    key: item.articleId,
    href: `https://cafe.naver.com/bluejumpofficial/${item.articleId}`,
    title: item.subject,
    nickName: item.writerInfo.nickName,
    summary: item.summary,
    thumb: item.representImage,
    timestamp: item.writeDateTimestamp,
  }));

  return (
    <ClientLayout selectedKey="cafe">
      <ArticleList data={data} />
    </ClientLayout>
  );
};

export default Home;
