import React from "react";
import { render, screen } from "@testing-library/react";
import CartSection from "./CartSection";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../ui/CartPageItem", () => ({
  __esModule: true,
  default: () => <div>CartPageItem</div>,
}));

describe("CartSection Component", () => {
  it("should render cart products header", () => {
    render(
      <Provider store={store}>
        <Router>
          <CartSection />
        </Router>
      </Provider>
    );
    const productHeader = screen.getByText(/Product/i);
    const priceHeader = screen.getByText(/Price/i);
    const quantityHeader = screen.getByText(/Quantity/i);
    const subtotalHeader = screen.getByText(/Subtotal/i);

    expect(productHeader).toBeInTheDocument();
    expect(priceHeader).toBeInTheDocument();
    expect(quantityHeader).toBeInTheDocument();
    expect(subtotalHeader).toBeInTheDocument();
  });

  it("should display the cart items", () => {
    render(
      <Provider store={store}>
        <Router>
          <CartSection />
        </Router>
      </Provider>
    );

    const cartItems = screen.getAllByText("CartPageItem");
    expect(cartItems.length).toBeGreaterThan(0);
  });

  it("should display subtotal and total price correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <CartSection />
        </Router>
      </Provider>
    );

    const subtotalText = screen.getByText(/Subtotal/i);
    const totalText = screen.getByText(/Total/i);

    expect(subtotalText).toBeInTheDocument();
    expect(totalText).toBeInTheDocument();

    const totalPrice = screen.getByText(/R\$ \d+/);
    expect(totalPrice).toBeInTheDocument();
  });

  it("should navigate to checkout when Check Out button is clicked", () => {
    render(
      <Provider store={store}>
        <Router>
          <CartSection />
        </Router>
      </Provider>
    );

    const checkOutButton = screen.getByRole("button", { name: /Check Out/i });
    expect(checkOutButton).toBeInTheDocument();
    checkOutButton.click();
    expect(window.location.pathname).toBe("/checkout");
  });
});
