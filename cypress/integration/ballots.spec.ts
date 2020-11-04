describe("Test Ballots", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("lets student vote on a ballot (only once)", () => {
    cy.login("student@teachen.ch", "teachen");
    cy.visit("/ballots/");
    cy.contains("Testinitiative").click();
    cy.contains("Ja, ich stimme zu").click();
    cy.contains("Du hast abgestimmt");
    cy.visit("/user/logout");

    cy.login("student@teachen.ch", "teachen");
    cy.visit("/ballots/");
    cy.contains("Abgelaufene Initiative").click();
    cy.contains("Abstimmung ist beendet");
    cy.go("back");

    cy.contains("Zukunftsinitiative").click();
    cy.contains("Abstimmung noch nicht gestartet");
  });

  it("opens teacher page and selects some ballots", () => {
    cy.login();
    cy.visit("/teacher");
    cy.contains("Class 1").click();
    cy.get("#ballots tr:first td:last").click();
    // select and de-select last ballot
    cy.get("#ballots tr:last td:last").click();
    cy.get("#ballots tr:last td:last svg[alt='ausgewählt']");
    cy.get("#ballots tr:last td:last").click();
    cy.get("#ballots tr:last td:last svg[alt='abgewählt']");
    cy.login("student@teachen.ch", "teachen");
    cy.visit("/student");
    cy.contains("Testinitiative");
    cy.contains("Jetzt abstimmen").click();
    cy.contains("Ja, ich").click();
  });
});
