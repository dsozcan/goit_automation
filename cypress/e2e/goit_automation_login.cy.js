import login from "../pages/login"
import user from "../fixtures/user.json";

//ignore any error caused by the application
Cypress.on('uncaught:exception', (err, runnable) => {
console.error('Uncaught exception:', err.message);
return false;
});

describe('US01 - login pagnpe', () => {

  it('TC01 user login positive test', () => {
    login.navigateUrl();
    login.navigationPopUp();
    login.loginFormCheck();
    login.userLogIn(user.email_user1, user.password_user1);
    //control of the home page with logged in account
    cy.get('#header-account > .d-none').should('contain', 'Hesabım')
  })

  it('TC02 user wrong password and email entry negative test', () => {
    // login attempt with wrong email format
    login.navigateUrl();
    login.navigationPopUp();
    login.userLogIn(user.email_wrong,user.password_user1);
    //error pop up control
    cy.get('.popover-item.fade-in').should('contain', 'Giriş bilgileriniz hatalı');
    cy.screenshot();


    //login attempt with wrong password
    login.navigateUrl();
    login.navigationPopUp();
    login.userLogIn(user.email_user1,user.password_wrong);
    //error pop up control
    cy.get('.popover-item.fade-in').should('contain', 'Giriş bilgileriniz hatalı')

    //login attempt woth empty spaces
    login.navigateUrl();
    login.navigationPopUp();
    login.userLogIn('',user.password_wrong);
    //error pop up control
    cy.get('.popover-item.fade-in').should('contain', 'Giriş bilgileriniz hatalı')
  })

  it('TC03 forgot my password button check', () => {
    login.navigateUrl();
    login.navigationPopUp();
    login.forgotPassword();
    cy.screenshot();
  })

  it.skip('TC04 multiple login request error', () => {
    login.navigateUrl();
    login.navigationPopUp();
    login.userLogIn(user.email_user1,user.password_wrong); //enter wrong credentials
    for(let i = 0; i < 10; i++) {                          //press login button 10 times
      cy.get(login.loginButton).click();
    }
    //error pop up control
    cy.get('span.popover-item.fade-in.btn.btn-danger.text-left')
      .should('be.visible')
      .and('contain.text', 'Çok fazla istek talebinde bulundunuz');
  })

})