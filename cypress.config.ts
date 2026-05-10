import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  defaultCommandTimeout: 10000,
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
