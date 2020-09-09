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

Cypress.Commands.add("login", (email, password) => {
  email = email || Cypress.env("USER");
  password = password || Cypress.env("PASS");
  cy.request("POST", "/api/graphql", {
    query: `mutation {login (email: "${email}", password: "${password}") { token }}`,
  }).then((resp) => {
    // console.log("Logged in: ", resp.body.data.login.token);
    window.localStorage.setItem("@token", resp.body.data.login.token);
  });
});
