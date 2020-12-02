// eslint-disable-next-line
const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
});
// eslint-disable-next-line
module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
});
