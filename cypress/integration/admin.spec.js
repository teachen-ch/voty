describe("Test Admin Area", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
    cy.login("voty@teachen.ch", "teachen");
  });

  it("shows Admin page", () => {
    cy.visit("/admin");
    cy.contains("Admin Bereich");
    cy.contains("Teams").click();
    cy.contains("Class 1");
  });
});
