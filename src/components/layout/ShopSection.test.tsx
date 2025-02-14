import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ShopSection from "./ShopSection";
import { ApiFetcher } from "../../services/ApiFetcher"; 

jest.mock("../../services/ApiFetcher", () => ({
  __esModule: true,
  default: ({ render }: any) => render([], false, null),
}));

describe("ShopSection", () => {
  
  it("should render correctly without crashing", async () => {
    render(<ShopSection />);

    expect(screen.getByText("Filter")).toBeInTheDocument();
    
    expect(screen.getByText("Sort")).toBeInTheDocument();
  });

  it("should show filter modal when filter button is clicked", () => {
    render(<ShopSection />);

    fireEvent.click(screen.getByRole("button", { name: /filter/i }));

    expect(screen.getByText("Filter")).toBeInTheDocument();
    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Min Price:")).toBeInTheDocument();
    expect(screen.getByLabelText("Max Price:")).toBeInTheDocument();
  });

  it("should update filters correctly", () => {
    render(<ShopSection />);

    fireEvent.click(screen.getByRole("button", { name: /filter/i }));

    fireEvent.change(screen.getByLabelText("Name:"), { target: { value: "test" } });

    expect(screen.getByLabelText("Name:")).toHaveValue("test");
  });

  it("should handle sorting change correctly", () => {
    render(<ShopSection />);

    expect(screen.getByDisplayValue("name")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "price" } });

    expect(screen.getByDisplayValue("price")).toBeInTheDocument();
  });

  it("should paginate correctly", async () => {
    render(<ShopSection />);

    await waitFor(() => expect(screen.getByText("Showing 8 of 0 results")).toBeInTheDocument());
    
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByText("Showing 8 of 0 results")).toBeInTheDocument();
  });

  it("should show a loading spinner when data is being fetched", async () => {
    render(<ShopSection />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should show an error message if API call fails", async () => {
    jest.mock("../../services/ApiFetcher", () => ({
      __esModule: true,
      default: ({ render }: any) => render([], false, "Error fetching data"),
    }));

    render(<ShopSection />);

    expect(screen.getByText(/Erro: Error fetching data/i)).toBeInTheDocument();
  });

  it("should display no products if no data is available", async () => {
    jest.mock("../../services/ApiFetcher", () => ({
      __esModule: true,
      default: ({ render }: any) => render([], false, null),
    }));

    render(<ShopSection />);

    expect(screen.getByText("No products")).toBeInTheDocument();
  });
});
