import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['randomuser.me'],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
