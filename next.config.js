/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  serverExternalPackages: ['@zenstackhq/runtime'],
  // experimental: {
  //   serverComponentsExternalPackages: ['@zenstackhq/runtime'],
  // },
};

module.exports = nextConfig;
