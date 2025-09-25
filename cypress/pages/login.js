class login{

    cookieAcceptField = '.cc-nb-okagree';
    loginFormButton = '.member-login-btn';
    emailField = '#header-email';
    passwordField = '#header-password';
    forgotPasswordField = '.flex-wrap > .text-gray';
    remindPasswordButton = '#forgot-password-btn-292';
    loginButton = '#login-btn-322';
    rememberMeCheckbox = 'form.w-100 > .flex-wrap > .d-flex';
    registerButton = '#register-btn-322';
    rememberMeButton = 'form.w-100 > .flex-wrap > .d-flex > .input-checkbox';

    // url visit method
    navigateUrl () {
        // visit site url given in user document
        cy.fixture("user").then((data) => {
            cy.visit(data.url);
        });

        // Accept cookies only if button exists AND is visible
        cy.get('body').then(($body) => {
            const $btn = $body.find(this.cookieAcceptField);
            if ($btn.length && $btn.is(':visible')) {
                cy.wrap($btn).click();
            }
        });
    }

    // open login form method
    navigationPopUp () {
        cy.get(this.loginFormButton).click();
    }

    // login pop up buttons check
    loginFormCheck () {
        cy.get(this.emailField).should('exist');
        cy.get(this.passwordField).should('exist');
        cy.get(this.forgotPasswordField).should('exist');
        cy.get(this.loginButton).should('exist');
        cy.get(this.rememberMeCheckbox).should('exist');
        cy.get(this.registerButton).should('exist');
    }


    // Fill user email and password informations and click Log In button
    userLogIn (email = null, password) {
        cy.get(this.emailField).clear();
        if (email) {
            cy.get(this.emailField).type(email);
        }
        cy.get(this.passwordField).type(password);
        cy.get(this.loginButton).click();
       // cy.wait(5000);

    }

    // forgot password button check
    forgotPswrd () {
        cy.get(this.forgotPasswordField).click();
        cy.get(this.remindPasswordButton).should('exist');
    }

}

export default new login();