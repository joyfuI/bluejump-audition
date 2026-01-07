'use client';
import { Alert, Flex } from 'antd';

import ClientLayout from '@/components/ClientLayout';

import FilterButton from './FilterButton';
import useReviewQuery from './hooks/useReviewQuery';
import VodCard from './VodCard';

const Page = () => {
  const { data } = useReviewQuery();

  return (
    <ClientLayout selectedKey="review">
      <Alert
        style={{ marginBottom: 24 }}
        title="스트리머별 첫 번째 페이지만 불러옵니다."
        type="info"
      />
      <Flex gap="small" wrap>
        {data.map((item) => (
          <VodCard data={item} key={item.title_no} />
        ))}
      </Flex>
      <FilterButton />
    </ClientLayout>
  );
};

export default Page;
