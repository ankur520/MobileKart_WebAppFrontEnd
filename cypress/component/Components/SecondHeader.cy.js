import SecondHeader from "../../../src/Components/SecondHeader";

describe("SecondHeader Component ", () => {
  it("SecondHeader Should Render ", () => {
    cy.mount(<SecondHeader />);
    cy.get("section[data-cy='secondHeader']").should("exist")
  });
});
