
//ignore any error caused by the application
Cypress.on('uncaught:exception', (err, runnable) => {
console.error('Uncaught exception:', err.message);
return false;
});

describe("Search Tests", () => {
  before(() => {
    cy.login();
  });

  it("TC01 - Search valid keyword", () => {

  });
});