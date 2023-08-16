import PlacedOrdersList from "../../../../src/Components/user/PlacedOrdersList";

describe("User Dashboard Component ", () => {
  beforeEach(() => {
    cy.mount(<PlacedOrdersList />);
  });

  it("shoud render", () => {
    cy.get("div[data-cy='placedOrdersList']").should("exist");
  });


});
