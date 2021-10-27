/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import { loadFixture } from "../../util/prisma-loader";
import { promises as fs } from "fs";
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  // test coverage using istanbul
  // @ts-ignore
  // eslint-disable-next-line
  // TODO: Disabled code coverage after upgrade to 7.1 as it didn't run on CI/CD anymore
  // TODO: Also see support/index.ts
  // require("@cypress/code-coverage/task")(on, config);

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    async prismaLoader(fixtureFile) {
      const file = `${config.fixturesFolder}/${fixtureFile}`;
      try {
        await loadFixture(file);
        return null;
      } catch (e) {
        console.error("Error loading fixture: ", file, e);
      }
    },
    async getEmailLink() {
      const buffer = await fs.readFile("/tmp/voty-email");
      const text = buffer.toString();
      const match = text.match(/(http[^\s]*)/gs);
      if (match?.length) return match[0];
    },
  });
  return config;
};
