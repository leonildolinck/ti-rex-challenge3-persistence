import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductsSection from "./ProductsSection";
import ApiFetcher from "../../../services/ApiFetcher";

jest.mock("../../../services/ApiFetcher", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../common/LoadingSpinner", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../common/ProductsGrid", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("ProductsSection Component", () => {
  it("should render the 'Our Products' title", () => {
    render(<ProductsSection />);
    const title = screen.getByText("Our Products");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("text-[40px] font-bold mb-6 text-center");
  });

  it("should render a loading spinner when data is loading", () => {
    ApiFetcher.mockImplementationOnce(({ render }: any) =>
      render(null, true, null)
    );
    render(<ProductsSection />);
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("should display error message when data fetch fails", async () => {
    ApiFetcher.mockImplementationOnce(({ render }: any) =>
      render(null, false, "Failed to fetch data")
    );
    render(<ProductsSection />);
    const errorMessage = await screen.findByText("Erro: Failed to fetch data");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should display no products message if there are no products", async () => {
    ApiFetcher.mockImplementationOnce(({ render }: any) =>
      render([], false, null)
    );
    render(<ProductsSection />);
    const noProductsMessage = await screen.findByText("No products");
    expect(noProductsMessage).toBeInTheDocument();
  });

  it("should render products and 'Show More' button", async () => {
    const mockData = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
      { id: 3, name: "Product 3" },
      { id: 4, name: "Product 4" },
      { id: 5, name: "Product 5" },
    ];
    
    ApiFetcher.mockImplementationOnce(({ render }: any) =>
      render(mockData, false, null)
    );

    render(<ProductsSection />);

    const products = screen.getAllByText(/Product/);
    expect(products.length).toBe(8);
    expect(screen.getByText("Show More")).toBeInTheDocument();
  });

  it("should load more products when 'Show More' button is clicked", async () => {
    const mockData = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
      { id: 3, name: "Product 3" },
      { id: 4, name: "Product 4" },
      { id: 5, name: "Product 5" },
      { id: 6, name: "Product 6" },
    ];

    ApiFetcher.mockImplementationOnce(({ render }: any) =>
      render(mockData, false, null)
    );

    render(<ProductsSection />);
    
    fireEvent.click(screen.getByText("Show More"));

    await waitFor(() => {
      const products = screen.getAllByText(/Product/);
      expect(products.length).toBe(12);
    });
  });

  it("should call handleAddToCart function when adding a product", async () => {
    const mockData = [
      { id: 1, name: "Product 1" },
    ];

    ApiFetcher.mockImplementationOnce(({ render }: any) =>
      render(mockData, false, null)
    );
    
    const { container } = render(<ProductsSection />);
    
    const addToCartButton = container.querySelector("button");
    expect(addToCartButton).toBeInTheDocument();
    
    fireEvent.click(addToCartButton!);

    expect(console.log).toHaveBeenCalledWith(mockData[0]);
  });
});
