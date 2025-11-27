describe("Event Flow", () => {
  it("Registers, creates event, buys ticket", () => {
    cy.visit("/register");

    cy.get("input[name='name']").type("Cypress User");
    cy.get("input[name='email']").type(`test${Date.now()}@mail.com`);
    cy.get("input[name='password']").type("password");

    cy.contains("Register").click();
    cy.url().should("include", "/dashboard");

    cy.window().then(() => {
      const token = localStorage.getItem("token");

      cy.request({
        method: "POST",
        url: "http://localhost:5000/api/events",
        headers: { Authorization: `Bearer ${token}` },
        body: {
          title: "Cypress Event",
          description: "Testing",
          startDate: new Date().toISOString(),
          price: 0
        }
      }).then((res) => {
        const event = res.body;
        cy.visit(`/events/${event._id}`);
        cy.contains("Buy Ticket").click();
        cy.contains("Tickets purchased!");
      });
    });
  });
});
