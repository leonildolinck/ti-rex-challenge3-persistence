import React from "react";
import { render, screen } from "@testing-library/react";
import BottomBanner from "./BottomBanner";
import '@testing-library/jest-dom';


describe("BottomBanner Component", () => {
  test("render coponemt", () => {
    render(<BottomBanner />);
    const bannerElement = screen.getByRole("banner", { hidden: true });
    expect(bannerElement).toBeInTheDocument();
});
})