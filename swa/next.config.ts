import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable file watching with polling for dev containers (Linux in Windows)
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 500, // Check for changes every 500ms (more aggressive)
        aggregateTimeout: 200, // Shorter delay before rebuilding
        ignored: /node_modules/, // Ignore node_modules for performance
      };
      
      // Additional config for better file watching in containers
      config.snapshot = {
        ...config.snapshot,
        managedPaths: [], // Disable managed paths optimization
      };
    }
    return config;
  },
  
  // Additional experimental features for better dev experience
  experimental: {
    // Enable faster refresh
    optimizePackageImports: ['react', 'react-dom'],
  },
};

export default nextConfig;
