import BannerComponent from "../../../../../src/Components/HomePageComponents/BannerCarousel/Banner.js";
import { CarouselImages } from "../../../../../src/Utils/Util.js";

import { ProductBox } from "../../../../../src/Components/HomePageComponents/ProductCarousel/ProductBox.js";

describe("Home Page Banner Carousel  ", () => {
  it("without images", () => {
    cy.mount(<BannerComponent imageArray={[]} />);
    cy.get("[data-cy='Banner Images Not Available']").should("exist");
  });

  it("with images", () => {
    cy.mount(<BannerComponent imageArray={CarouselImages} />);
    // cy.get("[data-cy='Banner Images Available']").should("exist");  //button[@aria-label='Next Slide']
    cy.get(
      "div[class='react-slideshow-container'] div[class='react-slideshow-wrapper slide '] div[class='images-wrap'] div[data-cy='Banner Images Available']"
    ).should("exist");
  });

  it("Previous Slide Button", () => {
    cy.mount(<BannerComponent imageArray={CarouselImages} />);

    cy.get(
      "div[class='react-slideshow-container'] > button[aria-label='Previous Slide']"
    )
      .should("exist")
      .click()
      .click();
  });

  it("Next Slide Button", () => {
    cy.mount(<BannerComponent imageArray={CarouselImages} />);

    cy.get(
      "div[class='react-slideshow-container'] > button[aria-label='Next Slide']"
    )
      .should("exist")
      .click()
      .click();
  });
});
