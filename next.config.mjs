/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "z-p3-scontent.fhan4-3.fna.fbcdn.net",
      "z-p3-scontent.fhan3-3.fna.fbcdn.net",
      "cdn.sforum.vn",
      "localhost",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
