describe("Test Teacher Startpage", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("asks student to fill in profile", () => {
    cy.login("student2@teachen.ch", "teachen");
    cy.visit("/student");
    cy.contains("Bitte ergänze hier noch Deine Angaben");
    cy.findByLabelText("Vorname:").clear().type("Student Two");
    cy.findByLabelText("Jahrgang:").select("2004");
    cy.contains("weiblich").click();
    cy.contains("Angaben speichern").click();
  });

  it("lets student edit profile", () => {
    cy.login("student@teachen.ch", "teachen");
    cy.visit("/student");
    cy.contains("Mein Konto").click();
    cy.contains("Profil bearbeiten").click();
    // wait for profile screen to load
    cy.contains("Vorname:");
    cy.get("button:contains('Profil bearbeiten')").click();
    cy.findByLabelText("Vorname:").clear().clear();
    cy.contains("Angaben speichern").click();
    cy.contains("Pflichtfeld");
    cy.findByLabelText("Vorname:").type("Student One");
    cy.contains("Angaben speichern").click();
  });
});
