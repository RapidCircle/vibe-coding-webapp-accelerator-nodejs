import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable turbopack for now - webpack has better polling support in containers
  // turbopack: {},
  
  // Additional experimental features for better dev experience
  experimental: {
    // Enable faster refresh
    optimizePackageImports: ['react', 'react-dom'],
  },

  // Configure webpack for dev container with aggressive polling
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 500, // Check for changes every 500ms
        aggregateTimeout: 200, // Delay before rebuilding
        ignored: /node_modules/, // Ignore node_modules for performance
      };
    }
    return config;
  },
};

export default nextConfig;
