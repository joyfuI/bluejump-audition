import { Alert, Flex } from 'antd';

import type { GetVodsReviewResponse } from '@/api/getVodsReview';
import getVodsReview, { REVALIDATE } from '@/api/getVodsReview';
import ClientLayout from '@/components/ClientLayout';
import { STREAMER_LIST } from '@/constants';
import dayjs from '@/lib/dayjs';

import FilterButton from './FilterButton';
import VodCard from './VodCard';

const Page = async () => {
  const vodsReviewListPromise = STREAMER_LIST.map((item) =>
    getVodsReview(item.id),
  );
  const vodsReviewList = (await Promise.all(vodsReviewListPromise))
    .reduce<GetVodsReviewResponse['data']>(
      (prev, curr) => prev.concat(curr.data),
      [],
    )
    .toSorted((a, b) => {
      const aDay = dayjs(a.reg_date, 'YYYY-MM-DD HH:mm:ss');
      const bDay = dayjs(b.reg_date, 'YYYY-MM-DD HH:mm:ss');
      return bDay.valueOf() - aDay.valueOf();
    });

  return (
    <ClientLayout refreshDelay={REVALIDATE * 1000} selectedKey="review">
      <Alert
        style={{ marginBottom: 24 }}
        title="스트리머별 첫 번째 페이지만 불러옵니다."
        type="info"
      />
      <Flex gap="small" wrap>
        {vodsReviewList.map((item) => (
          <VodCard data={item} key={item.title_no} />
        ))}
      </Flex>
      <FilterButton />
    </ClientLayout>
  );
};

export default Page;
