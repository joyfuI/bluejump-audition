import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';

import getHomeBroad, {
  REVALIDATE as HOME_BROAD_REVALIDATE,
} from '@/api/getHomeBroad';
import getStationInfo, {
  REVALIDATE as STATION_INFO_REVALIDATE,
} from '@/api/getStationInfo';
import { STREAMER_LIST } from '@/constants';
import dayjs from '@/lib/dayjs';

const useLiveQuery = () => {
  const results1 = useQueries({
    queries: STREAMER_LIST.map((item) => ({
      queryKey: ['getStationInfo', item.id],
      queryFn: () => getStationInfo(item.id),
      staleTime: STATION_INFO_REVALIDATE * 1000,
      refetchInterval: STATION_INFO_REVALIDATE * 1000,
    })),
  });
  const results2 = useQueries({
    queries: STREAMER_LIST.map((item) => ({
      queryKey: ['getHomeBroad', item.id],
      queryFn: () => getHomeBroad(item.id),
      staleTime: HOME_BROAD_REVALIDATE * 1000,
      refetchInterval: HOME_BROAD_REVALIDATE * 1000,
    })),
  });

  const data = useMemo(
    () =>
      STREAMER_LIST.values()
        .map((_item, index) => ({
          ...results1[index].data,
          broad: results2[index].data ?? null,
        }))
        .filter(
          (_item, index) =>
            results1[index].isFetched && results2[index].isFetched,
        )
        .toArray()
        .toSorted((a, b) => {
          const aDay = dayjs(a.station?.broadStart, 'YYYY-MM-DD HH:mm:ss');
          const bDay = dayjs(b.station?.broadStart, 'YYYY-MM-DD HH:mm:ss');
          if (a.broad && !b.broad) {
            return -1;
          }
          if (!a.broad && b.broad) {
            return 1;
          }
          return bDay.valueOf() - aDay.valueOf();
        }), // 마지막 방송 시작 시간 순으로 정렬
    [results1, results2],
  );

  return useMemo(() => ({ ...results1[0], data }), [data, results1[0]]);
};

export default useLiveQuery;
