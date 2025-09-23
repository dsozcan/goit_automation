import login from "../pages/login"
import user from "../fixtures/user.json";

//ignore any error caused by the application
Cypress.on('uncaught:exception', (err, runnable) => {
console.error('Uncaught exception:', err.message);
return false;
});

describe('US01 login page', () => {

  it('TC01 user login positive test', () => {
    login.navigateUrl();
    login.navigationPopUp();
    login.loginFormCheck();
    login.userLogIn(user.email_user1, user.password_user1);
    cy.get('#header-account > .d-none').should('contain', 'Hesabım')
  })

  it('TC02 user wrong password and email entry negative test', () => {
    // login attempt with wrong email format
    login.navigateUrl();
    login.navigationPopUp();
    login.userLogIn(user.email_wrong,user.password_user1);
    cy.get('#header-email').should('contain', 'Giriş bilgileriniz hatalı')


    //login attempt with wrong password
    login.navigateUrl();
    login.navigationPopUp();
    login.userLogIn(user.email_user1,user.password_wrong);
    cy.get('#header-email').should('contain', 'Giriş bilgileriniz hatalı')

    //login attempt woth empty spaces
    login.navigateUrl();
    login.navigationPopUp();
    login.userLogIn('',user.password_wrong);
    cy.get('#header-email').should('contain', 'Giriş bilgileriniz hatalı')
  })

  it('TC03 forgot my password button check', () => {
    login.navigateUrl();
    login.navigationPopUp();
    login.forgotPswrd();
  })

})