import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/@:username/:path*",
        destination: "/profile/:username/:path*",
      },
    ];
  },
};

export default nextConfig;
