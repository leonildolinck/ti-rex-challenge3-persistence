import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  
  test("renders the button with the correct label", () => {
    render(<Button label="Click me" type="button" kind="primary" size="md" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("checks the button type (button, submit, reset)", () => {
    render(<Button label="Click me" type="submit" kind="primary" size="md" />);
    const button = screen.getByText("Click me");
    expect(button).toHaveAttribute("type", "submit");
  });

  test("checks if the button calls the onClick function", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" type="button" kind="primary" size="md" onClick={handleClick} />);
    
    const button = screen.getByText("Click me");
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("checks if the button has the correct classes for the 'primary' kind", () => {
    render(<Button label="Click me" type="button" kind="primary" size="md" />);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass("bg-[#B88E2F] text-white font-bold h-[74px]");
  });

  test("checks the size class for 'md' size on mobile", () => {
    window.innerWidth = 540;
    render(<Button label="Click me" type="button" kind="primary" size="md" />);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass("w-[287px]");
  });

  test("checks the size class for 'md' size on tablet", () => {
    window.innerWidth = 768;
    render(<Button label="Click me" type="button" kind="primary" size="md" />);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass("w-[410px]");
  });

  test("checks if the button with 'modal' kind has the correct classes", () => {
    render(<Button label="Click me" type="button" kind="modal" size="md" />);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass("flex border border-[#000000] rounded-[50px] h-[30px] items-center justify-center px-6");
  });
});
