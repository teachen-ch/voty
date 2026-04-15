// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// TODO: Disabled code coverage after upgrade to 7.1 as it didn't run on CI/CD anymore
// import "@cypress/code-coverage/support";
import "./commands";

// React 18 + theme-ui 0.3 produces hydration warnings that Next.js dev surfaces
// as uncaught errors. Swallow them so tests continue — prod only warns, does
// not throw. Remove once theme-ui is replaced.
Cypress.on("uncaught:exception", (err) => {
  if (
    /Hydration failed|hydrat|Minified React error #418|#423|#425/i.test(
      err.message
    )
  )
    return false;
});
