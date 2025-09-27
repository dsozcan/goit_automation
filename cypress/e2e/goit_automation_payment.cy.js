import guest from "../pages/guest"
import payment from "../pages/payment"

//ignore any error caused by the application
Cypress.on('uncaught:exception', (err, runnable) => {
console.error('Uncaught exception:', err.message);
return false;
});

//open url and login before tests (function defined in support)
describe("US05 - Payment Page Tests", () => {
  
  beforeEach(function () {
    cy.login();
  })

  it("TC01 - Payment page details testing", () => {
    guest.openPurchasePage();
    payment.openPaymentPage();
    cy.wait(2000);
    payment.selectShipmentType();
    payment.selectPaymentType();
    payment.payWithCard();
    payment.incompleteFormError();
    payment.fillPaymentForm();
    payment.orderSummaryCheck();
  });
})