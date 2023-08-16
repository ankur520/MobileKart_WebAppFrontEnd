import UserDashboard from "../../../../src/Components/user/UserDashboard";

describe("User Dashboard Component ", () => {
  beforeEach(() => {
    cy.mount(<UserDashboard />);
  });

  it("shoud render", () => {
    cy.get("div[data-cy='userDashboard']").should("exist");
  });

  it("shoud render with Welcome Text", () => {
    cy.get("div[data-cy='userDashboard'] h4[data-cy='userWelcomeMsg'] ").should(
      "have.text",
      "User Dashboard"
    );
  });
});
