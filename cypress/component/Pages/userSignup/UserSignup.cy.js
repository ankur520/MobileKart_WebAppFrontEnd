import UserSignUp from "../../../../src/Pages/userSignup/UserSignup";

describe("UserSignUp pagw  ", () => {
  it("rendered successfully", () => {
    cy.mount(<UserSignUp />);

    // cy.get("[data-cy='Banner Images Not Available']").should("exist");
  });
});
