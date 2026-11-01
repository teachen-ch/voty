import { seedE2E } from "./seed.mjs";

export default async function globalSetup(config) {
  const baseURL =
    process.env.E2E_PB_URL ||
    process.env.PLAYWRIGHT_BASE_URL ||
    config.projects[0].use.baseURL;
  await seedE2E(baseURL);
}
