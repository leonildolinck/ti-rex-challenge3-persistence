import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InspirationSection from "./InspirationSection";

describe("InspirationSection Component", () => {
  it("should render the section title '50+ Beautiful Rooms Inspiration'", () => {
    render(<InspirationSection />);
    const title = screen.getByText("50+ Beautiful Rooms Inspiration");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("lg:text-[40px] sm:text-[30px] font-bold mb-4 text-[#3A3A3A] text-center md:mt-4");
  });

  it("should render the description text", () => {
    render(<InspirationSection />);
    const description = screen.getByText(
      "Our designer already made a lot of beautiful prototypes of rooms that inspire you."
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("lg:text-lg lg:mb-6 font-medium text-[#616161] sm:mb-6");
  });

  it("should render a Splide carousel with images", () => {
    render(<InspirationSection />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    images.forEach((img) => {
      expect(img).toHaveAttribute("src");
    });
  });

  it("should have correct classes for the active and inactive slides", () => {
    render(<InspirationSection />);
    const slides = screen.getAllByRole("img");
    slides.forEach((slide, index) => {
      const slideDiv = slide.closest('div');
      if (index === 0) {
        expect(slideDiv).toHaveClass("active-slide w-[404px] h-[582px]");
      } else {
        expect(slideDiv).toHaveClass("inactive-slide w-[372px] h-[486px]");
      }
    });
  });

  it("should change the active slide when the arrow button is clicked", () => {
    render(<InspirationSection />);
    const nextButton = screen.getByText("→");
    fireEvent.click(nextButton);
    const slides = screen.getAllByRole("img");
    const activeSlide = slides.find((slide) =>
      slide.closest('div')?.classList.contains("active-slide")
    );
    expect(activeSlide).toBeTruthy();
  });

  it("should render the slide content when active", () => {
    render(<InspirationSection />);
    const activeSlideContent = screen.getByText("01 ⸺ Bed Room");
    expect(activeSlideContent).toBeInTheDocument();
    expect(activeSlideContent).toHaveClass("mb-2");
  });

  it("should render the correct description for each slide", () => {
    render(<InspirationSection />);
    const descriptions = [
      "Inner Peace",
      "Simple Clean",
      "Modern Stylish",
      "Retro Fancy",
      "Retro Black"
    ];
    descriptions.forEach((description) => {
      const descriptionElement = screen.getByText(description);
      expect(descriptionElement).toBeInTheDocument();
    });
  });
});
