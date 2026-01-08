'use client';
import { Avatar, Card, Empty, Typography } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { GetHomeBroadResponse } from '@/api/getHomeBroad';
import type { GetStationInfoResponse } from '@/api/getStationInfo';
import useInterval from '@/hooks/useInterval';
import dayjs from '@/lib/dayjs';

export type LiveCardProps = {
  data: Partial<GetStationInfoResponse> & {
    broad: GetHomeBroadResponse | null;
  };
};

const LiveCard = ({ data }: LiveCardProps) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    setImageSrc(`https://liveimg.sooplive.co.kr/h/${data.broad?.broadNo}.webp`);
  }, [data.broad?.broadNo]);

  useInterval(() => {
    setImageSrc(
      `https://liveimg.sooplive.co.kr/h/${data.broad?.broadNo}.webp?t=${Date.now()}`,
    );
  }, 10000);

  return (
    <Card
      cover={
        data.station?.userId && data.broad?.broadTitle && imageSrc ? (
          <a
            href={`https://play.sooplive.co.kr/${data.station.userId}`}
            rel="noreferrer"
            style={{ overflow: 'hidden' }}
            target="_blank"
          >
            <Image
              alt={data.broad.broadTitle}
              draggable={false}
              height={270}
              loading="lazy"
              src={imageSrc}
              style={{ display: 'block', width: '100%', height: 'auto' }}
              unoptimized
              width={480}
            />
          </a>
        ) : (
          <Empty
            description={false}
            style={{
              margin: 0,
              alignContent: 'center',
              aspectRatio: 480 / 270,
            }}
          />
        )
      }
      styles={{
        root: { display: 'flex', width: 300, flexDirection: 'column' },
        actions: { marginTop: 'auto' },
      }}
    >
      <Card.Meta
        avatar={<Avatar src={data.station?.profileImage} />}
        description={data.broad?.broadTitle ?? '방송 중이 아닙니다.'}
        title={
          <a
            href={`https://www.sooplive.co.kr/station/${data.station?.userId ?? ''}`}
            rel="noreferrer"
            style={{ color: 'inherit' }}
            target="_blank"
          >
            {data.station?.userNick}
          </a>
        }
      />
      {data.broad?.broadStart ? (
        <Typography.Text
          style={{ display: 'block', marginTop: 12, textAlign: 'end' }}
          type="warning"
        >
          방송시작: {dayjs(data.broad.broadStart).format('L LTS')}
        </Typography.Text>
      ) : null}
    </Card>
  );
};

export default LiveCard;
