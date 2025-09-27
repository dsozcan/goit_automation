class guest{

    purchasePageBtn = '#cart-popup-continue-shopping';
    continueAsGuestBtn = '#membership-form-131 > .w-100';
    adressForm = '#order-address-form';
    saveAdressBtn = '.col-12 > .btn';
    emptyFormMessage = '.popover-item';
    formName = '[name="fullname"]';
    formEmail = '[name="email"]';
    formCity = '[name="city_code"]';
    formCountry = '[name="country_code"]';
    formTown = '[name="town_code"]';
    formDistrict = '[name="district_code"]';
    formAdress = '[name="address"]';
    formPhone = '[name="mobile_phone"]';
    saveFormBtn = '.col-12 > .btn';
    cargoOptions = '.payment-cargo-list > .p-2 > .text-uppercase';

openPurchasePage () {
    cy.get('.product-item').first().realHover();
    cy.get('.product-item').first().find('.add-to-cart-btn')
    .should('be.visible').and('contain.text', 'Sepete Ekle').click();
    cy.wait(3000);
    cy.get(this.purchasePageBtn).click();
}

continueAsGuest () {
    cy.get(this.continueAsGuestBtn).click();
}

adressFormCheck () {
    cy.get(this.adressForm).should('contain.text', 'Ad Soyad')
    .and('contain.text', 'E-Mail')
    .and('contain.text', 'İl')
    .and('contain.text', 'İlçe')
    .and('contain.text', 'Mahalle')
    .and('contain.text', 'Adres')
}

emptyFormError () {
    cy.get(this.saveAdressBtn).click();
    cy.get(this.emptyFormMessage).should('contain.text', 'Lütfen bu alanı doldurunuz');
}

fillAdressForm () {
    cy.get(this.formName).type('abcdef abc');
    cy.get(this.formEmail).type('bkh@mail.com');
    cy.get(this.formCity).select("Adana");
    cy.get(this.formCountry).select("Türkiye");
    cy.get(this.formTown).select("Ceyhan");
    cy.get(this.formDistrict).select("ADATEPE MAH");
    cy.get(this.formAdress).type("abc11 abc11 abc11 abc11 abc11 abc11");
    cy.get(this.formPhone).type("5555555555");
    cy.get(this.saveFormBtn).click();
    cy.get(this.cargoOptions).should('contain.text', 'Kargo Seçenekleri')
}

}
export default new guest();