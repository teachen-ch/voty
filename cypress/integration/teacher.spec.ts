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

  // this crashes in CI/CD as well...
  it.skip("allows teacher to create a new team and see invite", () => {
    cy.login();
    cy.visit("/teacher");
    // wait for teams to load, otherwise a reload below can shake things up
    cy.get(".teams");
    cy.contains("Neue Klasse erfassen").click();
    cy.get("#name").type("Testclass");
    cy.get("button").contains("Klasse erstellen").click();
    cy.contains("Die neue Klasse wurde erfolgreich erstellt");

    // Test team detail page
    cy.get("td:contains('Testclass')").click();
    cy.contains("Einladungen verschicken");
    cy.get("textarea").type(
      "student4@teachen.ch, bla\n student4@teachen.ch student5@teachen.ch"
    );
    cy.contains("2 Einladungen verschicken").click();
    cy.get("td:contains('Student4')");
    cy.task("getEmailLink").as("url");
    cy.get("@url").then((url) => {
      cy.visit(String(url));
      cy.contains("Deine Email-Adresse ist nun bestätigt.");
    });
  });

  it("allows teacher to select an existing school", () => {
    cy.login("teacher4@teachen.ch", "teachen");
    cy.visit("/teacher");
    cy.contains("Wähle zuerst Deine Schule");
    cy.findByLabelText("Schule:").select("1000 City One - School One");
    cy.contains("Bestätigen").click();
    cy.contains("Mein Konto").click();
  });

  it("allows teacher to create a new school", () => {
    cy.login("teacher4@teachen.ch", "teachen");
    cy.visit("/teacher");
    cy.contains("Neue Schule erfassen").click();
    cy.findByLabelText("Schule:").type("Testschule");
    cy.findByLabelText("Schultyp:").select("Gymnasium");
    cy.findByLabelText("Adresse:").type("Teststrasse 5");
    cy.findByLabelText("PLZ:").type("3333");
    cy.findByLabelText("Ort:").type("Testort");
    cy.findByLabelText("Kanton:").select("Bern");
    cy.contains("Bestätigen").click();
  });

  it("lets a teacher delete her account", () => {
    cy.login("teacher3@teachen.ch", "teachen");
    cy.visit("/user/delete");
    cy.get("button").contains("Konto löschen").click();
    cy.contains("erfolgreich");
    // user should automatically be logged out
    cy.contains("Anmelden").click();
    cy.findByLabelText("Email:").type("teacher3@teachen.ch");
    cy.findByLabelText("Passwort:").type("teachen");
    cy.get("button").contains("Anmelden").click();
    cy.contains("Fehler: Email oder Passwort");
  });
});
