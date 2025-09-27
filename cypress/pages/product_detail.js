class detail{

productCard = '.image-wrapper';
productTitle = '#product-title';
productWriter = '#model-title > span';
productPublisher = '#brand-title';
productPrice = '.product-price';
productInformation = '.col-12.mt-1 > .row';
addCartBtn = '#addToCartBtn';
popUp = '#popup-cart';
popUpClose = '#t-modal-close-1 > .ti-close';
cartItem = '.badge';

//check the content of product detail page
selectBook () {
    cy.get(this.productCard).first().click();
        cy.get(this.productTitle).should('be.visible');
        cy.get(this.productWriter).should('be.visible');
        cy.get(this.productPublisher).should('be.visible');
        cy.get(this.productPrice).should('be.visible');
        cy.get(this.productInformation).should('contain.text', 'Türü')
        .and('contain.text', 'ISBN')
        .and('contain.text', 'Kapak')
        .and('contain.text', 'Basım Yılı')
        .and('contain.text', 'Sayfa Sayısı')
        .and('contain.text', 'Kağıt Tipi');
}

//
addCart () {
  //get the item count from my cart button
  cy.get('.badge.cart-soft-count')
    .invoke('text')
    .then((text) => {
      const initialCount = parseInt(text.trim(), 10) || 0;
        //add new item to the cart
        cy.get(this.addCartBtn).click().should('be.visible');
        cy.get(this.popUp, { timeout: 10000 }).should('be.visible');
        cy.get(this.popUpClose).click();
        cy.log(cy.get(this.cartItem));
      // get the new item count from my cart button
      cy.get('.badge.cart-soft-count', { timeout: 10000 })
        .invoke('text')
        .then((newText) => {
          const newCount = parseInt(newText.trim(), 10);
          //check that the item count is increased by 1
          expect(newCount).to.eq(initialCount + 1);
        });
    });

}

emptyCart () {
  //delete all products from the cart for future tests
    cy.get('.cart-general').click();
    cy.get('.custom-close').click();
}

}

export default new detail();