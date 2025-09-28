class cart{
    navigateCartBtn = '.cart-general';
    goToCartBtn = '#go-cart-btn';
    productName = '.cart-item-title';
    productQuantity = '#qty5067240';
    productPrice = '.d-flex > .price-sell';
    totalPrice = '.col-4 > .price-sell';
    cartTotalContainer = '#cart-price-container > .p-2';
    cartTotalPrice = '.fw-black > .pl-0';
    shipmentFee = ':nth-child(2) > .pl-0'
    generalSum = '.fw-bold > .pl-0';
    increaseQuantityBtn = '#qty-plus5067240';
    trashIcon = '#delete-product-5067240 > .ti-trash-o';
    deleteProductsConfirmationPopUp = '.t-popconfirm-inner';
    deleteProductsBtn = '.t-popconfirm-buttons > .btn-light';
    continueShoppingBtn = '#cart-back-btn';
    addCartBtn = '#cart-popup-go-cart';
    productCard = '.image-wrapper';
    productPageAddToCartBtn = '#addToCartBtn';
    purchaseBtn = '#cart-buy-btn';
    emptyCartBtn = '#clear-cart-btn-129';

navigateToCart () {
    //got to cart button check
    cy.get(this.navigateCartBtn).click();
    cy.get(this.goToCartBtn).should('be.visible').click();
}

cartProductInformationCheck () {
    //check if the required field in cart page is visible
    cy.get(this.productName).should('exist').and('be.visible');
    cy.get(this.productQuantity).should('exist').and('be.visible');
    cy.get(this.productPrice).should('exist').and('be.visible');
    cy.get(this.totalPrice).should('exist').and('be.visible');

    //check if the price calculations are right in terms of piece price, quantity and total price
    cy.get(this.productPrice).invoke('text').then((priceText) => {  //get the piece price
        const productPrice = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.'));//trim the price value to get only numbers
        cy.get(this.productQuantity).invoke('val').then((qtyText) => {  //get the quantity
            const quantity = parseInt(qtyText.replace(/[^\d]/g, ''), 10); 
            cy.get(this.totalPrice).invoke('text').then((totalText) => {    //get the total price
                const totalPrice = parseFloat(totalText.replace(/\./g, '').replace(',', '.'));
                const expected = parseFloat((productPrice * quantity).toFixed(2));  //check if the total price is equal to piece price time quantity
                const actual = parseFloat(totalPrice.toFixed(2));
                expect(actual).to.eq(expected);
            });
        });
    });
}

cartTotalContainerInformationCheck () {
    //check if the required field in cart page is visible
    cy.get(this.cartTotalContainer).should('contain.text', "Sepet Toplamı")
    .and('contain.text', 'Kargo Ücreti')
    .and('contain.text', 'Genel Toplam');
    
    cy.get(this.cartTotalPrice).invoke('text').then((priceText) => {
        const cartTotalPrice = parseFloat(priceText.replace(/\./g, '').replace(',', '.'));
        cy.get(this.shipmentFee).invoke('text').then((shipmentText) => {
            const shipmentFee = parseFloat(shipmentText.replace(/\./g, '').replace(',', '.'));
            cy.get(this.generalSum).invoke('text').then((totalText) => {
                const generalSum = parseFloat(totalText.replace(/\./g, '').replace(',', '.'));
                const expected = (cartTotalPrice + shipmentFee).toFixed(2);
                const actual = generalSum.toFixed(2);
                expect(actual).to.eq(expected);
            });
        });
    });
}

increaseProductQuantity () {
    //check if the total price is increased correctly when quantity is increased
    cy.get(this.totalPrice).invoke('text').then((priceText) => {
        const initialTotalPrice = parseFloat(priceText.replace(/\./g, '').replace(',', '.'));
        cy.get(this.productQuantity).invoke('val').then((qtyText) => {
            const initialQuantity = parseInt(qtyText.replace(/[^\d]/g, ''), 10);
            cy.get(this.increaseQuantityBtn).click();
            cy.wait(10000);
            cy.get(this.productQuantity).invoke('val').then((qtyText) => {
                const increasedQuantity = parseInt(qtyText.replace(/[^\d]/g, ''), 10);
                expect(increasedQuantity).to.be.greaterThan(initialQuantity);
                cy.get(this.totalPrice).invoke('text').then((priceText) => {
                    const increasedTotalPrice = parseFloat(priceText.replace(/\./g, '').replace(',', '.'));
                    const initial = (initialTotalPrice / initialQuantity).toFixed(2);
                    const increased = (increasedTotalPrice / increasedQuantity).toFixed(2);
                    expect(initial).to.eq(increased);
                })
            })
        })
    })
}

deleteProductsTrashIcon () {
    //check delete products icon function
    cy.get(this.trashIcon).click();
    cy.get(this.deleteProductsConfirmationPopUp).should('be.visible').and('contain.text','Sil');
    cy.get(this.deleteProductsBtn).click();
    cy.get(this.continueShoppingBtn).should('be.visible');
}

navigateCartMainPage () {
    //check got to my cart button function in main page
    cy.get('.product-item').first().realHover();
    cy.get('.product-item').first().find('.add-to-cart-btn')
    .should('be.visible').and('contain.text', 'Sepete Ekle').click();
    cy.get(this.addCartBtn, { timeout: 10000 }).click();
    cy.url().should('include', 'sepet');

}

navigateCartProductPage () {
    //check got to my cart button function in product page
    cy.get(this.productCard).first().click();
    cy.get(this.productPageAddToCartBtn).click();
    cy.get(this.addCartBtn, { timeout: 10000 }).click();
    cy.url().should('include', 'sepet');
}

purchaseButtonCheck () {
    cy.get(this.purchaseBtn).should('exist').and('be.visible');
}

emptyCartBtnCheck () {
    cy.get(this.emptyCartBtn).click();
    cy.get(this.continueShoppingBtn).should('be.visible');
}

}
export default new cart();