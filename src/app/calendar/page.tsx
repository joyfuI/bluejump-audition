import dayjs from 'dayjs';
import type { SearchParams } from 'nuqs/server';
import { createLoader, parseAsString } from 'nuqs/server';

import type { GetCalendarResponse } from '@/api/getCalendar';
import getCalendar from '@/api/getCalendar';
import ClientCalendar from '@/components/ClientCalendar';
import ClientLayout from '@/components/ClientLayout';
import { STREAMER_LIST } from '@/constants';

export type PageProps = { searchParams: Promise<SearchParams> };

const coordinatesSearchParams = {
  date: parseAsString.withDefault(dayjs().format('YYYY-MM-DD')),
};
const loadSearchParams = createLoader(coordinatesSearchParams);

const Home = async ({ searchParams }: PageProps) => {
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
    <ClientLayout selectedKey="calendar">
      <ClientCalendar data={calendarList} />
    </ClientLayout>
  );
};

export default Home;
