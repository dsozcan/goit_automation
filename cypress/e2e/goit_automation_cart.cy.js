import product_detail from "../pages/product_detail"
import user from "../fixtures/user.json"
import login from "../pages/login"
import cart from "../pages/cart"



//ignore any error caused by the application
Cypress.on('uncaught:exception', (err, runnable) => {
console.error('US04 - Uncaught exception:', err.message);
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
        product_detail.selectBook();
        product_detail.addCart();
        cart.navigateToCart();
        cart.cartProductInformationCheck();
        cart.cartTotalContainerInformationCheck();
        cart.increaseProductQuantity();
        cart.deleteProductsTrashIcon();
  })

    it('TC02 - Add to cart, Purchase and Delete Items Button Check', () => {
        cart.navigateCartMainPage();
        cy.visit(user.url);
        cart.navigateCartProductPage();
        cart.purchaseButtonCheck();
        cart.emptyCartBtnCheck();
  })
  
})