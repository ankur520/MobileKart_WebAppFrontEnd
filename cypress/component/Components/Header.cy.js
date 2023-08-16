import Header from "../../../src/Components/Header";

describe("Header Component ", () => {
  beforeEach(() => {
    cy.mount(<Header />);
  });

  it("Header Should Render ", () => {
    cy.get("header[data-cy='header']").should("exist");
  });

  it("Search Box should render ", () => {
    cy.get(
      "header[data-cy='header'] input[data-cy='productSearchInput']"
    ).should("exist");
  });

  it("Dropdown should render ", () => {
    cy.get('header[data-cy="header"] [data-cy="loginBtn"]').should("exist");
  });

  it("Dropdown Vendor Sign In Btn without jwt Token Should Render ", () => {
    cy.get('header[data-cy="header"] [data-cy="vendorSign"]').should("exist");
  });

  it("Dropdown User Sign In Btn without jwt Token Should Render", () => {
    cy.get('header[data-cy="header"] [data-cy="userSign"]').should("exist");
  });
});
