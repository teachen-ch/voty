describe("Test Teacher Startpage", () => {
  before(() => {
    cy.task("prismaLoader", "testdb.yml");
  });
  beforeEach(() => {
    cy.login();
  });

  it("shows Teacher page with teacher's teams!", () => {
    cy.visit("/user/teacher");
    cy.contains("Willkommen");
    cy.contains("Class 1");
  });

  it("allows teacher to create a new team and see invite", () => {
    cy.visit("/user/teacher");
    cy.contains("Neue Klasse erfassen").click();
    cy.get("#name").type("Testclass");
    cy.get("button").contains("Klasse erstellen").click();
    cy.get("table tr").should("have.length", 3);
    cy.get("table tr:last").as("classrow");
    cy.get("@classrow").contains("Einladung").click();
    cy.url().should("include", "/i/");
    cy.contains("Klassen-Einladung");
    cy.contains("Klasse «Testclass»");
  });
});
