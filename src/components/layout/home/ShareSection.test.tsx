import React from "react";
import { render, screen } from "@testing-library/react";
import ShareSection from "./ShareSection";

jest.mock("./ShareSection", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("ShareSection Component", () => {
  it("should render Share your setup with title", () => {
    render(<ShareSection />);
    const title = screen.getByText("Share your setup with");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("mt-24 text-[20px] font-poppins font-medium text-center");
  });

  it("should render the #FurniroFurniture hashtag", () => {
    render(<ShareSection />);
    const hashtag = screen.getByText("#FurniroFurniture");
    expect(hashtag).toBeInTheDocument();
    expect(hashtag).toHaveClass("text-[40px] font-poppins font-bold text-center");
  });

  it("should render a grid of photos", () => {
    render(<ShareSection />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(9);
  });

  it("should set random dimensions for each image", () => {
    render(<ShareSection />);
    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      const style = img.parentElement?.getAttribute("style");
      expect(style).toMatch(/width: \d+px/);
      expect(style).toMatch(/height: \d+px/);
    });
  });
});
