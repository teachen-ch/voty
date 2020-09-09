describe("Test Teacher Startpage", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
    cy.login();
  });

  it("shows Teacher page with teacher's teams!", () => {
    cy.visit("/user/teacher");
    cy.contains("Startseite für Lehrpersonen");
    cy.contains("Class 1");
  });

  it("allows teacher to create a new team", () => {
    cy.visit("/user/teacher");
    cy.contains("Neue Klasse erfassen").click();
    cy.get("#name").type("Testclass");
    cy.get("button").contains("Klasse erstellen").click();

    cy.wait(100);
    cy.get("table tr:last").as("classrow");
    cy.get("@classrow").contains("Einladung").click();
    cy.url().should("include", "/i/");
    cy.contains("Klassen-Einladung");
    cy.contains("Klasse «Testclass»");
  });
});
