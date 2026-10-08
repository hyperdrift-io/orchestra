import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/articles/conversation-with-a-shared-view', destination: '/articles/the-first-officer', permanent: true },
      { source: '/articles/the-bridge', destination: '/articles/evidence-that-starts-work', permanent: true },
      { source: '/articles/expertise-agents-can-use', destination: '/articles', permanent: true },
      { source: '/articles/connect-agents-to-existing-work', destination: '/articles/webmcp-actions-on-the-page', permanent: true },
    ];
  },
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
