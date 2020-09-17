describe("Test Admin Area", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
    cy.login("voty@teachen.ch", "teachen");
  });

  it("shows Admin page", () => {
    cy.visit("/admin");
    cy.contains("Admin Bereich");

    // visit teams page
    cy.contains("Teams").click();
    cy.contains("Class 1");
    cy.go("back");

    // visit schools page
    cy.contains("Schools").click();
    cy.contains("School One");
    cy.go("back");

    // visit users page
    cy.contains("Users").click();
    cy.contains("Teacher-1");
    cy.go("back");
  });
});
