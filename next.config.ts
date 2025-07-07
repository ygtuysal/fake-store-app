/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Node.js 18 fetch issues için geçici çözüm
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Fetch cache ayarları
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

module.exports = nextConfig