/// <refrence types="cypress" />

describe("HomePage.js E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Header without jwt token", () => {
    // check token available in local storage or not  vendorLoginToken
    expect(localStorage.getItem("userLoginToken")).to.be.null;
    expect(localStorage.getItem("vendorLoginToken")).to.be.null;

    // should visible
    cy.get(
      "header[data-cy='header'] div[data-cy='dropdownBox'] a[data-cy='vendorSign']"
    ).should("exist");
    cy.get(
      "header[data-cy='header'] div[data-cy='dropdownBox'] a[data-cy='userSign']"
    ).should("exist");

    // should not visible because not logged in
    cy.get(
      "header[data-cy='header'] div[data-cy='dropdownBox'] a[data-cy='userDashboard']"
    ).should("not.exist");
    cy.get(
      "header[data-cy='header'] div[data-cy='dropdownBox'] a[data-cy='vendorDashboard']"
    ).should("not.exist");

    // check cart
    cy.get("header[data-cy='header'] span[data-cy='cartWithOutLogin']").should(
      "exist"
    );
    cy.get("header[data-cy='header'] span[data-cy='cartWithLogin']").should(
      "not.exist"
    );

    // dropdown testing
    // dropdown content dont visible
    cy.get(
      "header[data-cy='header'] div[data-cy='dropdownBox'] div[class='dropdown-content']"
    ).should("not.be.visible");

    // Dropdown ON HOVER  with invoke
    cy.get(
      "header[data-cy='header'] div[data-cy='dropdownBox'] div[class='dropdown-content']"
    )
      .invoke("attr", "style", "display: block")
      .should("have.attr", "style", "display: block");

    // check dropdown content on hover showing or not with all anchor tags
    cy.get(
      "header[data-cy='header'] div[data-cy='dropdownBox'] div[class='dropdown-content'] > a"
    ).should("exist");

    // Dropdown OFF HOVER with invoke
    cy.get(
      "header[data-cy='header'] div[data-cy='dropdownBox'] div[class='dropdown-content']"
    )
      .invoke("attr", "style", "display: none")
      .should("have.attr", "style", "display: none");

    cy.get(
      "header[data-cy='header'] div[data-cy='dropdownBox'] div[class='dropdown-content']"
    ).should("not.be.visible");
  });
});
