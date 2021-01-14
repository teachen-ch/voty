import { tr } from "../../util/translate";

describe("Test Signup Page", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("Barks on existing user", () => {
    cy.visit("/user/signup");
    cy.findByLabelText("Vorname:").type("Test");
    cy.findByLabelText("Nachname:").type("Testerich");
    cy.findByLabelText("Email:").type("teacher@teachen.ch");
    cy.findByLabelText("Passwort:").type("Password2007");
    // we currently redirect registration to the campaign page
    //cy.findByLabelText("Ich bin:").select("Lehrer*in");
    cy.get("button").contains("Konto erstellen").click();
    cy.contains(tr("Error.DuplicateEmail"));
  });

  it("Does not submit without correct email", () => {
    cy.visit("/user/signup");
    cy.findByLabelText("Vorname:").type("Test");
    cy.findByLabelText("Nachname:").type("Testerich");
    cy.findByLabelText("Email:").type("noemail@bla");
    cy.findByLabelText("Passwort:").type("Password2007");
    // we currently redirect registration to the campaign page
    // cy.findByLabelText("Ich bin:").select("Lehrer*in");
    cy.get("button").contains("Konto erstellen").click();
    cy.contains("Bitte gültige Email-Adresse angeben");
  });

  it("Creates a new teacher account", () => {
    cy.visit("/user/signup");
    cy.findByLabelText("Vorname:").type("Test");
    cy.findByLabelText("Nachname:").type("Test");
    cy.findByLabelText("Email:").type("other@teachen.ch");
    cy.findByLabelText("Passwort:").type("Password2007");
    cy.get("button").contains("Konto erstellen").click();
    cy.contains("Konto ist erstellt");

    // test that user is not active yet (missing email verification)
    cy.visit("/user/login");
    cy.findByLabelText("Email:").type("other@teachen.ch");
    cy.findByLabelText("Passwort:").type("Password2007");
    cy.get("button").contains("Anmelden").click();
    cy.contains("Email bestätigen");
    cy.contains("Nochmals Email schicken").click();
    cy.contains("Email verschickt!");

    // retrieve url from /tmp/voty-email and activate user
    cy.task("getEmailLink").as("url");
    cy.get("@url").then((url) => {
      cy.visit(String(url));
      cy.contains("Deine Email-Adresse ist nun bestätigt");
    });
  });
});
