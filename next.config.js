// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
});
module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/umfrage",
        destination:
          "https://docs.google.com/forms/d/e/1FAIpQLSemCyy_UK2ijbnKTW-UGyOSF0WbEJcrsR15vu7KkFzqBGccvg/viewform",
        permanent: true,
      },
    ];
  },
});
