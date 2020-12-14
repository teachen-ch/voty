describe("Test Live-Voting Panels", () => {
  before(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("opens teacher page and selects some ballots", () => {
    cy.login();
    cy.visit("/teacher");
    cy.contains("Class 1").click();
    cy.contains("Folgende Abstimmungen");
    // TODO: Why wait when you can flake?
    cy.wait(1000);
    // add testinitiative
    cy.get(
      "#ballots tr:contains('Testinitiative') svg[alt='abgewählt']"
    ).click();
    cy.get("#ballots tr:contains('Testinitiative') svg[alt='ausgewählt']");

    // go start ballotRun
    cy.visit("/panel/1999999/present");
    cy.get(".ballot:first button:contains('Starten')").click();

    // logout user
    cy.visit("/user/logout");
    // TODO: Why wait when you can flake?
    cy.wait(500);
    cy.contains("Anmelden");

    // now vote anonymously
    cy.visit("/panel/1999999");
    cy.contains("Ja, ich stimme zu").click();
    cy.contains("Du hast nun anonym abgestimmt");
    cy.reload();
    cy.contains("Du hast nun anonym abgestimmt");
  });
});
