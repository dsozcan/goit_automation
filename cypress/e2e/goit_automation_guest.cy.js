import user from "../fixtures/user.json"
import login from "../pages/login"
import guest from "../pages/guest"

//ignore any error caused by the application
Cypress.on('uncaught:exception', (err, runnable) => {
console.error('US06 - Uncaught exception:', err.message);
return false;
});

//open url and login before tests (function defined in support)
describe("Product deatil page tests", () => {
  
  beforeEach(function () {
    cy.visit(user.url_homepage);
    cy.get('body').then(($body) => {
      const $btn = $body.find(login.cookieAcceptField);
      if ($btn.length && $btn.is(':visible')) {
        cy.wrap($btn).click();
      }
    });
  });

    it('TC01 - Cart Information Page Information Check', () => {
        guest.openPurchasePage();
        guest.continueAsGuest();
        guest.adressFormCheck();
        guest.emptyFormError();
        guest.fillAdressForm();
  })
})