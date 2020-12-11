describe("Test Live-Voting Panels", () => {
  before(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  // TODO: need to reimplement after redesign of selection flow
  it("opens teacher page and selects some ballots", () => {
    cy.login();
    cy.visit("/teacher");
    cy.contains("Class 1").click();
    // add testinitiative
    cy.contains("Folgende Abstimmungen");
    cy.get(
      "#ballots tr:contains('Testinitiative') svg[alt='abgewählt']"
    ).click();
    cy.get("#ballots tr:contains('Testinitiative') svg[alt='ausgewählt']");

    // TODO: where is this button supposed to be?
    // cy.get("#livepanel button").first().click();
    // cy.contains("Jetzt abstimmen");
    cy.visit("/panel/1999999/present");
    cy.get(".ballot:first button:contains('Starten')").click();
    // logout user
    cy.visit("/user/logout");
    cy.contains("Anmelden");

    // now vote anonymously
    cy.visit("/panel/1999999");
    cy.contains("Ja, ich stimme zu").click();
    cy.contains("Du hast nun anonym abgestimmt");
    cy.reload();
    cy.contains("Du hast nun anonym abgestimmt");
  });
});
