/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } }
    ],
  },
  // Increase timeout for font loading
  staticPageGenerationTimeout: 240,
  // Temporarily disable font optimization to debug the issue
  optimizeFonts: false,
};

module.exports = nextConfig;