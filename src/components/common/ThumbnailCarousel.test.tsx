import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThumbnailCarousel from "./ThumbnailCarousel";
import Product from "../../services/ProductInterface";

describe("ThumbnailCarousel Component", () => {
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Product 1",
      type: "Category 1",
      price: 100,
      oldPrice: 150,
      scene: ["https://example.com/product1.jpg"],
      image: ["https://example.com/product1.jpg"],
      description: "Description1",
      additional: "Additional 1",
      size: "size 1",
      color: "color 1",
      category: "furniture 1",
      SKU: "123",
      tags: ['tag1', 'tag2'],
    },
  ];

  it("should render the main image and thumbnails correctly", () => {
    render(<ThumbnailCarousel products={mockProducts} />);

    const mainImage = screen.getByAltText("");
    const thumbnails = screen.getAllByRole("img", { name: /Thumbnail/i });

    expect(mainImage).toHaveAttribute("src", mockProducts[0].image[0]);
    expect(thumbnails).toHaveLength(mockProducts[0].image.length - 1);
    thumbnails.forEach((thumbnail, index) => {
      expect(thumbnail).toHaveAttribute("src", mockProducts[0].image[index + 1]);
    });
  });

  it("should update the main image when a thumbnail is clicked", () => {
    render(<ThumbnailCarousel products={mockProducts} />);

    const thumbnails = screen.getAllByRole("img", { name: /Thumbnail/i });
    fireEvent.click(thumbnails[1]);

    const mainImage = screen.getByAltText("");
    expect(mainImage).toHaveAttribute("src", mockProducts[0].image[2]);
  });

  it("should display an error message if no active image is available", () => {
    render(<ThumbnailCarousel products={[]} />);

    const errorMessage = screen.getByText("Error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should apply correct styles to main image and thumbnails", () => {
    render(<ThumbnailCarousel products={mockProducts} />);

    const mainImage = screen.getByAltText("");
    const thumbnails = screen.getAllByRole("img", { name: /Thumbnail/i });

    expect(mainImage).toHaveClass("bg-[#F9F1E7] w-full h-full object-contain rounded-lg");
    thumbnails.forEach((thumbnail) => {
      expect(thumbnail).toHaveClass(
        "lg:w-20 lg:h-20 lg:p-2 md:w-20 md:h-20 md:p-2 sm:w-16 sm:h-16 sm:p-2 object-contain rounded-lg cursor-pointer bg-[#F9F1E7]"
      );
    });
  });
});
