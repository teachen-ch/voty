describe("Test Live-Voting Panels", () => {
  before(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("opens teacher page and selects some ballots", () => {
    cy.login();
    cy.visit("/teacher");
    cy.get("a:contains('Bearbeiten')").click();
    cy.contains("Abstimmungen auswählen").click();
    cy.contains("Noch keine Abstimmungen ausgewählt");
    // select 1st ballot, then add and remove it
    cy.get("#unselectedBallots .ballot").first().contains("Auswählen").click();
    cy.get("#selectedBallots .ballot").first().contains("Entfernen");
    cy.get("#selectedBallots .ballot").first().contains("Entfernen").click();
    cy.get("#selectedBallots").contains("keine Abstimmungen ausgewählt");

    // add testinitiative
    cy.get("#unselectedBallots .ballot")
      .contains("Testinitiative")
      .parent()
      .parent()
      .contains("Auswählen")
      .click();
    cy.get("#livepanel button").first().click();
    cy.contains("Jetzt abstimmen");
    cy.get(".ballot:first button:contains('Starten')").click();
    // logout user
    cy.visit("/user/logout");
    cy.contains("Anmelden");

    // now vote anonymously
    cy.visit("/panel/1999999");
    cy.contains("Ja, ich stimme zu").click();
    cy.contains("Du hast erfolgreich abgestimmt");
    cy.reload();
    cy.contains("Du hast erfolgreich abgestimmt");
  });
});
