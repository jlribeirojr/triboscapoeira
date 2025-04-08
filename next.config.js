/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      'imgix.cosmicjs.com', 
      'cosmic-s3.imgix.net',
      'pps.whatsapp.net',
      'web.whatsapp.com',
      'cdn.cosmicjs.com'
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig; 