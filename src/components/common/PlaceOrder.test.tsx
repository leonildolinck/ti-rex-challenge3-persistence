import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useUser } from "@clerk/clerk-react";
import PlaceOrder from "./PlaceOrder";
import { RootState } from "../../redux/store";

jest.mock("@clerk/clerk-react", () => ({
  useUser: jest.fn(),
}));

jest.mock("../cart/cart.selectors", () => ({
  selectProductsTotalPrice: jest.fn(() => 100),
}));

const mockStore = configureStore<RootState>([]);

describe("PlaceOrder Component", () => {
  const mockUser = {
    firstName: "John",
    lastName: "Doe",
    emailAddresses: [{ emailAddress: "john.doe@example.com" }],
  };

  const initialState = {
    cart: {
      products: [
        { id: 1, name: "Product A", price: 50, quantity: 1 },
        { id: 2, name: "Product B", price: 25, quantity: 2 },
      ],
    },
  };

  const formData = {
    zipCode: "12345",
    streetAddress: "123 Main St",
    province: "Province",
    townCity: "City",
    country: "Country",
    addOnAddress: "Apt 1",
    additionalInfo: "Leave at the front door",
  };

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({ user: mockUser });
  });

  it("renders product details correctly", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <PlaceOrder formData={formData} />
      </Provider>
    );

    const productA = screen.getByText("Product A");
    const productB = screen.getByText("Product B");
    expect(productA).toBeInTheDocument();
    expect(productB).toBeInTheDocument();

    const subtotal = screen.getByText("R$ 100");
    expect(subtotal).toBeInTheDocument();
  });

  it("shows the thank you message after placing an order", async () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <PlaceOrder formData={formData} />
      </Provider>
    );

    const placeOrderButton = screen.getByText("Place Order");
    fireEvent.click(placeOrderButton);

    const thankYouMessage = await screen.findByText("Thank You!");
    expect(thankYouMessage).toBeInTheDocument();
  });

  it("disables the Place Order button when submitting", async () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <PlaceOrder formData={formData} />
      </Provider>
    );

    const placeOrderButton = screen.getByText("Place Order");
    fireEvent.click(placeOrderButton);

    expect(placeOrderButton).toBeDisabled();
  });

  it("renders a loading spinner during order submission", async () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <PlaceOrder formData={formData} />
      </Provider>
    );

    const placeOrderButton = screen.getByText("Place Order");
    fireEvent.click(placeOrderButton);

    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("displays the correct total price", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <PlaceOrder formData={formData} />
      </Provider>
    );

    const totalPrice = screen.getByText("R$ 100");
    expect(totalPrice).toBeInTheDocument();
  });
});
