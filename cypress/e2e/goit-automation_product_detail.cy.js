import product_detail from "../pages/product_detail"

//ignore any error caused by the application
Cypress.on('uncaught:exception', (err, runnable) => {
console.error('Uncaught exception:', err.message);
return false;
});

//open url and login before tests (function defined in support)
describe("US03 -  Product deatil page tests", () => {
  
  before(function () {
    cy.login();
  })

  it('TC01 - Product detail page elemnts check', () => {
    product_detail.selectBook();
    product_detail.addCart();
    product_detail.emptyCart();
  })

});