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
        product_detail.selectBook();      //select the first book from main page
        product_detail.addCart();         //add selected book to cart for checks
        cart.navigateToCart();            //check cart navigation buttons
        cy.screenshot();
        cart.cartProductInformationCheck(); //check the required fields on cart page
        cart.cartTotalContainerInformationCheck();    //check the cart cummary calculations
        cart.increaseProductQuantity();   //check the product quantity increase procedur
        cart.deleteProductsTrashIcon();   //delete products from cart button check
  })

    it('TC02 - Add to cart, Purchase and Delete Items Button Check', () => {
        cart.navigateCartMainPage();    //check cart navigation buttons
        cy.visit(user.url);
        cart.navigateCartProductPage(); //check cart navigation buttons
        cart.purchaseButtonCheck();    
        cy.screenshot();
        cart.emptyCartBtnCheck();
  })
  
})