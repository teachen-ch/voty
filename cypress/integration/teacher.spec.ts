describe("Test Teacher Startpage", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("opens Teacher page with teacher's teams!", () => {
    cy.login();
    cy.visit("/teacher");
    cy.contains("Willkommen");
    cy.contains("Class 1");
  });

  it("allows teacher to create a new team and see invite", () => {
    cy.login();
    cy.visit("/teacher");
    cy.contains("Neue Klasse erfassen").click();
    cy.get("#name").type("Testclass");
    cy.get("button").contains("Klasse erstellen").click();

    // Test team detail page
    cy.contains("Testclass").click();
    cy.url().should("include", "/teacher/team/");
    cy.contains("Schüler einladen");
  });

  it("allows teacher to select an existing school", () => {
    cy.login("teacher4@teachen.ch", "teachen");
    cy.visit("/teacher");
    cy.contains("Bitte wähle Dein Schulhaus");
    cy.findByLabelText("Deine Schule:").select("1000 City One - School One");
    cy.contains("Bestätigen").click();
    cy.contains("Dein Schulhaus: School One");
  });

  it("allows teacher to create a new school", () => {
    cy.login("teacher4@teachen.ch", "teachen");
    cy.visit("/teacher");
    cy.contains("Neues Schulhaus erfassen").click();
    cy.findByLabelText("Schulhaus:").type("Testschule");
    cy.findByLabelText("Adresse:").type("Teststrasse 5");
    cy.findByLabelText("PLZ:").type("3333");
    cy.findByLabelText("Ort:").type("Testort");
    cy.findByLabelText("Kanton:").select("Bern");
    cy.contains("Bestätigen").click();
    cy.contains("Dein Schulhaus: Testschule");
  });
});
