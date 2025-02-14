import React from "react";
import { render, screen } from "@testing-library/react";
import BannerSection from "./BannerSection";
import Button from "../../common/Button";

jest.mock("../../common/Button", () => {
  return ({ label }: { label: string }) => <button>{label}</button>;
});

describe("BannerSection Component", () => {
  it("should render the banner image", () => {
    render(<BannerSection />);
    const bannerImage = screen.getByAltText("");
    expect(bannerImage).toBeInTheDocument();
    expect(bannerImage).toHaveAttribute(
      "src",
      "https://desafio-3.s3.us-east-1.amazonaws.com/banner.jpeg"
    );
    expect(bannerImage).toHaveClass("sm:hidden lg:flex w-full h-full object-cover");
  });

  it("should render the title 'New Arrival'", () => {
    render(<BannerSection />);
    const title = screen.getByText("New Arrival");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("sm:hidden lg:flex font-semibold");
  });

  it("should render the subtitle 'Discover Our'", () => {
    render(<BannerSection />);
    const subtitle = screen.getByText("Discover Our");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass(
      "lg:text-[52px] sm:text-[20px] lg:text-left sm:text-center font-bold text-[#B88E2F] lg:mt-0 sm:mt-6"
    );
  });

  it("should render the text 'New Collection'", () => {
    render(<BannerSection />);
    const collectionText = screen.getByText("New Collection");
    expect(collectionText).toBeInTheDocument();
    expect(collectionText).toHaveClass(
      "text-[52px] font-bold text-[#B88E2F] lg:text-left sm:text-center"
    );
  });

  it("should render the description text", () => {
    render(<BannerSection />);
    const description = screen.getByText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis."
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("lg:text-[18px] sm:text-[12px] text-[#333333] lg:mb-10 sm:mb-10");
  });

  it("should render the 'BUY NOW' button", () => {
    render(<BannerSection />);
    const button = screen.getByText("BUY NOW");
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });
});
