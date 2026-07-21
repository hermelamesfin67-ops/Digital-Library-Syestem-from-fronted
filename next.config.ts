import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "library-management-system-3-o9r7.onrender.com",
      },
    ],
  },
};

export default nextConfig;
