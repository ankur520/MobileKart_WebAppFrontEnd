import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom"

import ProductCarousel from "./ProductCarousel";

describe("ProductCarousel.js Products Carousel ", () => {
  test("Checking When Array is Empty", () => {
    render(<ProductCarousel productsArray={[]} subCategory="" />);

    const elementHeading = screen.getByRole("heading", {
      name: /sorry products not available/i,
    });

    expect(elementHeading).toBeInTheDocument();
  });

});
