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

searchBook (bookName) {
    //type bookName into search bar and click search
    cy.get(this.searchBar).type(bookName);
    cy.get(this.searchButton).click();
}

//Check that search bar is empty
checkSearchBarEmpty () {
    cy.get(this.searchBar).should('be.empty');
}

//Check product cards
checkProductCard () {
    cy.get(this.productCard).first().within(() => { //select the first product card
        cy.get('img')
        .should('be.visible') // check the visual
        .and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0); //check if visual is loaded
        });
        cy.get(this.productTitle).should('be.visible');
        cy.get(this.productWriter).should('be.visible');
        cy.get(this.productPrice).should('be.visible');
    });
}

//Hover price button and check the change in the button
hoverPriceButton() {
  cy.get('.product-item')  //select any product card
    .first()                //select the first product card
    .realHover();           //initialize hover

  cy.get('.product-item')
    .first()
    .find('.add-to-cart-btn')
    .should('be.visible').and('contain.text', 'Sepete Ekle'); //check text
}

searchResultCheck(bookName) {
  cy.get(this.productCard).first().invoke('text').then(text => {
    const normalizedText = text.toLowerCase().trim();
    expect(normalizedText).to.contain(bookName.toLowerCase());
  });
}

obsoleteSearchResultCheck() {
  cy.get(this.productCard).should('not.exist');
}

sortButtonCheck () {
  cy.get(this.sortOptions).should('contain.text', 'Fiyat Artan');
  cy.get(this.sortOptions).should('contain.text', 'Fiyat Azalan');
  cy.get(this.sortOptions).should('contain.text', 'Varsayılan Sıralama');
  cy.get(this.sortOptions).should('contain.text', 'Yeniden Eskiye');
  cy.get(this.sortOptions).should('contain.text', 'Eskiden Yeniye');
}

sortingCheck () {
  cy.get(this.sortButton).select('Fiyat Azalan');
cy.get('.product-price')
  .then(($prices) => {
    const priceArray = [...$prices].map(priceEl => {
      const priceText = priceEl.innerText.trim();
      return parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'));
    });

    const sortedDesc = [...priceArray].sort((a, b) => b - a);

    // Debug için logla
    cy.log('Original prices: ' + priceArray.join(', '));
    cy.log('Sorted (desc): ' + sortedDesc.join(', '));
    console.log('Original:', priceArray);
    console.log('Sorted Desc:', sortedDesc);

    expect(priceArray, 'Prices should be in descending order').to.deep.equal(sortedDesc);
  }); 
}

filterCategoryCheck () {
  cy.get(this.filterCategory)
    .should('contain.text', 'Kategoriler')
    .and('contain.text', 'Marka')
    .and('contain.text', 'Model')
  cy.get('#filter-categories-1012').click();
  cy.url().should('include', 'category=1012');
}

scrollToLoadPage () {
  // Mevcut ürün sayısını al
cy.get('.product-item').then(($products) => {
  const initialCount = $products.length;

  // Scroll yap
  cy.scrollTo('bottom');

  // Yeni ürünlerin eklenmesini bekle ve sayıyı kontrol et
  cy.get('.product-item', { timeout: 10000 }).should('have.length.greaterThan', initialCount);
});
}

}

export default new search();