'use client';
import { Flex } from 'antd';

import ClientLayout from '@/components/ClientLayout';

import useLiveQuery from './hooks/useLiveQuery';
import LiveCard from './LiveCard';
import MultiViewButton from './MultiViewButton';

const Page = () => {
  const { data } = useLiveQuery();

  return (
    <ClientLayout selectedKey="live">
      <Flex gap="small" wrap>
        {data.map((item, index) => (
          <LiveCard data={item} key={item.station?.stationNo ?? index} />
        ))}
      </Flex>
      <MultiViewButton data={data} />
    </ClientLayout>
  );
};

export default Page;
