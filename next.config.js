/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse"],
  },
  // Ensure images from vercel.com domains can be optimized
  images: {
    domains: ["vercel.com"],
  },
};

module.exports = nextConfig;
