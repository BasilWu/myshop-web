import type { NextConfig } from 'next';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'myshop-assets927.s3.ap-northeast-1.amazonaws.com',
      },
      // 若改用 CloudFront，換成你的 CF 網域
    ],
  },
};
export default nextConfig;

// (dev only) Allow LAN IP access to dev server to avoid warnings
// See: https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
const allowed =
  process.env.NODE_ENV === 'development'
    ? {
        experimental: { allowedDevOrigins: ['http://192.168.0.101:3000'] },
      }
    : {};

module.exports = { ...module.exports, ...allowed };
