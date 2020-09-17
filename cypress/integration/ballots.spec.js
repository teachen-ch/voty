describe("Test Ballots", () => {
  before(() => {
    cy.task("prismaLoader", "testdb.yml");
  });

  it("opens ballots page and detail with no login!", () => {
    cy.visit("/ballots");
    cy.contains("Nationale Abstimmungen");
    cy.contains("Begrenzungsinitiative").click();
    cy.contains("Freizügigkeitsabkommen");
    cy.contains("Um über diese Abstimmung");
  });

  it("lets student vote on a ballot (only once)", () => {
    cy.login("student@teachen.ch", "teachen");
    cy.visit("/ballots/");
    cy.contains("Begrenzungsinitiative").click();
    cy.contains("Ja, ich stimme zu").click();
    cy.contains("Du hast erfolgreich abgestimmt");

    // reload and ensure we can't vote again
    cy.reload();
    cy.contains("Du hast erfolgreich abgestimmt");
  });
});
