/** @type {import('next').NextConfig} */
const { v4: uuid } = require("uuid");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  useFileSystemPublicRoutes: true,

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              "http://localhost:3000 https://podfol.io https://www.podfol.io http://podfol.io http://www.podfol.io",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, PATCH, DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/profiles/:clientName",
        destination: "/:clientName",
        permanent: true,
      },
      {
        source: "/profiles/:clientName/report/:clientId",
        destination: "/:clientName/report/:clientId",
        permanent: true,
      },
      {
        source: "/profiles/:clientName/r/:clientId",
        destination: "/:clientName/report/:clientId",
        permanent: true,
      }
    ];
  },

  generateBuildId: () => {
    return uuid();
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.podcastguesting.pro" },
      { protocol: "https", hostname: "v5.airtableusercontent.com" },
    ],
  },

  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://test.podfol.io"
  },
};

module.exports = nextConfig;
