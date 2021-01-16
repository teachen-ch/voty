describe("Test Ballots", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("opens teacher page and selects some ballots", () => {
    cy.login();
    cy.visit("/teacher");
    cy.contains("Class 1").click();
    cy.contains("Abstimmungen");

    // select first, then select and de-select last ballot
    cy.get("#ballots tr:first td:last").click();
    cy.get("#ballots tr:first td:last svg[alt='ausgewählt']");
    cy.get("#ballots tr:last td:last").click();
    cy.get("#ballots tr:last td:last svg[alt='ausgewählt']");
    cy.get("#ballots tr:last td:last").click();
    cy.get("#ballots tr:last td:last svg[alt='abgewählt']");

    // login as student and vote
    cy.login("student@teachen.ch", "teachen");
    cy.visit("/student");
    cy.contains("Testinitiative").click();
    cy.contains("Ja, ich").click();
    cy.contains("Du hast abgestimmt");
    cy.visit("/user/logout");
    cy.contains("Demokratie an die Schule"); // wait for logout to complete

    // login again to check student cannot vote again
    cy.login("student@teachen.ch", "teachen");
    cy.visit("/ballots/");
    cy.contains("Testinitiative").click();
    cy.contains("Du hast erfolgreich");
    cy.go("back");

    // initiative with past date
    cy.contains("Abgelaufene Initiative").click();
    cy.contains("Abstimmung ist beendet");
    cy.go("back");

    // initiative with future date
    cy.contains("Zukunftsinitiative").click();
    cy.contains("Abstimmung noch nicht");
  });
});
