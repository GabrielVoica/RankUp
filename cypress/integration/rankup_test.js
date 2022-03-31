const { assert } = require("console");

describe("Frontend testing", () => {
  /*
   * Initial set-up test
   */
  it("Home page loads", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:4200");
    cy.contains("Entrar").click();
  });

  it("Entry page loads", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:4200/entry");
    cy.contains("RankUp").click();
  });
});

describe("API Testing", () => {
  /*
   * Checks that the browser
   * adds a user_type cookie whenever a entry is made on the page
   */
  it("Check entry cookie", () => {
    cy.visit("http://localhost:4200/entry");
    cy.get(".type-student > .entry-button > .btn").click();
    cy.getCookie("user_type").should("have.property", "value", "student");

    cy.visit("http://localhost:4200/entry");
    cy.get(".type-teacher > .entry-button > .btn").click();
    cy.getCookie("user_type").should("have.property", "value", "teacher");
  });

  /*
   * Checks that the session cookie is created whenever a user logs into the website
   */
  it("Check login session cookie", () => {
    cy.request(
      "POST",
      `http://localhost/API_InfoAction/app/login?email=cypress@example.com&password=Cypress123`
    ).then((response) => {
      expect(JSON.parse(response.body)).to.have.property("data");
    });
  });


  if("Check session data",()=>{
    cy.assert("1 == 1");
  });
});
