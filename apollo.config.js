module.exports = {
  client: {
    service: {
      name: "voty-graphql",
      localSchemaFile: "./api.graphql",
    },
    includes: ["./**/*.ts*"],
    excludes: ["./graphql/**", "**/node_modules/**", "**/__tests__/**"],
  },
};
