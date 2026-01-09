import { useQueries } from '@tanstack/react-query';

import type { GetCalendarParams, GetCalendarResponse } from '@/api/getCalendar';
import getCalendar, { REVALIDATE } from '@/api/getCalendar';
import { STREAMER_LIST } from '@/constants';

const useCalendarQuery = (params: GetCalendarParams) => {
  return useQueries({
    queries: STREAMER_LIST.map((item) => ({
      queryKey: ['getVodsReview', item.id, params],
      queryFn: () => getCalendar(item.id, params),
      staleTime: REVALIDATE * 1000,
      refetchInterval: REVALIDATE * 1000,
    })),
    combine: (results) => ({
      ...results[0],
      data: results.reduce<
        (GetCalendarResponse['days'][0]['events'][0] &
          (typeof STREAMER_LIST)[0])[]
      >(
        (prev, curr, index) =>
          curr.data
            ? prev.concat(
                curr.data.days.flatMap((item) =>
                  item.events.map((item2) => ({
                    ...item2,
                    ...STREAMER_LIST[index],
                  })),
                ),
              )
            : prev,
        [],
      ),
    }),
  });
};

export default useCalendarQuery;
