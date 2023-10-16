/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["hello.app"],
  },
};

module.exports = nextConfig;
