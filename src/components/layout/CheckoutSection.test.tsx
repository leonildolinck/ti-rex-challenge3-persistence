import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutSection from "./CheckoutSection";
import { Provider } from "react-redux";
import { store } from "../../redux/store"; 


jest.mock("../common/CheckoutForm", () => ({
  __esModule: true,
  default: ({ onFormSubmit }: any) => {
    return (
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          onFormSubmit({
            zipCode: "12345",
            streetAddress: "123 Street",
            province: "Province",
            townCity: "City",
            country: "Country",
            addOnAddress: "Apt 2",
            additionalInfo: "Near the park",
          });
        }}
      >
        <button type="submit">Submit</button>
      </form>
    );
  },
}));

jest.mock("../common/PlaceOrder", () => ({
  __esModule: true,
  default: ({ formData }: any) => (
    <div>
      <p>{formData.zipCode}</p>
      <p>{formData.streetAddress}</p>
      <p>{formData.province}</p>
      <p>{formData.townCity}</p>
      <p>{formData.country}</p>
      <p>{formData.addOnAddress}</p>
      <p>{formData.additionalInfo}</p>
    </div>
  ),
}));

describe("CheckoutSection Component", () => {
  it("should render CheckoutForm and PlaceOrder components", () => {
    render(
      <Provider store={store}>
        <CheckoutSection />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();

    const placeOrderComponent = screen.getByText(/12345/);
    expect(placeOrderComponent).toBeInTheDocument();
  });

  it("should update the form data when the form is submitted", () => {
    render(
      <Provider store={store}>
        <CheckoutSection />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(submitButton);

    const updatedZipCode = screen.getByText("12345");
    const updatedStreetAddress = screen.getByText("123 Street");
    const updatedProvince = screen.getByText("Province");
    const updatedTownCity = screen.getByText("City");
    const updatedCountry = screen.getByText("Country");
    const updatedAddOnAddress = screen.getByText("Apt 2");
    const updatedAdditionalInfo = screen.getByText("Near the park");

    expect(updatedZipCode).toBeInTheDocument();
    expect(updatedStreetAddress).toBeInTheDocument();
    expect(updatedProvince).toBeInTheDocument();
    expect(updatedTownCity).toBeInTheDocument();
    expect(updatedCountry).toBeInTheDocument();
    expect(updatedAddOnAddress).toBeInTheDocument();
    expect(updatedAdditionalInfo).toBeInTheDocument();
  });
});
