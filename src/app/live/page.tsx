import { Flex } from 'antd';

import getHomeBroad from '@/api/getHomeBroad';
import getStationInfo, { REVALIDATE } from '@/api/getStationInfo';
import ClientLayout from '@/components/ClientLayout';
import { STREAMER_LIST } from '@/constants';
import dayjs from '@/lib/dayjs';

import LiveCard from './LiveCard';
import MultiViewButton from './MultiViewButton';

const Page = async () => {
  const stationInfoListPromise = STREAMER_LIST.map(
    async (item) =>
      [await getStationInfo(item.id), await getHomeBroad(item.id)] as const,
  );
  const stationInfoList = (await Promise.all(stationInfoListPromise)).toSorted(
    (a, b) => {
      const aDay = dayjs(a[0].station.broadStart, 'YYYY-MM-DD HH:mm:ss');
      const bDay = dayjs(b[0].station.broadStart, 'YYYY-MM-DD HH:mm:ss');
      if (a[1] && !b[1]) {
        return -1;
      }
      if (!a[1] && b[1]) {
        return 1;
      }
      return bDay.valueOf() - aDay.valueOf();
    },
  );

  return (
    <ClientLayout refreshDelay={REVALIDATE * 1000} selectedKey="live">
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

export default Page;
