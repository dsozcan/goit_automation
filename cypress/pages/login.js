class login{

    cookieAcceptField = '.cc-nb-okagree';
    loginFormButton = '.member-login-btn';
    emailField = '#header-email';
    passwordField = '#header-password';
    forgotPswrdField = '.flex-wrap > .text-gray';
    remindPswrdButton = '#forgot-password-btn-292';
    loginButton = '#login-btn-322';
    rememberMeChckbx = 'form.w-100 > .flex-wrap > .d-flex';
    registerButton = '#register-btn-322';

    // url visit method
    navigateUrl () {
        //visit site url given in user document
        cy.fixture("user").then((data) => {
        cy.visit(data.url);
        })
        //Accept all cookies
        cy.get(this.cookieAcceptField).click();
    }

    // open login form method
    navigationPopUp () {
        cy.get(this.loginFormButton).click();
    }

    // login pop up buttons check
    loginFormCheck () {
        cy.get(this.emailField).should('exist');
        cy.get(this.passwordField).should('exist');
        cy.get(this.forgotPswrdField).should('exist');
        cy.get(this.loginButton).should('exist');
        cy.get(this.rememberMeChckbx).should('exist');
        cy.get(this.registerButton).should('exist');
    }


    // Fill user email and password informations and click Log In button
    userLogIn (email, password) {
        cy.get(this.emailField).type(email);
        cy.get(this.passwordField).type(password);
        cy.get(this.loginButton).click();
       // cy.wait(5000);

    }

    // forgot password button check
    forgotPswrd () {
        cy.get(this.forgotPswrdField).click();
        cy.get(this.remindPswrdButton).should('exist');
    }

}

export default new login();