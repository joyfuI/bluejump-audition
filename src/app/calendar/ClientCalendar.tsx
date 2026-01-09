'use client';
import type { CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { parseAsString, useQueryState } from 'nuqs';
import { useMemo } from 'react';

import type { GetCalendarResponse } from '@/api/getCalendar';
import type { STREAMER_LIST } from '@/constants';

import useCalendarQuery from './hooks/useCalendarQuery';

const badgeColor = {
  방송시작: '#7f7fff',
  합방: '#43cec9',
  휴방: '#ff7096',
  기타: '#acb0b9',
} as const;

const ClientCalendar = () => {
  const [date, setDate] = useQueryState(
    'date',
    parseAsString.withDefault(dayjs().format('YYYY-MM-DD')),
  );
  const day = dayjs(date, 'YYYY-MM-DD');

  const { data } = useCalendarQuery({
    year: day.year(),
    month: day.month() + 1,
  });

  const listData = useMemo(() => {
    const map = Map.groupBy<
      string,
      GetCalendarResponse['days'][0]['events'][0] & (typeof STREAMER_LIST)[0]
    >(data, (item) => item.eventDate);
    map.forEach((value, key, map) => {
      const newValue = value.toSorted((a, b) =>
        a.eventTime.localeCompare(b.eventTime),
      );
      map.set(key, newValue);
    });
    return map;
  }, [data]);

  const dateCellRender = (value: Dayjs) => (
    <ul style={{ padding: 0, listStyle: 'none' }}>
      {listData.get(value.format('YYYY-MM-DD'))?.map((item) => (
        <li key={item.idx}>
          <Badge
            color={badgeColor[item.calendarTypeName]}
            text={`${item.eventTime} | ${item.nick} | ${item.title}`}
          />
        </li>
      ))}
    </ul>
  );

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') {
      return dateCellRender(current);
    }
    return info.originNode;
  };

  const handleChange = (day: Dayjs) => {
    setDate(dayjs(day).format('YYYY-MM-DD'));
  };

  return (
    <Calendar
      cellRender={cellRender}
      onChange={handleChange}
      style={{ marginBottom: -96 }}
      value={day}
    />
  );
};

export default ClientCalendar;
