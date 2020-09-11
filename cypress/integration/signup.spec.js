describe.skip("Test Signup Page", () => {
  before(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("Barks on existing user", () => {
    cy.visit("/user/signup");
    cy.findByLabelText("Vorname:").type("Test");
    cy.findByLabelText("Nachname:").type("Testerich");
    cy.findByLabelText("Email:").type(Cypress.env("USER"));
    cy.findByLabelText("Passwort:").type("Password2007");
    cy.get("button").contains("Konto erstellen").click();
    cy.contains("Diese Email ist bereits registriert");
  });

  it("Does not submit without correct email", () => {
    cy.visit("/user/signup");
    cy.findByLabelText("Vorname:").type("Test");
    cy.findByLabelText("Nachname:").type("Testerich");
    cy.findByLabelText("Email:").type("noemail@bla");
    cy.findByLabelText("Passwort:").type("Password2007");
    cy.get("button").contains("Konto erstellen").click();
    cy.contains("Bitte gültige Email-Adresse angeben");
  });
});

describe("Create a new user", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("Creates a new user!", () => {
    cy.visit("/user/signup");
    cy.findByLabelText("Vorname:").type("Test");
    cy.findByLabelText("Nachname:").type("Test");
    cy.findByLabelText("Email:").type("other@teachen.ch");
    cy.findByLabelText("Passwort:").type("Password2007");
    cy.get("button").contains("Konto erstellen").click();
    cy.contains("Konto erstellt");
    cy.visit("/user/login");

    cy.findByLabelText("Email:").type("other@teachen.ch");
    cy.findByLabelText("Passwort:").type("Password2007");
    cy.get("button").contains("Anmelden").click();
    cy.contains("Email bestätigen");
  });
});
