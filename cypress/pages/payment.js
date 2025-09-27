class payment {

continueToPaymentBtn = '.col-7 > .btn > span';
shipmentSelection = '.border-top > .flex-wrap';
paymentMethodSelection = '#iyz-tablist';
iyzicoSelection = '.css-gxyldq-MarkUpWrapper-MarkUpWrapper img';
cardPaymentSelection = '#iyz-tab-credit-card';
cardDetailsForm = '#checkoutform-box';
completePaymentBtn = '#iyz-payment-button';
incompleteFormMessage = '.css-1gwypqx-BaseTextBlock-BaseTextStyle';
cardHolderName = '[name="cardHolderName"]';
cardNumber = '#ccnumber';
cardExpiration = '#ccexp';
cardCVC = '#cccvc';
orderSummaryContainer = '#order-summary';
orderTotalPrice = '#order-summary > :nth-child(1) > :nth-child(2)';
shipmentFee = '#priceCargo';
generalSum = '.fw-bold > :nth-child(2)';

openPaymentPage () {
    cy.get(this.continueToPaymentBtn).click();
}

selectShipmentType () {
    cy.get('.cargo-options')
      .should('contain.text', 'PTT Kargo')
      .and('contain.text', 'HEPSİJET');

    cy.get('.cargo-option-item.active')
      .should('contain.text', 'PTT Kargo');
}

selectPaymentType () {
    cy.get(this.iyzicoSelection)
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'iyzipay.com/checkoutform/v2/');
    cy.get(this.paymentMethodSelection).should('contain.text', 'Kartla Ödeme');
}

payWithCard () {
    //card payment form should include required field and name of the field should be written as placeholders
    cy.get(this.cardPaymentSelection).click();
    const placeholders = [
        'Kart Üzerindeki Ad Soyad',
        'Kart Numarası',
        'Ay / Yıl',
        'CVC'
    ];

    placeholders.forEach(ph => {
        cy.get(this.cardDetailsForm)
            .find(`input[placeholder="${ph}"]`)
            .should('exist');
    });
}

incompleteFormError () {
    //empty form sending thould return a visible error
    cy.get(this.completePaymentBtn).click()
    cy.get(this.incompleteFormMessage).should('exist')
    .and('contain.text', 'Lütfen tüm alanları doldurunuz');
}

fillPaymentForm () {
    cy.get(this.cardHolderName).type('abc abc');
    cy.get(this.cardNumber).type('4242424242424242');
    cy.get(this.cardExpiration).type('1228');
    cy.get(this.cardCVC).type('342');
    cy.get(this.completePaymentBtn).should('not.be.disabled');
}

orderSummaryCheck () {
    //order summary container should include 3 areas and the calculation must be correct
    cy.get(this.orderSummaryContainer).should('contain.text', "Sepet Toplamı")
    .and('contain.text', 'Kargo Ücreti')
    .and('contain.text', 'Genel Toplam');
    
    cy.get(this.orderTotalPrice).invoke('text').then((priceText) => {
        const orderTotalPrice = parseFloat(priceText.replace(/\./g, '').replace(',', '.'));
        cy.get(this.shipmentFee).invoke('text').then((shipmentText) => {
            const shipmentFee = parseFloat(shipmentText.replace(/\./g, '').replace(',', '.'));
            cy.get(this.generalSum).invoke('text').then((totalText) => {
                const generalSum = parseFloat(totalText.replace(/\./g, '').replace(',', '.'));
                const expected = (orderTotalPrice + shipmentFee).toFixed(2);
                const actual = generalSum.toFixed(2);
                expect(actual).to.eq(expected);
            });
        });
    });
}


}

export default new payment();