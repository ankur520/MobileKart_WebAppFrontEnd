import VendorDashboard from "../../../../src/Components/vendor/VendorDashboard";

describe("User Dashboard Component ", () => {
  beforeEach(() => {
    cy.mount(<VendorDashboard />);
  });

  it("shoud render", () => {
    cy.get("div[data-cy='vendorDashboard']").should("exist");
  });

  it("shoud render with Welcome Text", () => {
    cy.get("div[data-cy='vendorDashboard'] h4[data-cy='vendorWelcomeMsg'] ").should(
      "have.text",
      "Vendor Dashboard"
    );
  });
});
