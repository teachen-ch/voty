import { tr } from "../../util/translate";

describe("Test Signup Page", () => {
  before(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("Barks on existing user", () => {
    cy.visit("/user/signup");
    cy.findByLabelText("Vorname:").type("Test");
    cy.findByLabelText("Nachname:").type("Testerich");
    cy.findByLabelText("Email:").type("teacher@teachen.ch");
    cy.findByLabelText("Passwort:").type("Password2007");
    cy.findByLabelText("Ich bin:").select("Lehrer*in");
    cy.get("button").contains("Konto erstellen").click();
    cy.contains(tr("ERR_DUPLICATE_EMAIL"));
  });

  it("Does not submit without correct email", () => {
    cy.visit("/user/signup");
    cy.findByLabelText("Vorname:").type("Test");
    cy.findByLabelText("Nachname:").type("Testerich");
    cy.findByLabelText("Email:").type("noemail@bla");
    cy.findByLabelText("Passwort:").type("Password2007");
    cy.findByLabelText("Ich bin:").select("Lehrer*in");
    cy.get("button").contains("Konto erstellen").click();
    cy.contains("Bitte gültige Email-Adresse angeben");
  });

  // TODO: This test crashes the server on production, not sure why
  /*
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
  });*/

  it("TODO: Activates user with verification url", () => {
    cy.visit("/user/signup");
    // TODO: find a way to get verification token...
    // cy.request("/api/graphql", ``````)
  });
});
