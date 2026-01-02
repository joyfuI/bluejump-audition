import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: '블루점프 4기 오디션 모아보기',
  description: '블루점프 4기 오디션 합격자 모아보기 팬 사이트입니다.',
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="ko">
      <body>
        <AntdRegistry>
          <ConfigProvider
            locale={koKR}
            theme={{ token: { colorPrimary: '#277ee8' } }}
          >
            <NuqsAdapter>{children}</NuqsAdapter>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
