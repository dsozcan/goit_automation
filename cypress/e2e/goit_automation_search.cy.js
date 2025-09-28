import search from "../pages/search"
import login from "../pages/login"
import user from "../fixtures/user.json";

//ignore any error caused by the application
Cypress.on('uncaught:exception', (err, runnable) => {
console.error('Uncaught exception:', err.message);
return false;
});

//open url and login before tests (function defined in support)
describe("US02 - Search Tests", () => {
  
  beforeEach(function () {
    if (this.currentTest.title === "TC01 - Search valid keyword and check actions") {
      cy.login();
      cy.log("TC01 için beforeEach atlanıyor");
      return;
    }

    cy.visit(user.url_homepage);
    cy.get('body').then(($body) => {
      const $btn = $body.find(login.cookieAcceptField);
      if ($btn.length && $btn.is(':visible')) {
        cy.wrap($btn).click();
      }
    });
  });


  it("TC01 - Search valid keyword and check actions", () => {
    cy.get(search.loginButton, { timeout: 10000 }).should('not.exist');
    search.searchBook('b');         //search any keyword
    search.checkSearchBarEmpty ();  //check the searchbar is empty after search is completed
    search.checkProductCard ();     //check the product card informations are full
    search.hoverPriceButton ();     //inspect the change in price button during hover action
    cy.screenshot();
  });

  it("TC02 - Search results check", () => {
    search.searchBook(user.bookName);         //search a keyword
    search.searchResultCheck(user.bookName);  //check if the results are relevant
    cy.screenshot();
  })

  it("TC03 - Obsolete earch results check", () => {
    search.searchBook(user.obsoleteBookName);   //search an onsolete keyword
    search.obsoleteSearchResultCheck();         //check that no results are being shown
    cy.screenshot();
  })

  it("TC04 - Search results sorting check", () => {
    search.searchBook(user.bookName);
    search.sortButtonCheck();           //sort button variable check
    search.sortingCheck();              //sorting results check
  })

  it("TC05 - Scroll for new page test", () => {
    search.searchBook(user.bookName);
    search.scrollToLoadPage();        //check if new page is being loaded when scrolled to bottom
  })

  it("TC06 - Filter results check", () => {
    search.searchBook(user.bookName);
    search.filterCategoryCheck();   //filter action results check
  })

});