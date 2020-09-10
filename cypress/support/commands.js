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
import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";

addMatchImageSnapshotCommand();

Cypress.Commands.add("login", (email, password, failed = 0) => {
  email = email || Cypress.env("USER");
  password = password || Cypress.env("PASS");
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
      console.log("Login Failed: ", failed);
      return cy.login(email, password, failed + 1);
    }
    window.localStorage.setItem("@token", resp.body.data.login.token);
  });
});
