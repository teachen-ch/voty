const withMDX = require("@next/mdx")(/* { extension: /\.(md|mdx)$/,} */);

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  // i18n
  i18n: {
    locales: ["de", "fr", "it"],
    defaultLocale: "de",
  },
  // Next 10 image conf: https://nextjs.org/docs/basic-features/image-optimization
  images: {
    dangerouslyAllowSVG: true, // not a security risk, these are not user-generated
    deviceSizes: [400, 600, 1200, 2000],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
