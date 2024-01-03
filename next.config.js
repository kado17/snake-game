/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.GITHUB_ACTIONS && '/snake-game',
  reactStrictMode: true,
  output: 'export',
};

module.exports = nextConfig;
