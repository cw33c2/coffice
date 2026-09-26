import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/coffice",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
