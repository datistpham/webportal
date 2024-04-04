/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  appDir: true,
  images: {
    domains: ['cdn.pixabay.com', "*"],
    
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
