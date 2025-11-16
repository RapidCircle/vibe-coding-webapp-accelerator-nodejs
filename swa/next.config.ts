import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack is now the default in Next.js 16
  turbopack: {},
  
  // Additional experimental features for better dev experience
  experimental: {
    // Enable faster refresh
    optimizePackageImports: ['react', 'react-dom'],
  },
};

export default nextConfig;
