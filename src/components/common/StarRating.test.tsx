import React from "react";
import { render, screen } from "@testing-library/react";
import StarRating from "./StarRating";

describe("StarRating Component", () => {
  it("should render the correct number of stars", () => {
    const totalStars = 5;
    render(<StarRating rating={3} />);

    const stars = screen.getAllByRole("img");
    expect(stars.length).toBe(totalStars);
  });

  it("should render the correct percentage of filled stars", () => {
    const rating = 3.5;
    render(<StarRating rating={rating} />);

    const filledStars = screen.getAllByRole("img");
    filledStars.forEach((star, index) => {
      const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
      const starElement = star.querySelector("div.bg-yellow-500");

      if (fillPercentage > 0) {
        expect(starElement).toHaveStyle(`width: ${fillPercentage}%`);
      }
    });
  });

  it("should not fill stars when the rating is zero", () => {
    render(<StarRating rating={0} />);

    const filledStars = screen.getAllByRole("img");
    filledStars.forEach((star) => {
      const starElement = star.querySelector("div.bg-yellow-500");
      expect(starElement).toHaveStyle("width: 0%");
    });
  });

  it("should fully fill stars when the rating is equal to the total number of stars", () => {
    const totalStars = 5;
    render(<StarRating rating={totalStars} />);

    const filledStars = screen.getAllByRole("img");
    filledStars.forEach((star) => {
      const starElement = star.querySelector("div.bg-yellow-500");
      expect(starElement).toHaveStyle("width: 100%");
    });
  });

  it("should correctly handle fractional ratings", () => {
    const rating = 2.3;
    render(<StarRating rating={rating} />);

    const stars = screen.getAllByRole("img");
    stars.forEach((star, index) => {
      const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
      const starElement = star.querySelector("div.bg-yellow-500");

      expect(starElement).toHaveStyle(`width: ${fillPercentage}%`);
    });
  });
});
