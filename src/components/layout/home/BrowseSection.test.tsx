import React from "react";
import { render, screen } from "@testing-library/react";
import BrowseSection from "./BrowseSection";

describe("BrowseSection Component", () => {
  it("should render the section title 'Browse the Range'", () => {
    render(<BrowseSection />);
    const title = screen.getByText("Browse the Range");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("font-bold text-2xl md:text-[32px] text-center");
  });

  it("should render the subtitle", () => {
    render(<BrowseSection />);
    const subtitle = screen.getByText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    );
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass("text-base md:text-[20px] text-center mt-2");
  });

  it("should render three items in the grid", () => {
    render(<BrowseSection />);
    const items = screen.getAllByRole("img");
    expect(items).toHaveLength(3);
  });

  it("should render the correct titles for each item", () => {
    render(<BrowseSection />);
    const diningTitle = screen.getByText("Dining");
    const livingTitle = screen.getByText("Living");
    const bedroomTitle = screen.getByText("Bedroom");
    expect(diningTitle).toBeInTheDocument();
    expect(livingTitle).toBeInTheDocument();
    expect(bedroomTitle).toBeInTheDocument();
  });

  it("should render images with correct sources and alt texts", () => {
    render(<BrowseSection />);
    const diningImage = screen.getByAltText("Dining");
    const livingImage = screen.getByAltText("Living");
    const bedroomImage = screen.getByAltText("Bedroom");
    expect(diningImage).toHaveAttribute(
      "src",
      "https://desafio-3.s3.us-east-1.amazonaws.com/browse-1.png"
    );
    expect(livingImage).toHaveAttribute(
      "src",
      "https://desafio-3.s3.us-east-1.amazonaws.com/browse-2.png"
    );
    expect(bedroomImage).toHaveAttribute(
      "src",
      "https://desafio-3.s3.us-east-1.amazonaws.com/browse-3.png"
    );
  });

  it("should render item titles with correct styling", () => {
    render(<BrowseSection />);
    const itemTitles = screen.getAllByText(/Dining|Living|Bedroom/);
    itemTitles.forEach((title) => {
      expect(title).toHaveClass(
        "mt-4 md:mt-7 font-semibold text-lg md:text-[24px]"
      );
    });
  });
});
