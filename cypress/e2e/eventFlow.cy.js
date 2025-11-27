// cypress/e2e/eventFlow.cy.js
describe("Event Flow", () => {
  it("Registers, logs in, creates event, buys ticket", () => {
    cy.visit("http://localhost:5173/register");

    cy.get("input[placeholder='Full Name']").type("Celestine");
    cy.get("input[placeholder='Email']").type("test@test.com");
    cy.get("input[placeholder='Password']").type("123456");
    cy.contains("Create Account").click();

    cy.visit("http://localhost:5173/login");
    cy.get("input[placeholder='Email']").type("test@test.com");
    cy.get("input[placeholder='Password']").type("123456");
    cy.contains("Login").click();

    cy.request("POST", "http://localhost:5000/api/events", {
      title: "Sample Event",
      description: "Test",
      date: "2025-06-01"
    }).then((res) => {
      const eventId = res.body.event._id;

      cy.request(
        "POST",
        `http://localhost:5000/api/tickets/purchase/${eventId}`
      ).its("status").should("eq", 200);
    });
  });
});
