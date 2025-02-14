import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThankYouOverlay from "./ThankYouOverlay";

describe("ThankYouOverlay Component", () => {
  it("should render the overlay with the correct content", () => {
    render(<ThankYouOverlay onClose={jest.fn()} />);

    const heading = screen.getByText("Thank You!");
    const message = screen.getByText(
      "Your message has been successfully sent. We will get back to you as soon as possible."
    );
    const closeButton = screen.getByRole("button", { name: "Close" });

    expect(heading).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it("should call the onClose callback when the close button is clicked", () => {
    const mockOnClose = jest.fn();
    render(<ThankYouOverlay onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should have correct styles applied to the overlay and content", () => {
    render(<ThankYouOverlay onClose={jest.fn()} />);

    const overlay = screen.getByText("Thank You!").parentElement?.parentElement;
    const closeButton = screen.getByRole("button", { name: "Close" });

    expect(overlay).toHaveClass("fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50");
    expect(closeButton).toHaveClass("bg-white text-black px-6 py-3 border w-full font-medium items-center");
  });
});
