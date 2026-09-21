import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  distDir: process.env.NEXT_OUTPUT_DIR || '.next',
};

export default config;
