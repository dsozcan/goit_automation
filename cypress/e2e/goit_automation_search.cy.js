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
    search.searchBook('a');
    search.checkSearchBarEmpty ();
    search.checkProductCard ();
    search.hoverPriceButton ();
  });

  it("TC02 - Search results check", () => {
    search.searchBook(user.bookName);
    search.searchResultCheck(user.bookName);
  })

  it("TC03 - Obsolete earch results check", () => {
    search.searchBook(user.obsoleteBookName);
    search.obsoleteSearchResultCheck();
  })

  it("TC04 - Search results sorting check", () => {
    search.searchBook(user.bookName);
    search.sortButtonCheck();
    search.sortingCheck();
  })

  it("TC05 - Scroll for new page test", () => {
    search.searchBook(user.bookName);
    search.scrollToLoadPage();
  })

  it("TC06 - Filter results check", () => {
    search.searchBook(user.bookName);
    search.filterCategoryCheck();
  })

});