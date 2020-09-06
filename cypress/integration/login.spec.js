describe("Test Login Page", () => {
  it("logs in with a valid user!", () => {
    cy.visit("/");
    cy.contains("Anmelden").click();
    cy.url().should("include", "/user/login");
    cy.findByLabelText("Email:").type(Cypress.env("USER"));
    cy.findByLabelText("Passwort:").type(Cypress.env("PASS"));
    cy.get("button").contains("Anmelden").click();
    cy.contains("Startseite").click();
    cy.url().should("include", "/user/teacher");
  });

  it("shows an error with wrong password", () => {
    cy.visit("/user/login");
    cy.findByLabelText("Email:").type(Cypress.env("USER"));
    cy.findByLabelText("Passwort:").type("wrongpass");
    cy.get("button").contains("Anmelden").click();
    cy.contains("Email oder Passwort");
  });
});

describe("Test Login", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Logs is already logged in!", () => {
    cy.visit("/user/login");
    cy.contains("Startseite").click();
    cy.url().should("include", "/user/teacher");
  });
});
