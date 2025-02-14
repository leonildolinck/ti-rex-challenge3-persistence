import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TopBanner from "./TopBanner";

describe("TopBanner Component", () => {
  const mockTitle = "Test Title";
  const mockLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <TopBanner title={mockTitle} links={mockLinks} />
      </BrowserRouter>
    );

  it("should render the title correctly", () => {
    renderComponent();
    const titleElement = screen.getByText(mockTitle);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(
      "font-poppins text-black lg:text-[48px] md:text-[28px] sm:text-[14px] font-medium"
    );
  });

  it("should render all links with correct labels and href attributes", () => {
    renderComponent();
    const linkElements = screen.getAllByRole("link");

    expect(linkElements).toHaveLength(mockLinks.length);
    linkElements.forEach((link, index) => {
      expect(link).toHaveTextContent(mockLinks[index].label);
      expect(link).toHaveAttribute("href", mockLinks[index].to);
    });
  });

  it("should display separators between links except after the last one", () => {
    renderComponent();
    const separatorImages = screen.getAllByAltText("separator");

    expect(separatorImages).toHaveLength(mockLinks.length - 1);
    separatorImages.forEach((separator) => {
      expect(separator).toHaveClass("lg:w-[8px] md:w-[4px] sm:w-[5px] h-auto");
    });
  });

  it("should render the banner background image", () => {
    renderComponent();
    const bannerImage = screen.getByAltText("Top Banner");

    expect(bannerImage).toBeInTheDocument();
    expect(bannerImage).toHaveAttribute(
      "src",
      "https://desafio-3.s3.us-east-1.amazonaws.com/banner-blur.png"
    );
    expect(bannerImage).toHaveClass(
      "w-full lg:h-[316px] md:h-[200px] sm:h-[120px] object-cover"
    );
  });

  it("should render the logo correctly", () => {
    renderComponent();
    const logoImage = screen.getByAltText("Logo");

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute(
      "src",
      "https://desafio-3.s3.us-east-1.amazonaws.com/logo.png"
    );
    expect(logoImage).toHaveClass("lg:w-[77px] md:w-[37px] sm:w-[27px] h-auto");
  });
});
