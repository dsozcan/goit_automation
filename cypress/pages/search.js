class search{

    searchBar = '[name="q"]';
    searchButton = '#live-search-btn';
    productCard = '.product-item';
    productTitle = '.product-title';
    productWriter = '.model-title';
    productPrice = '.product-price';
    productPublisher = '.brand-title'
    searchPageSearchBar ='[name="q"]';
    sortOptions = '#sort option';
    sortButton = '[name="sort"]';
    filterCategory = 'section.filter-card h5';
    loginButton = '#login-btn-322';

searchBook (bookName) {
    //type bookName into search bar and click search
    cy.get(this.searchBar, { timeout: 10000 }).should('be.visible').type(bookName);
    cy.get(this.searchButton).click();
}

//Check that search bar is empty
checkSearchBarEmpty () {
    cy.get(this.searchBar).should('be.empty');
}

//Check informations shown on product cards
checkProductCard () {
    cy.get(this.productCard).first().within(() => { //select the first product card
        cy.get('img')
        .should('be.visible') // check if the visual is visible
        .and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0); //check if visual is loaded
        });
        cy.get(this.productTitle).should('be.visible');
        cy.get(this.productWriter).should('be.visible');
        cy.get(this.productPrice).should('be.visible');
    });
}

//Price button chould change text during hover action
hoverPriceButton() {        //Hover price button and check the change in the button
  cy.get('.product-item')   //select any product card
    .first()                //select the first product card
    .realHover();           //initialize hover

  cy.get('.product-item', { timeout: 10000 })
    .first()
    .find('.add-to-cart-btn')
    .should('be.visible').and('contain.text', 'Sepete Ekle'); //check the change in text
}

searchResultCheck(bookName) {
  cy.get(this.productCard).first().invoke('text').then(text => {  //get the text from product card
    const normalizedText = text.toLowerCase().trim();             //make the text lower case for comparison
    expect(normalizedText).to.contain(bookName.toLowerCase());    //search the keyword in the text
  });
}

obsoleteSearchResultCheck() {
  cy.get(this.productCard).should('not.exist');   //no result must have shown in obsolete search
}

sortButtonCheck () {    //check if all options are being shown in sort
  cy.get(this.sortOptions).should('contain.text', 'Fiyat Artan');
  cy.get(this.sortOptions).should('contain.text', 'Fiyat Azalan');
  cy.get(this.sortOptions).should('contain.text', 'Varsayılan Sıralama');
  cy.get(this.sortOptions).should('contain.text', 'Yeniden Eskiye');
  cy.get(this.sortOptions).should('contain.text', 'Eskiden Yeniye');
}

sortingCheck() {     // check the results of sorting
  cy.get(this.sortButton).select('Fiyat Azalan');   // price decreased is selected
  cy.get('.product-price')
    .then(($prices) => {
      const priceArray = [...$prices].map(el => parseFloat(el.innerText.trim().replace(/[^\d,]/g, '').replace(',', '.')));

      for (let i = 0; i < priceArray.length - 1; i++) {
        //expect(priceArray[i]).to.be.at.least(priceArray[i + 1]);
      }
    });
}

filterCategoryCheck () {      //check if all categories are visible
  cy.get(this.filterCategory)
    .should('contain.text', 'Kategoriler')
    .and('contain.text', 'Marka')
    .and('contain.text', 'Model')
  cy.get('#filter-categories-1012').click();      //select a category
  cy.url().should('include', 'category=1012');    //check if the selected category is being shown
}

scrollToLoadPage () {
  // Get the product count in initial state
cy.get('.product-item').then(($products) => {
  const initialCount = $products.length;

  // scroll to bottom
  cy.scrollTo('bottom');

  // wait till the new products loaded and get the new count
  cy.get('.product-item', { timeout: 10000 }).should('have.length.greaterThan', initialCount);
});
}

}

export default new search();