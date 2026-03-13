/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ['randomuser.me'],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;