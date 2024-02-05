/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@zenstackhq/runtime'],
  },
};

module.exports = nextConfig;
