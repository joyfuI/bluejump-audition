'use client';
import { Avatar, Card, Empty, Typography } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

import type { GetHomeBroadResponse } from '@/api/getHomeBroad';
import type { GetStationInfoResponse } from '@/api/getStationInfo';
import useInterval from '@/hooks/useInterval';
import dayjs from '@/lib/dayjs';

export type LiveCardProps = {
  stationData: GetStationInfoResponse;
  broadData?: GetHomeBroadResponse;
};

const LiveCard = ({ stationData, broadData }: LiveCardProps) => {
  const [imageSrc, setImageSrc] = useState(
    `https://liveimg.sooplive.co.kr/h/${broadData?.broadNo}.webp`,
  );

  useInterval(() => {
    setImageSrc(
      `https://liveimg.sooplive.co.kr/h/${broadData?.broadNo}.webp?t=${Date.now()}`,
    );
  }, 10000);

  return (
    <Card
      // actions={[
      //   <Button key="aaa">aaa</Button>,
      //   <Button key="bbb">bbb</Button>,
      //   <Button key="ccc">ccc</Button>,
      // ]}
      cover={
        broadData?.broadTitle ? (
          <a
            href={`https://play.sooplive.co.kr/${stationData.station.userId}`}
            style={{ overflow: 'hidden' }}
            target="_blank"
          >
            <Image
              alt={broadData.broadTitle}
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
        avatar={<Avatar src={stationData.station.profileImage} />}
        description={broadData?.broadTitle ?? '방송 중이 아닙니다.'}
        title={
          <a
            href={`https://www.sooplive.co.kr/station/${stationData.station.userId}`}
            style={{ color: 'inherit' }}
            target="_blank"
          >
            {stationData.station.userNick}
          </a>
        }
      />
      {broadData?.broadStart ? (
        <Typography.Text
          style={{ display: 'block', marginTop: 12, textAlign: 'end' }}
          type="warning"
        >
          방송시작: {dayjs(broadData.broadStart).format('L LTS')}
        </Typography.Text>
      ) : null}
    </Card>
  );
};

export default LiveCard;
