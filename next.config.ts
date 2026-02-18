import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://cdn.dummyjson.com/recipe-images/**"),
    ]
  }
};

export default nextConfig;
