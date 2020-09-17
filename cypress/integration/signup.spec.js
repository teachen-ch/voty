describe("Test Signup Page", () => {
  /*
  beforeEach(() => {
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

  it("Creates a new (inactive) user!", () => {
    cy.visit("/user/signup");
    cy.findByLabelText("Vorname:").type("Test");
    cy.findByLabelText("Nachname:").type("Test");
    cy.findByLabelText("Email:").type("other@teachen.ch");
    cy.findByLabelText("Passwort:").type("Password2007");
    cy.get("button").contains("Konto erstellen").click();
    cy.contains("Konto erstellt");

    // test that user is not active yet (missing email verification)
    cy.visit("/user/login");
    cy.findByLabelText("Email:").type("other@teachen.ch");
    cy.findByLabelText("Passwort:").type("Password2007");
    cy.get("button").contains("Anmelden").click();
    cy.contains("Email bestätigen");
  });

  it("TODO: Activates user with verification url", () => {
    cy.visit("/user/signup");
    // TODO: find a way to get verification token...
    // cy.request("/api/graphql", ``````)
  });*/
});
