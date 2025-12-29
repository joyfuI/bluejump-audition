import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'liveimg.sooplive.co.kr',
        port: '',
        pathname: '/h/*.webp',
      },
      {
        protocol: 'https',
        hostname: 'videoimg.sooplive.co.kr',
        port: '',
        pathname: '/php/SnapshotLoad.php',
      },
    ],
  },
};

export default nextConfig;
