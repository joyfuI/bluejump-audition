import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'liveimg.sooplive.co.kr',
        port: '',
      },
    ],
  },
};

export default nextConfig;
