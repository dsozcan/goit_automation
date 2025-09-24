// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import login from "../pages/login";
import user from "../fixtures/user.json";

Cypress.Commands.add("login", () => {

    cy.visit(user.url);
    
    cy.get('body').then(($body) => {
        const $btn = $body.find(login.cookieAcceptField);
        if ($btn.length && $btn.is(':visible')) {
            cy.wrap($btn).click();
        }
    });
    
    cy.get(login.loginFormButton).click();
    cy.get(login.emailField).type(user.email_user1);
    cy.get(login.passwordField).type(user.password_user1);
    cy.get(login.loginButton).click();
})