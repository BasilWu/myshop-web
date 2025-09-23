import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'myshop-assets927.s3.ap-northeast-1.amazonaws.com',
      },
    ],
  },
  // monorepo 情境建議加，避免 root 判斷錯誤
  outputFileTracingRoot: __dirname + '/../../',
  experimental: {
    // allowedDevOrigins: ['http://192.168.0.103:3000'], // 你 LAN IP，可留可拿掉
  },
};

export default nextConfig;
