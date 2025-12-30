import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => ({
  name: '블루점프 4기 오디션 모아보기',
  short_name: '블루점프 4기 오디션',
  description: '블루점프 4기 오디션 합격자 모아보기 팬 사이트입니다.',
  start_url: '/',
  display: 'standalone',
  background_color: '#277ee8',
  theme_color: '#ffffff',
  icons: [
    { src: '/img/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/img/icon-512x512.png', sizes: '512x512', type: 'image/png' },
  ],
});

export default manifest;
