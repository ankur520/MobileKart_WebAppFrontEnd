import ProductBox from "../../../../../src/Components/HomePageComponents/ProductCarousel/ProductBox.js";

import Carousel from "../../../../../src/Components/HomePageComponents/ProductCarousel/Carousel";

import UserSignUp from "../../../../../src/Pages/userSignup/UserSignup";

describe("Home Page Product Carousel", () => {
  // with this i am bypassing the LINK ERROR
  // Cypress.on('uncaught:exception', (err, runnable) => {
  //   // we expect a 3rd party library error with message 'list not defined'
  //   // and don't want to fail the test so we return false
  //   if (err.message.includes("Cannot destructure property 'basename' of 'react__WEBPACK_IMPORTED_MODULE_0__.useContext(...)' as it is null.")) {
  //     return false
  //   }
  //   // we still want to ensure there are no other unexpected
  //   // errors, so we let them fail the test
  // })

  it("when empty array passed as prop", () => {
    let subCategory = "dsfdfsafasdf";
    cy.mount(<ProductBox productsArray={[]} subCategory={subCategory} />);

    cy.get("div#productCarouselBox span[data-cy='subCategory']").should(
      "have.text",
      subCategory
    );
  });

  it(" when data passed as prop", () => {
    let subCategory = "";
    cy.mount(<ProductBox productsArray={["", ""]} subCategory={subCategory} />);

    cy.get("div#productCarouselBox span[data-cy='subCategory']").not(
      "have.text",
      subCategory
    );
  });
});
