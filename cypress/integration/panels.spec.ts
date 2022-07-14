describe("Test Live-Voting Panels", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("opens teacher page, select ballots, test panel voting", () => {
    cy.login();
    cy.visit("/teacher");
    cy.contains("Class 1").click();
    cy.contains("Abstimmungen Klasse");
    // add testinitiative
    cy.get("#ballots tr:contains('Testinitiative') [data-cy=off]").click();
    cy.get("#ballots tr:contains('Testinitiative') [data-cy=on]");

    // go start ballotRun
    cy.visit("/panel/1999999/present");
    cy.get(".ballot:first button:contains('Starten')").click();

    // logout user
    cy.visit("/user/logout");
    cy.contains("Login");

    // now vote anonymously
    cy.visit("/panel/1999999");
    cy.contains("Ja, ich stimme zu").click();
    cy.contains("du hast nun anonym abgestimmt");
    cy.reload();
    cy.contains("du hast nun anonym abgestimmt");
  });
});
