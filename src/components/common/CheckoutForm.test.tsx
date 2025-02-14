import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";


import { act } from "react-dom/test-utils";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      logradouro: "Rua Teste",
      bairro: "Bairro Teste",
      localidade: "Cidade Teste",
    }),
  })
) as jest.Mock;

describe("CheckoutForm", () => {
  test("renders the form with all fields", () => {
    render(<CheckoutForm onFormSubmit={jest.fn()} />);
    
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ZIP Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country\/Region/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Town\/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Province/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Add-on Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Additional Information/i)).toBeInTheDocument();
  });

  test("filling out the zip code triggers the API call", async () => {
    render(<CheckoutForm onFormSubmit={jest.fn()} />);
    
    const zipCodeInput = screen.getByLabelText(/ZIP Code/i) as HTMLInputElement;
    fireEvent.change(zipCodeInput, { target: { value: "12345678" } });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByLabelText(/Street Address/i)).toHaveValue("Rua Teste");
    expect(screen.getByLabelText(/Town\/City/i)).toHaveValue("Cidade Teste");
    expect(screen.getByLabelText(/Province/i)).toHaveValue("Bairro Teste");
  });

  test("submitting the form triggers the onFormSubmit callback", async () => {
    const mockSubmit = jest.fn();
    render(<CheckoutForm onFormSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText(/ZIP Code/i), { target: { value: "12345678" } });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/ZIP Code/i), { target: { value: "12345678" } });
    });

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
  });

  test("displays loading spinner when API request is made", async () => {
    render(<CheckoutForm onFormSubmit={jest.fn()} />);
    
    const zipCodeInput = screen.getByLabelText(/ZIP Code/i) as HTMLInputElement;
    
    fireEvent.change(zipCodeInput, { target: { value: "22793395" } });

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());
  });
});
