import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Use webpack instead of turbopack for firebase-admin compatibility
  turbopack: {},
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

export default nextConfig
