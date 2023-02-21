/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
}



