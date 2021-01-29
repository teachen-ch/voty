describe("Test Login Page", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
  });
  it("logs in with a valid user (role: teacher)!", () => {
    cy.visit("/");
    cy.contains("Login").click();
    cy.url().should("include", "/user/login");
    cy.findByLabelText("Email:").type(Cypress.env("USER"));
    cy.get("button").contains("Anmelden").click();
    cy.findByLabelText("Passwort:").type(Cypress.env("PASS"), { log: false });
    cy.get("button").contains("Anmelden").click();
    cy.url().should("include", "/teacher");
    cy.contains("Mein Konto").click();
    cy.contains("Abmelden").click();
    cy.contains("Login").click();
    cy.contains("Du hast bereits ein Konto");
  });

  it("shows an error with wrong password", () => {
    cy.visit("/user/login");
    cy.findByLabelText("Email:").type(Cypress.env("USER"));
    cy.get("button").contains("Anmelden").click();
    cy.findByLabelText("Passwort:").type("wrongpass");
    cy.get("button").contains("Anmelden").click();
    cy.contains("Email oder Passwort");
  });
});
