'use client';
import { Avatar, Badge, Card, Typography } from 'antd';
import Image from 'next/image';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';

import type { GetVodsReviewResponse } from '@/api/getVodsReview';
import { STREAMER_LIST } from '@/constants';
import dayjs from '@/lib/dayjs';
import durationHumanize from '@/utils/durationHumanize';

export type VodCardProps = { data: GetVodsReviewResponse['data'][0] };

const VodCard = ({ data }: VodCardProps) => {
  const [userId] = useQueryState(
    'userId',
    parseAsArrayOf(parseAsString).withDefault(
      STREAMER_LIST.map((item) => item.id),
    ),
  );

  if (!userId.includes(data.user_id)) {
    return null;
  }

  return (
    <Card
      cover={
        <a
          href={`https://vod.sooplive.co.kr/player/${data.title_no}`}
          rel="noreferrer"
          style={{ position: 'relative', overflow: 'hidden' }}
          target="_blank"
        >
          <Image
            alt={data.title_name}
            draggable={false}
            height={270}
            loading="lazy"
            src={`https:${data.ucc.thumb}`}
            style={{ display: 'block', width: '100%', height: 'auto' }}
            unoptimized
            width={480}
          />
          <Badge
            count={durationHumanize(data.ucc.total_file_duration)}
            styles={{ root: { position: 'absolute', right: 4, bottom: 4 } }}
            title=""
          />
        </a>
      }
      styles={{
        root: { display: 'flex', width: 300, flexDirection: 'column' },
        actions: { marginTop: 'auto' },
      }}
    >
      <Card.Meta
        avatar={<Avatar src={data.profile_image} />}
        description={
          <a
            href={`https://www.sooplive.co.kr/station/${data.user_id}`}
            rel="noreferrer"
            style={{ color: 'inherit' }}
            target="_blank"
          >
            {data.user_nick}
          </a>
        }
        title={
          <a
            href={`https://vod.sooplive.co.kr/player/${data.title_no}`}
            rel="noreferrer"
            style={{ color: 'inherit' }}
            target="_blank"
            title={data.title_name}
          >
            {data.title_name}
          </a>
        }
      />
      <Typography.Text
        style={{ display: 'block', marginTop: 12, textAlign: 'end' }}
        type="warning"
      >
        {dayjs(data.reg_date).format('L LTS')}
      </Typography.Text>
    </Card>
  );
};

export default VodCard;
