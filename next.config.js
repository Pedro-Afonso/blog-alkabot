/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: 'https', hostname: 'robohash.org' }] },
  async redirects() {
    return [{ source: "/", destination: "/posts", permanent: false }];
  },
}

module.exports = nextConfig
