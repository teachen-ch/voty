describe("Test Teacher Startpage", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
    cy.login();
  });

  it("shows Teacher page with teacher's teams!", () => {
    cy.visit("/user/teacher");
    cy.contains("Willkommen");
    cy.contains("Class 1");
  });
});
