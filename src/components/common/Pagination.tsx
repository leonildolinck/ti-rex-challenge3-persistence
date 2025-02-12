import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-8 space-x-2 mb-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`lg:px-6 lg:py-3 bg-[#F9F1E7] text-black lg:text-[20px] opacity-50 rounded ${currentPage == 1 && 'hidden'}`}

      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 border rounded ${
            currentPage === page
              ? "rounded lg:px-6 lg:py-3 bg-[#B88E2F] text-white lg:text-[20px]"
              : "rounded lg:px-6 lg:py-3 bg-[#F9F1E7] text-black lg:text-[20px] opacity-50"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded lg:px-6 lg:py-3 bg-[#F9F1E7] text-black lg:text-[20px] opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
