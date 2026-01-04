import dayjs from 'dayjs';
import type { SearchParams } from 'nuqs/server';
import { createLoader, parseAsString } from 'nuqs/server';

import type { GetCalendarResponse } from '@/api/getCalendar';
import getCalendar, { REVALIDATE } from '@/api/getCalendar';
import ClientLayout from '@/components/ClientLayout';
import { STREAMER_LIST } from '@/constants';

import ClientCalendar from './ClientCalendar';

export type PageProps = { searchParams: Promise<SearchParams> };

const coordinatesSearchParams = {
  date: parseAsString.withDefault(dayjs().format('YYYY-MM-DD')),
};
const loadSearchParams = createLoader(coordinatesSearchParams);

const Page = async ({ searchParams }: PageProps) => {
  const { date } = await loadSearchParams(searchParams);
  const day = dayjs(date);

  const calendarListPromise = STREAMER_LIST.map((item) =>
    getCalendar(item.id, { year: day.year(), month: day.month() + 1 }),
  );
  const calendarList = (await Promise.all(calendarListPromise)).reduce<
    (GetCalendarResponse['days'][0]['events'][0] & (typeof STREAMER_LIST)[0])[]
  >(
    (prev, curr, index) =>
      prev.concat(
        curr.days.flatMap((item) =>
          item.events.map((item2) => ({ ...item2, ...STREAMER_LIST[index] })),
        ),
      ),
    [],
  );

  return (
    <ClientLayout refreshDelay={REVALIDATE * 1000} selectedKey="calendar">
      <ClientCalendar data={calendarList} />
    </ClientLayout>
  );
};

export default Page;
