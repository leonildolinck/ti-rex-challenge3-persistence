import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const onPageChangeMock = jest.fn();

  const renderPagination = ({
    totalItems = 50,
    itemsPerPage = 10,
    currentPage = 1,
  } = {}) => {
    render(
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChangeMock}
      />
    );
  };

  it("renders the correct number of pages", () => {
    renderPagination();
    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons).toHaveLength(6);
  });

  it("highlights the current page button", () => {
    renderPagination({ currentPage: 2 });
    const activeButton = screen.getByText("2");
    expect(activeButton).toHaveClass("bg-[#B88E2F]");
  });

  it("calls onPageChange when clicking Next", () => {
    renderPagination({ currentPage: 1 });
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when clicking Previous", () => {
    renderPagination({ currentPage: 2 });
    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });

  it("disables Previous button on the first page", () => {
    renderPagination({ currentPage: 1 });
    const prevButton = screen.queryByText("Previous");
    expect(prevButton).not.toBeInTheDocument();
  });

  it("disables Next button on the last page", () => {
    renderPagination({ totalItems: 30, itemsPerPage: 10, currentPage: 3 });
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("calls onPageChange when a page number is clicked", () => {
    renderPagination();
    const pageButton = screen.getByText("3");
    fireEvent.click(pageButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it("calculates total pages correctly", () => {
    renderPagination({ totalItems: 45, itemsPerPage: 15 });
    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons).toHaveLength(5);
  });
});
