import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSignUp, useAuth } from "@clerk/clerk-react";
import RegisterSection from "./RegisterSection";

jest.mock("@clerk/clerk-react", () => ({
  useSignUp: jest.fn(),
  useAuth: jest.fn(),
}));

jest.mock("../common/LoadingSpinner", () => () => <div>Loading...</div>);

describe("RegisterSection Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: false });
    (useSignUp as jest.Mock).mockReturnValue({
      create: jest.fn(),
    });
    mockNavigate.mockReset();
  });

  it("should display the form inputs and errors when invalid data is provided", async () => {
    render(
      <Router>
        <RegisterSection />
      </Router>
    );

    const firstNameInput = screen.getByPlaceholderText("John");
    const lastNameInput = screen.getByPlaceholderText("Doe");
    const emailInput = screen.getByPlaceholderText("example@domain.com");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const confirmPasswordInput = screen.getByPlaceholderText("Re-enter your password");
    const submitButton = screen.getByText("Sign Up");

    fireEvent.change(firstNameInput, { target: { value: "Jo" } });
    fireEvent.change(lastNameInput, { target: { value: "D" } });
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.change(passwordInput, { target: { value: "pass" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "pass" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("must have at least 3 letters")).toBeInTheDocument();
      expect(screen.getByText("must have at least 3 letters")).toBeInTheDocument();
      expect(screen.getByText("Insert a valid email")).toBeInTheDocument();
      expect(screen.getByText("at least 8 characters, including uppercase, lowercase, number, and special character")).toBeInTheDocument();
    });
  });

  it("should display loading spinner when the registration process is in progress", async () => {
    (useSignUp as jest.Mock).mockReturnValueOnce({
      create: jest.fn().mockResolvedValueOnce({}),
    });

    render(
      <Router>
        <RegisterSection />
      </Router>
    );

    const submitButton = screen.getByText("Sign Up");

    fireEvent.click(submitButton);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display success message after successful registration", async () => {
    (useSignUp as jest.Mock).mockReturnValueOnce({
      create: jest.fn().mockResolvedValueOnce({}),
    });

    render(
      <Router>
        <RegisterSection />
      </Router>
    );

    const firstNameInput = screen.getByPlaceholderText("John");
    const lastNameInput = screen.getByPlaceholderText("Doe");
    const emailInput = screen.getByPlaceholderText("example@domain.com");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const confirmPasswordInput = screen.getByPlaceholderText("Re-enter your password");
    const submitButton = screen.getByText("Sign Up");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Password123!" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Thank You for Signing Up!")).toBeInTheDocument();
      expect(screen.getByText("We're excited to have you on board.")).toBeInTheDocument();
      expect(screen.getByText("You will be redirected shortly.")).toBeInTheDocument();
    });
  });

  it("should redirect user to cart if they are already signed in", () => {
    (useAuth as jest.Mock).mockReturnValueOnce({ isSignedIn: true });

    render(
      <Router>
        <RegisterSection />
      </Router>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });
});
