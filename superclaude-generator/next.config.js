/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  }
};

module.exports = nextConfig;