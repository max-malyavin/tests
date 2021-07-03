/// <reference types="cypress" />

// Определяем объекты на странице
class LoginPage {
  getEmailField() {
    return cy.get("[type=email]");
  }
  getPassField() {
    return cy.get("[type=password]");
  }
  getSubmitBtn() {
    return cy.get("[type=submit]");
  }
  getEmailError() {
    return cy.contains("Введите email");
  }
  getPassError() {
    return cy.contains("Введите пароль");
  }
  getValidMailError() {
    return cy.contains("Введите корректный email");
  }
  getWrongEmailOrPassError() {
    return cy.contains("Неверные email или пароль");
  }
}

export default LoginPage;
