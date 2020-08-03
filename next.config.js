module.exports = {
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/impressum/index": { page: "/impressum" },
      "/kontakt/index": { page: "/kontakt" },
      "/datenschutz/index": { page: "/datenschutz" },
    };
  },
};
