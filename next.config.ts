import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['*.googleapis.com'],
  },
  env: {
    GOOGLE_CLOUD_CREDENTIALS: process.env.GOOGLE_CLOUD_CREDENTIALS,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: 'AIzaSyA_A279KTweJDd5uDKSgackC-hNV_bJJ2A',
  }
};

export default nextConfig;
