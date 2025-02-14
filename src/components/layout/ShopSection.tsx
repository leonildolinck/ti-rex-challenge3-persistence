import React, { useEffect, useState, useCallback } from "react";
import ApiFetcher from "../../services/ApiFetcher";
import Product from "../../services/ProductInterface";
import LoadingSpinner from "../common/LoadingSpinner";
import Pagination from "../common/Pagination";
import ProductsGrid from "../common/ProductsGrid";

const ShopSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
  });
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [processedData, setProcessedData] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const handleDataFetched = useCallback((data: Product[]) => {
    setAllProducts(data);
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      const allPrices = allProducts.map((product) => product.price);
      const min = Math.min(...allPrices);
      const max = Math.max(...allPrices);

      setMinPrice(min);
      setMaxPrice(max);

      setFilters((prev) => ({
        ...prev,
        minPrice: prev.minPrice === "" ? min.toString() : prev.minPrice,
        maxPrice: prev.maxPrice === "" ? max.toString() : prev.maxPrice,
      }));
    }
  }, [allProducts]);

  useEffect(() => {
    const filtered = allProducts
      .filter((product) => {
        const matchesName = product.name
          .toLowerCase()
          .includes(filters.name.toLowerCase());
        const matchesMinPrice = filters.minPrice
          ? product.price >= parseFloat(filters.minPrice)
          : true;
        const matchesMaxPrice = filters.maxPrice
          ? product.price <= parseFloat(filters.maxPrice)
          : true;
        return matchesName && matchesMinPrice && matchesMaxPrice;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return a.price - b.price;
      });

    setProcessedData(filtered);
  }, [filters, sortBy, allProducts]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as "name" | "price");
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="lg:flex lg:flex-row lg:justify-between bg-[#FAF3EA] lg:min-h-[100px] lg:items-center sm:flex sm:flex-row sm:w-full sm:h-full sm:py-2 sm:items-center font-poppins">
        <div className="lg:flex lg:items-center lg:w-full lg:px-28 lg:gap-12 sm:flex sm:flex-row sm:px-8 sm:h-full sm:w-full sm:justify-between md:flex md:items-center md:w-full md:px-14">
          <div className="relative">
            <button onClick={() => setIsModalOpen(true)}>
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/filter.svg"
                alt=""
                className="sm:h-[30px] sm-w-[30px]"
              />
            </button>
            {isModalOpen && (
              <div className="absolute top-1 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 font-poppins">
                <div className="flex flex-col bg-white p-4 gap-4 sm:w-[300px]">
                  <h3 className="text-xl font-bold mb-2">Filter</h3>
                  <div>
                    <label className="block">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={filters.name}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block">
                      Min Price: {filters.minPrice}
                    </label>
                    <input
                      type="range"
                      name="minPrice"
                      min={minPrice}
                      max={maxPrice}
                      step="10"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block">
                      Max Price: {filters.maxPrice}
                    </label>
                    <input
                      type="range"
                      name="maxPrice"
                      min={minPrice}
                      max={maxPrice}
                      step="10"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-4">Sort</h3>
                    <select
                      onChange={handleSortChange}
                      value={sortBy}
                      className="w-full p-2 border rounded bg-white"
                    >
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                    </select>
                  </div>
                  <div className="flex flex-col justify-between gap-4 items-center">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="font-poppins text-[20px] text-black border border-[#000000] rounded-[10px] sm:h-[38px] sm:w-[100px]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className="sm:hidden lg:block text-start lg:text-[20px]">Filter</p>
          <button onClick={() => setViewMode("grid")}>
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/grid.svg"
              alt="Grid View"
            />
          </button>
          <button onClick={() => setViewMode("list")}>
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/list.svg"
              alt="List View"
            />
          </button>
          <img
            src="https://desafio-3.s3.us-east-1.amazonaws.com/barra.svg"
            alt="separator"
          />
          <p className="text-nowrap sm:hidden lg:block">
            Showing {itemsPerPage} of {processedData.length} results
          </p>
        </div>
        <div className="lg:flex lg:items-center lg:gap-4 lg:px-28 sm:flex sm:items-center sm:gap-4 sm:px-6 md:px-8 md:flex md:items-center md:gap-4 ">
          <p className="sm:text-[10px] md:text-[15px] lg:text-[20px]">Show</p>
          <select
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
            className="lg:p-2 sm:p-0 md:p-0 border bg-white sm:h-[22px] sm:w-[22px] sm:text-[10px] text-center lg:text-[20px] lg:h-[55px] lg:w-[55px] md:h-[30px] md:w-[30px]"
          >
            <option
              value={4}
              className="sm:text-[10px] md:text-[15px] lg:text-[20px]"
            >
              4
            </option>
            <option
              value={8}
              className="sm:text-[10px] md:text-[15px] lg:text-[20px]"
            >
              8
            </option>
            <option
              value={16}
              className="sm:text-[10px] md:text-[15px] lg:text-[20px]"
            >
              16
            </option>
          </select>
          <p className="sm:text-[10px] md:text-[15px] lg:text-[20px]">Sort</p>
          <select
            onChange={handleSortChange}
            value={sortBy}
            className="lg:p-2 sm:p-0 border bg-white sm:h-[22px] sm:w-[66px] sm:text-[10px] text-center lg:text-[20px] lg:h-[55px] lg:w-[188px] md:h-[30px] md:w-[100px]"
          >
            <option
              className="sm:text-[10px] md:text-[15px] lg:text-[20px]"
              value="name"
            >
              Name
            </option>
            <option
              className="sm:text-[10px] md:text-[15px] lg:text-[20px]"
              value="price"
            >
              Price
            </option>
          </select>
        </div>
      </div>
      <ApiFetcher
        url="http://ec2-34-239-122-225.compute-1.amazonaws.com:3000/products"
        onDataFetched={handleDataFetched}
        render={(data, isLoading, error) => {
          if (isLoading) return <LoadingSpinner />;
          if (error) return <p>Erro: {error}</p>;
          if (!data || data.length === 0) return <p>No products</p>;

          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const productsToShow = processedData.slice(startIndex, endIndex);

          return (
            <>
              <ProductsGrid
                products={productsToShow}
                onAddToCart={(product) => console.log(product)}
                viewMode={viewMode}
              />
              <Pagination
                totalItems={processedData.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          );
        }}
      />
    </div>
  );
};

export default ShopSection;
