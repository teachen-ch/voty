describe("Test Signup Page", () => {
  it("Barks on existing user", () => {
    cy.visit("/user/signup");
    cy.findByLabelText("Vorname:").type("Test");
    cy.findByLabelText("Nachname:").type("Testerich");
    cy.findByLabelText("Email:").type(Cypress.env("USER"));
    cy.findByLabelText("Passwort:").type("Password2007");
    cy.get("button").contains("Account erstellen").click();
    cy.contains("Diese Email ist bereits registriert");
  });

  it("Does not submit without correct email", () => {
    cy.visit("/user/signup");
    cy.findByLabelText("Vorname:").type("Test");
    cy.findByLabelText("Nachname:").type("Testerich");
    cy.findByLabelText("Email:").type("noemail@bla");
    cy.findByLabelText("Passwort:").type("Password2007");
    cy.get("button").contains("Account erstellen").click();
    cy.contains("Bitte gültige Email-Adresse angeben");
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
