// eslint-disable-next-line
const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
});
// eslint-disable-next-line
module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  redirects() {
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
