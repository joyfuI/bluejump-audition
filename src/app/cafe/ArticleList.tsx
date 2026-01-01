'use client';
import { List } from 'antd';
import Image from 'next/image';

import dayjs from '@/lib/dayjs';

export type ArticleListProps = {
  data: {
    key: string | number;
    href: string;
    title: string;
    nickName: string;
    summary: string;
    thumb: string;
    timestamp: number;
  }[];
};

const ArticleList = ({ data }: ArticleListProps) => {
  return (
    <List
      dataSource={data}
      itemLayout="vertical"
      renderItem={(item) => (
        <List.Item
          extra={
            <Image
              alt={item.title}
              draggable={false}
              height={150}
              src={item.thumb}
              style={{ objectFit: 'cover' }}
              width={150}
            />
          }
          key={item.key}
        >
          <List.Item.Meta
            description={`${item.nickName} / ${dayjs(item.timestamp).format('LLL')}`}
            title={
              <a href={item.href} rel="noreferrer" target="_blank">
                {item.title}
              </a>
            }
          />
          {item.summary}
        </List.Item>
      )}
      size="large"
      style={{ maxWidth: 1280, justifySelf: 'center' }}
    />
  );
};

export default ArticleList;
