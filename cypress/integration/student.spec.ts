describe("Test Teacher Startpage", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("asks student to fill in profile", () => {
    cy.login("student@teachen.ch", "teachen");
    cy.visit("/student");
    cy.contains("Bitte ergänze hier noch Deine Angaben");
    cy.findByLabelText("Vorname").clear().type("Student One");
    cy.findByLabelText("Jahrgang").select("2004");
    cy.contains("männlich").click();
    cy.contains("Angaben speichern").click();
  });
});
