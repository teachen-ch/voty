// eslint-disable-next-line
const withMDX = require("@next/mdx")({
  options: {
    providerImportSource: "@mdx-js/react",
  },
});
// eslint-disable-next-line
module.exports = withMDX({
  devIndicators: false,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  // i18n
  i18n: {
    locales: ["de", "fr", "it"],
    defaultLocale: "de",
    localeDetection: false,
  },
  // Next 16 image conf: https://nextjs.org/docs/basic-features/image-optimization
  images: {
    dangerouslyAllowSVG: false,
    deviceSizes: [400, 600, 1200, 2000],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    localPatterns: [{ pathname: "/**", search: "" }],
  },
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  redirects() {
    return [
      {
        source: "/abstimmung",
        destination: "/abstimmen",
        permanent: true,
      },
      {
        source: "/uptime",
        destination: "https://updown.io/p9am",
        permanent: true,
      },
      {
        source: "/jouelapolitique",
        destination: "/fr/spielpolitik",
        permanent: true,
      },
      {
        source: "/giocaallapolitica",
        destination: "/it/spielpolitik",
        permanent: true,
      },
    ];
  },
});
