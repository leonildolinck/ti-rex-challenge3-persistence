import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import SingleProduct from "./SingleProduct";
import { addProductToCart } from "../cart/slice";

Mocking dependencies
jest.mock("../common/LoadingSpinner", () => () => <div>Loading...</div>);
jest.mock("../common/StarRating", () => () => <div>Star Rating</div>);
jest.mock("../common/ThumbnailCarousel", () => () => <div>Thumbnail Carousel</div>);
jest.mock("../common/ProductsGrid", () => () => <div>Products Grid</div>);
jest.mock("../common/Button", () => () => <button>Show More</button>);

const mockStore = createStore(() => ({
  cart: { products: [] },
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

describe("SingleProduct Component", () => {
  it("should render loading spinner initially", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <SingleProduct />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display product details once data is fetched", async () => {
    const mockProduct = {
      name: "Product Name",
      price: 100,
      description: "Product description",
      SKU: "12345",
      category: "Category 1",
      tags: "tag1, tag2",
      scene: ["image1.png", "image2.png"],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      })
    );

    render(
      <Provider store={mockStore}>
        <Router>
          <SingleProduct />
        </Router>
      </Provider>
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`R$ ${new Intl.NumberFormat("pt-BR").format(mockProduct.price)}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it("should increase and decrease quantity", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <SingleProduct />
        </Router>
      </Provider>
    );

    const decreaseButton = screen.getByText("-");
    const increaseButton = screen.getByText("+");
    const quantitySpan = screen.getByText("1");

    fireEvent.click(increaseButton);
    expect(quantitySpan.textContent).toBe("2");

    fireEvent.click(decreaseButton);
    expect(quantitySpan.textContent).toBe("1");
  });

  it("should dispatch addProductToCart on add to cart click", async () => {
    const mockProduct = {
      name: "Product Name",
      price: 100,
      description: "Product description",
      SKU: "12345",
      category: "Category 1",
      tags: "tag1, tag2",
      scene: ["image1.png", "image2.png"],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      })
    );

    render(
      <Provider store={mockStore}>
        <Router>
          <SingleProduct />
        </Router>
      </Provider>
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const addToCartButton = screen.getByText("Add To Cart");

    fireEvent.click(addToCartButton);
    expect(mockDispatch).toHaveBeenCalledWith(
      addProductToCart({ ...mockProduct, quantity: 1 })
    );
  });

  it("should show the correct product images", async () => {
    const mockProduct = {
      scene: ["image1.png", "image2.png"],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      })
    );

    render(
      <Provider store={mockStore}>
        <Router>
          <SingleProduct />
        </Router>
      </Provider>
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByAltText("produto relacionado")).toBeInTheDocument();
  });
});
