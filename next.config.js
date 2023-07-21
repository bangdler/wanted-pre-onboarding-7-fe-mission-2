/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', '*'],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
