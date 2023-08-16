import Footer from "../../../src/Components/Footer";

describe("Footer Component ", () => {
  it("Footer Should Render ", () => {
    cy.mount(<Footer />);
    cy.get("footer[data-cy='footer']").should("exist")
  });
});
