describe("Test Panels", () => {
  before(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("opens teacher page and select some ballots", () => {
    cy.login();
    cy.visit("/teacher");
    cy.contains("Class 1").click();
    cy.contains("Demokratie testen").click();
    cy.contains("Noch keine Abstimmungen ausgewählt");
    cy.get("#unselectedBallots .ballot:first-child")
      .contains("Auswählen")
      .click();
    cy.get("#selectedBallots .ballot:first-child").contains("Entfernen");
    cy.get("#livepanel button:first").click();
  });
});
