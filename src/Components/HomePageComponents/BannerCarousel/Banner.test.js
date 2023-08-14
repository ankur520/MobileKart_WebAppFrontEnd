import { render, screen, fireEvent } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import Banner from "./Banner";

import { CarouselImages } from "../../../Utils/Util";

describe("Home.js Banner Carousel  ", () => {

  test("Checking When images Not Available", () => {
    render(<Banner imageArray={[]} />);

    const carouselElement = screen.getByRole("heading", {
      name: /banner Images Not Available/i,
    });

    expect(carouselElement).toBeInTheDocument();
  });

  test("Checking When images  Available", () => {
    render(<Banner imageArray={CarouselImages} />);

    expect(CarouselImages.length).toBe(CarouselImages.length);
  });

  test("Checking carousel Left Button ", () => {
    render(<Banner imageArray={CarouselImages} />);

    const previousBtn = screen.getByRole("button", {
      name: /previous slide/i,
    });

    userEvent.click(previousBtn);
    userEvent.click(previousBtn);
  });

  test("Checking carousel Right Button ", () => {
    render(<Banner imageArray={CarouselImages} />);

    const rightBtn = screen.getByRole("button", {
      name: /next slide/i,
    });

    userEvent.click(rightBtn);
    userEvent.click(rightBtn);
  });
});
