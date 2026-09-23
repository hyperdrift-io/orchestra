import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: 'https://eu-assets.i.posthog.com/static/:path*' },
      { source: '/ingest/:path*', destination: 'https://eu.i.posthog.com/:path*' },
    ];
  },
  poweredByHeader: false,
  typedRoutes: true,
  distDir: process.env.NEXT_OUTPUT_DIR || '.next',
};

export default config;
