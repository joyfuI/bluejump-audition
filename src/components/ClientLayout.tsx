'use client';
import { ExportOutlined } from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

export type ClientLayoutProps = { children: ReactNode; selectedKey: string };

const items = [
  { key: 'live', label: <Link href="/live">라이브 모아보기</Link> },
  { key: 'review', label: <Link href="/review">다시보기 모아보기</Link> },
  { key: 'calendar', label: <Link href="/calendar">캘린더 모아보기</Link> },
  {
    key: 'cafe',
    label: (
      <a
        href="https://cafe.naver.com/bluejumpofficial"
        rel="noreferrer"
        target="_blank"
      >
        블루점프 팬카페
        <ExportOutlined style={{ marginLeft: 4 }} />
      </a>
    ),
  },
];

const ClientLayout = ({ children, selectedKey }: ClientLayoutProps) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
        <Link href="/">
          <Typography.Title level={4} style={{ margin: 0, color: 'white' }}>
            블루점프 4기 오디션
          </Typography.Title>
        </Link>
        <Menu
          items={items}
          mode="horizontal"
          selectedKeys={[selectedKey]}
          style={{ flex: 1, minWidth: 0 }}
          theme="dark"
        />
      </Layout.Header>
      <Layout.Content style={{ padding: '24px 24px 120px 24px' }}>
        <Suspense>{children}</Suspense>
      </Layout.Content>
    </Layout>
  );
};

export default ClientLayout;
