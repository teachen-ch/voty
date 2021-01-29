// eslint-disable-next-line 
const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
});
// eslint-disable-next-line
module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  // Next 10 image conf: https://nextjs.org/docs/basic-features/image-optimization
  images: {
    deviceSizes: [400, 600, 1200, 2000],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  redirects() {
    return [
      {
        source: '/abstimmung',
        destination: '/abstimmen',
        permanent: true,
      },
    ]}
});
