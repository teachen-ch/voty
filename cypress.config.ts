import { defineConfig } from "cypress";

export default defineConfig({
  experimentalStudio: true,
  defaultCommandTimeout: 10000,
  env: {
    USER: "teacher@teachen.ch",
    PASS: "teachen",
    codeCoverage: {
      url: "/api/__coverage__",
    },
  },
  video: true,
  videoCompression: 0,
  projectId: "19hfnd",
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.ts")(on, config);
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },
});
