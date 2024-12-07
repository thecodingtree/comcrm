/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  serverExternalPackages: ['@zenstackhq/runtime'],
};

module.exports = nextConfig;
