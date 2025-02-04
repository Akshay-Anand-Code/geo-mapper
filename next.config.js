/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure these settings are present
  target: 'serverless',
  images: {
    domains: [], // Add any image domains you're using
    loader: 'custom',
    loaderFile: './imageLoader.js',
  }
}

module.exports = nextConfig 