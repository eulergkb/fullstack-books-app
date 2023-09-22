describe('sign up new user', () => {

  let username = "sample-user-" + (new Date()).getTime();
  let password = "123qwe";

  it("should register new user", () => {

    cy.visit('http://localhost:3000/register');

    cy.get("[data-testid=\"username\"]")
        .type(username);

    cy.get("[data-testid=\"firstName\"]")
        .type("Test");

    cy.get("[data-testid=\"lastName\"]")
        .type("User");

    cy.get("[data-testid=\"password\"]")
        .type(password);

    cy.get("[data-testid=\"register\"]").click();

    cy.location().should(location =>  expect(location.pathname).to.eq('/dashboard') )

  });

  it("should login and logout", () => {

    cy.visit('http://localhost:3000/login');

    cy.on('window:confirm', () => true);

    cy.get("[data-testid=\"username\"]")
        .type(username);

    cy.get("[data-testid=\"password\"]")
        .type(password);

    cy.get("[data-testid=\"login\"]").click();

    cy.location().should(location =>  expect(location.pathname).to.eq('/dashboard') )

    cy.get("[data-testid=\"user-profile-icon\"]")
        .click();

    cy.get("[data-testid=\"logout\"]")
        .click();

    cy.location().should(location =>  expect(location.pathname).to.eq('/login') )

  })

})
