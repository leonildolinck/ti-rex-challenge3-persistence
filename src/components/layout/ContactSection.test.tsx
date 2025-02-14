import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactSection from "./ContactSection";

jest.mock("../common/ThankYouOverlay", () => ({
  __esModule: true,
  default: ({ onClose }: any) => (
    <div>
      <p>Thank You for your message!</p>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe("ContactSection Component", () => {
  it("should render form elements correctly", () => {
    render(<ContactSection />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("should show error messages for invalid form input", async () => {
    render(<ContactSection />);

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "A" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "invalidemail" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "short" } });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/name must have at least 2 letters/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/message must have at least 20 characters/i)).toBeInTheDocument();
    });
  });

  it("should submit form and show ThankYouOverlay on valid input", async () => {
    render(<ContactSection />);

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "Inquiry" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "This is a valid message with more than 20 characters." } });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you for your message!/i)).toBeInTheDocument();
    });
  });

  it("should close the ThankYouOverlay when the close button is clicked", async () => {
    render(<ContactSection />);

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "Inquiry" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "This is a valid message with more than 20 characters." } });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you for your message!/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    await waitFor(() => {
      expect(screen.queryByText(/thank you for your message!/i)).not.toBeInTheDocument();
    });
  });
});
