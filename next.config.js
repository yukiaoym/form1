/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
// const SUB_DIRECTORY = "/form";
const SUB_DIRECTORY = "";
const isProd = process.env.NODE_ENV == "production"

module.exports = {
  nextConfig,
  // basePath: isProd ? SUB_DIRECTORY : "",
  compiler: {
    styledComponents: true,
  },
}



