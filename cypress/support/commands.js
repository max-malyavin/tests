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
// Cypress.Commands.add("register", () => {
//   cy.intercept(
//     {
//       method: "GET",
//       url: "http://localhost:4200/api/auth/register",
//     },
//     { statusCode: 200, fixture: "register.json" }
//   );
// });

import LoginPage from "./PageObjects/LoginPage";

// Функция для авторизации через логин + пароль
Cypress.Commands.add("makeAuth", (login, pass) => {
  const loginPage = new LoginPage();
  loginPage.getEmailField().type(login);
  loginPage.getPassField().type(pass);
  loginPage.getSubmitBtn().click();
});

// Функция для авторизации только через логин
Cypress.Commands.add("makeAuthOnlyLogin", (login) => {
  const loginPage = new LoginPage();
  loginPage.getEmailField().type(login);
  loginPage.getSubmitBtn().click();
});
