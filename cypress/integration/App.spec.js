import { makeServer } from "../../src/mirage/server";
import LoginPage from "../support/PageObjects/LoginPage";

let server;

beforeEach(() => {
  server = makeServer();
});

afterEach(() => {
  server.shutdown();
});

const accountEmail_1 = "admin@mail.ru";
const accountPas_1 = "admin";
const accountEmail_2 = "test@mail.ru";
const accountPas_2 = "test123";

const email = (value) => cy.get("#email").type(value).should("have.value", value);
const password = (value) => cy.get("#password").type(value).should("have.value", value);
const containsAndClick = (value) => cy.contains(value).click();

describe("Аутентификация и регистрация", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  const loginPage = new LoginPage();

  it("Страница успешно загружается", () => {
    cy.title().should("eq", "Tests");
  });

  it("Валидные логин и пароль", () => {
    cy.makeAuth(accountEmail_1, accountPas_1);
  });

  it("Валидные логин и пароль с пробелами в полях", () => {
    cy.makeAuth("   " + accountEmail_1, accountPas_1 + "    ");
  });

  it("Валидный логин, невалидный пароль", () => {
    cy.makeAuth(accountEmail_1, "fakepass");
    loginPage.getWrongEmailOrPassError().should("exist");
  });

  it("Невалидный логин, невалидный пароль", () => {
    cy.makeAuth("fakelogin", "fakepass");
    loginPage.getValidMailError().should("exist");
  });

  it("Невалидный логин, валидный пароль", () => {
    cy.makeAuth("fakelogin", "admin");
    loginPage.getValidMailError().should("exist");
  });

  it("Пустые поля с логином и паролем", () => {
    loginPage.getSubmitBtn().click();
    loginPage.getEmailError().should("exist");
    loginPage.getPassError().should("exist");
  });

  it("Пустое поле с логином, пароль заполнен", () => {
    cy.makeAuth(" ", "admin");
    loginPage.getEmailError().should("exist");
  });

  it("Пустое поле с паролем, логин заполнен", () => {
    cy.makeAuthOnlyLogin(accountEmail_1);
    loginPage.getPassError().should("exist");
  });

  it("Успешная аутентификация", () => {
    cy.contains("Вход");
    email(accountEmail_1);
    password(accountPas_1);
    containsAndClick("Логин");
    cy.contains("Загрузка");
    cy.contains(accountEmail_1);
  });

  it("Переход на регистрацию - успешная регистрация - успешная аутентификация", () => {
    cy.contains("Вход");
    cy.contains("Создать новый аккаунт").click();
    cy.contains("Регистрация");
    cy.url().should("include", "/signup");
    email(accountEmail_2);
    password(accountPas_2);
    containsAndClick("Зарегистрироваться");
    cy.contains("Загрузка");
    containsAndClick("У меня уже есть аккаунт");
    cy.contains("Вход");
    cy.url().should("include", "/");
    email(accountEmail_2);
    password(accountPas_2);

    containsAndClick("Логин");
    cy.contains("Загрузка");
    cy.contains(accountEmail_2);
  });

  it("Неуспешная регистрация - занята почта", () => {
    cy.contains("Создать новый аккаунт").click();
    cy.url().should("include", "/signup");
    email(accountEmail_1);
    password("pas123");
    containsAndClick("Зарегистрироваться");
    cy.contains("Загрузка");
    cy.contains("Пользователь с таким email уже существует.");
  });

  it("Неуспешная аутентификация - нет пользователя с таким email", () => {
    cy.contains("Вход");
    email("lol123@mail.ru");
    password("123");
    containsAndClick("Логин");
    cy.contains("Загрузка");
    cy.contains("Нет пользователя с таким email.");
  });
});

describe("Восстановление пароля с помощью почты", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Неуспешное восстановление пароля - пользователя с таким адресом не зарегистрировано", () => {
    cy.get("a").contains("Забыли пароль?").click();
    cy.url().should("include", "/forgot_password");
    email("lol333@mail.ru");
    containsAndClick("Восстановить");
    cy.contains("Загрузка");
    cy.contains("Пользователя с таким адресом не зарегистрировано");
  });

  it("Успешное восстановление пароля", () => {
    cy.get("a").contains("Забыли пароль?").click();
    cy.url().should("include", "/forgot_password");
    email(accountEmail_1);
    containsAndClick("Восстановить");
    cy.contains("Загрузка");
    cy.contains("Успешно. Обновите пароль! Пожалуйста проверяйте почту!");
  });

  it("Невалидная почта", () => {
    cy.get("a").contains("Забыли пароль?").click();
    cy.url().should("include", "/forgot_password");
    const loginPage = new LoginPage();
    loginPage.getEmailField().type("fake_email");
    loginPage.getSubmitBtn().click();
    loginPage.getValidMailError().should("exist");
  });
});

describe("Ошибка 404", function () {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Пользовательская ошибка 404", function () {
    cy.visit("/qwerty");
    cy.url().should("include", "/qwerty");
    cy.get("h1").should("contain", "404 Ошибка");
    cy.get("p").should("contain", "Страница не найдена");
    cy.get("a").contains("На главную").click();
    cy.url().should("include", "/");
    cy.contains("Вход");
  });
});
