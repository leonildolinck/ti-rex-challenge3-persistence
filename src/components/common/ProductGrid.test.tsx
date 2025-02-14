import React from "react";
import { render, screen } from "@testing-library/react";
import ProductsGrid from "./ProductsGrid";
import Product from "../../services/ProductInterface";
import { BrowserRouter as Router } from "react-router-dom";

describe("ProductsGrid Component", () => {
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
    {
      id: "1",
      name: "Product 1",
      type: "Category 1",
      price: 200,
      oldPrice: 300,
      scene: ["https://example.com/product2.jpg"],
      image: ["https://example.com/product2.jpg"],
      description: "Description22",
      additional: "Additional 2",
      size: "size 2",
      color: "color 2",
      category: "furniture 2",
      SKU: "456",
      tags: ['tag5', 'tag6'],
    },
  ];

  const mockOnAddToCart = jest.fn();

  it("should render the correct number of ProductCard components", () => {
    render(
      <Router>
        <ProductsGrid
          products={mockProducts}
          onAddToCart={mockOnAddToCart}
          viewMode="grid"
        />
      </Router>
    );

    const productCards = screen.getAllByText(/Product \d/);
    expect(productCards.length).toBe(mockProducts.length);
  });

  it("should render the grid layout when viewMode is 'grid'", () => {
    render(
      <Router>
        <ProductsGrid
          products={mockProducts}
          onAddToCart={mockOnAddToCart}
          viewMode="grid"
        />
      </Router>
    );

    const gridContainer = screen.getByRole("grid");
    expect(gridContainer).toHaveClass("lg:grid-cols-4");
  });

  it("should render the list layout when viewMode is 'list'", () => {
    render(
      <Router>
        <ProductsGrid
          products={mockProducts}
          onAddToCart={mockOnAddToCart}
          viewMode="list"
        />
      </Router>
    );

    const gridContainer = screen.getByRole("grid");
    expect(gridContainer).toHaveClass("grid-cols-1");
  });

  it("should call onAddToCart with the correct product when triggered", () => {
    render(
      <Router>
        <ProductsGrid
          products={mockProducts}
          onAddToCart={mockOnAddToCart}
          viewMode="grid"
        />
      </Router>
    );

    const firstProduct = mockProducts[0];
    const productCardButtons = screen.getAllByText("Add to cart");
    productCardButtons[0].click();

    expect(mockOnAddToCart).toHaveBeenCalledWith(firstProduct);
  });

  it("should render product details for each ProductCard", () => {
    render(
      <Router>
        <ProductsGrid
          products={mockProducts}
          onAddToCart={mockOnAddToCart}
          viewMode="grid"
        />
      </Router>
    );

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.type)).toBeInTheDocument();
      expect(screen.getByText(`R$ ${product.price}`)).toBeInTheDocument();
    });
  });
});
