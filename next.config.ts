import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  redirects: async () => [
    {
      source: "/",
      destination: "/footprint-calculator/home-energy",
      permanent: true,
    },
  ],
};

export default nextConfig;
