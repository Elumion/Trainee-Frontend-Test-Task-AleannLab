/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 1,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/200/**",
      },
    ],
  },
  env: {
    bearer_token: "BEARER",
    google_maps_key: "GOOGLEMAPS",
  },
};

module.exports = nextConfig;
