'use client';
import { QueryClientProvider, useQueries } from '@tanstack/react-query';
import { Flex } from 'antd';

import getHomeBroad, {
  REVALIDATE as HOME_BROAD_REVALIDATE,
} from '@/api/getHomeBroad';
import getStationInfo, {
  REVALIDATE as STATION_INFO_REVALIDATE,
} from '@/api/getStationInfo';
import ClientLayout from '@/components/ClientLayout';
import { STREAMER_LIST } from '@/constants';
import dayjs from '@/lib/dayjs';
import queryClient from '@/lib/queryClient';

import LiveCard from './LiveCard';
import MultiViewButton from './MultiViewButton';

const Page = () => {
  const results1 = useQueries({
    queries: STREAMER_LIST.map((item) => ({
      queryKey: ['getStationInfo', item.id],
      queryFn: () => getStationInfo(item.id),
      placeholderData: {
        station: { stationNo: item.id, userId: item.id, userNick: item.nick },
      },
      staleTime: STATION_INFO_REVALIDATE * 1000,
      refetchInterval: STATION_INFO_REVALIDATE * 1000,
    })),
  });
  const results2 = useQueries({
    queries: STREAMER_LIST.map((item) => ({
      queryKey: ['getHomeBroad', item.id],
      queryFn: () => getHomeBroad(item.id),
      placeholderData: null,
      staleTime: HOME_BROAD_REVALIDATE * 1000,
      refetchInterval: HOME_BROAD_REVALIDATE * 1000,
    })),
  });
  const stationInfoList = STREAMER_LIST.map(
    (_item, index) => [results1[index].data!, results2[index].data!] as const,
  ).toSorted((a, b) => {
    const aDay = dayjs(a[0].station.broadStart, 'YYYY-MM-DD HH:mm:ss');
    const bDay = dayjs(b[0].station.broadStart, 'YYYY-MM-DD HH:mm:ss');
    if (a[1] && !b[1]) {
      return -1;
    }
    if (!a[1] && b[1]) {
      return 1;
    }
    return bDay.valueOf() - aDay.valueOf();
  });

  return (
    <ClientLayout selectedKey="live">
      <Flex gap="small" wrap>
        {stationInfoList.map((item) => (
          <LiveCard
            broadData={item[1]}
            key={item[0].station.stationNo}
            stationData={item[0]}
          />
        ))}
      </Flex>
      <MultiViewButton data={stationInfoList} />
    </ClientLayout>
  );
};

export default () => (
  <QueryClientProvider client={queryClient}>
    <Page />
  </QueryClientProvider>
);
