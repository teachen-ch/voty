describe("Test Admin Area", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
    cy.login("voty@teachen.ch", "teachen");
  });

  it("shows admin page", () => {
    cy.visit("/admin");
    cy.contains("Admin Bereich");

    // visit users page
    cy.contains("Lehrpersonen").click();
    cy.contains("Teacher-1");
    cy.go("back");

    // visit teams page
    cy.contains("Klassen").click();
    cy.contains("Class 1");
    cy.go("back");

    // visit schools page
    cy.contains("Schulen").click();
    cy.contains("Admin / Schulen");
    cy.contains("School One");
    cy.go("back");
  });
});
