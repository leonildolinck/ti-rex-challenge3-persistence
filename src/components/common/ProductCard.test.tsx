import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ProductCard from "./ProductCard";
import Product from "../../services/ProductInterface";

describe("ProductCard Component", () => {
  const mockProduct: Product = {
    id: "1",
    name: "Test Product",
    type: "Electronics",
    price: 150,
    oldPrice: 200,
    scene: ["https://example.com/image.jpg"],
  };

  it("should render the product name and type", () => {
    render(
      <Router>
        <ProductCard product={mockProduct} viewMode="grid" />
      </Router>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });

  it("should display the discount percentage when old price is greater than actual price", () => {
    render(
      <Router>
        <ProductCard product={mockProduct} viewMode="grid" />
      </Router>
    );

    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("should display 'New' badge when there is no discount", () => {
    const productWithoutDiscount = { ...mockProduct, oldPrice: 150 };
    render(
      <Router>
        <ProductCard product={productWithoutDiscount} viewMode="grid" />
      </Router>
    );

    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("should render product price and old price", () => {
    render(
      <Router>
        <ProductCard product={mockProduct} viewMode="grid" />
      </Router>
    );

    expect(screen.getByText("R$ 150")).toBeInTheDocument();
    expect(screen.getByText("R$ 200")).toBeInTheDocument();
  });

  it("should render image with correct src and alt attributes", () => {
    render(
      <Router>
        <ProductCard product={mockProduct} viewMode="grid" />
      </Router>
    );

    const image = screen.getByAltText("Test Product");
    expect(image).toHaveAttribute("src", mockProduct.scene?.[0]);
  });

  it("should render the grid view layout", () => {
    render(
      <Router>
        <ProductCard product={mockProduct} viewMode="grid" />
      </Router>
    );

    expect(screen.getByText("Add to cart")).toBeInTheDocument();
  });

  it("should render the list view layout without hover effects", () => {
    render(
      <Router>
        <ProductCard product={mockProduct} viewMode="list" />
      </Router>
    );

    expect(screen.queryByText("Add to cart")).not.toBeInTheDocument();
  });
});
