import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/hotelgrand-os',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
