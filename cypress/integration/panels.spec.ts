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
    // select 1st ballot, wait for it to be shown, select and remove 2nd ballot
    cy.get("#unselectedBallots .ballot").first().contains("Auswählen").click();
    cy.get("#selectedBallots .ballot").first().contains("Entfernen");
    cy.get("#unselectedBallots .ballot").first().contains("Auswählen").click();
    cy.get("#selectedBallots .ballot").first().contains("Entfernen").click();
    cy.get("#livepanel button").first().click();
  });

  // WATCH OUT, this will only work if previous test ist running
  // not good
  it("allows to vode anonymously (once) with a code", () => {
    cy.visit("/panel/1999999");
    cy.get(".ballot").first().contains("Abstimmen").click();
    cy.get("button").contains("Ja, ich stimme zu").click();
    cy.contains("Du hast erfolgreich abgestimmt");
    cy.reload();
    cy.contains("Du hast erfolgreich abgestimmt");
  });
});
