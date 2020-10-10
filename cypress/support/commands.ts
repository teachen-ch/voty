// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";

// Must be declared global to be detected by typescript (allows import/export)
// eslint-disable @typescript/interface-name
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to login using the api
       * @example cy.login('teacher@teachen.ch', 'teachen')
       */
      login(email?: string, password?: string, failed?: number): void;
      findByLabelText(label: string): Chainable<Subject>;
    }
  }
}

Cypress.Commands.add(
  "login",
  (email?: string, password?: string, failed = 0): void => {
    email = email || String(Cypress.env("USER"));
    password = password || String(Cypress.env("PASS"));
    if (failed > 5) return;
    cy.request("POST", "/api/graphql", {
      query: `mutation {login (email: "${email}", password: "${password}") { token }}`,
    }).then((resp) => {
      if (
        !resp ||
        !resp.body ||
        !resp.body.data ||
        !resp.body.data.login ||
        !resp.body.data.login.token
      ) {
        console.error("Login Failed: ", failed);
        // eslint-disable-next-line
        return cy.login(email, password, failed + 1);
      }
      window.localStorage.setItem("@token", resp.body.data.login.token);
    });
  }
);
