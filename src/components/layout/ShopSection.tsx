import React, { useState, useEffect } from "react";
import ApiFetcher from "../../services/ApiFetcher";
import LoadingSpinner from "../common/LoadingSpinner";
import Button from "../common/Button";
import ProductsGrid from "../common/ProductsGrid";
import Product from "../../services/ProductInterface";
import Pagination from "../common/Pagination";

const ShopSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Estado para o número de itens por página
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

  // Atualiza os preços mínimos e máximos com base nos produtos da API
  useEffect(() => {
    if (allProducts.length > 0) {
      const allPrices = allProducts.map((product) => product.actual_price);
      setMinPrice(Math.min(...allPrices));
      setMaxPrice(Math.max(...allPrices));
    }
  }, [allProducts]);

  // Atualiza os dados processados com base nos filtros e ordenação
  useEffect(() => {
    const filtered = allProducts
      .filter((product) => {
        const matchesName = product.name
          .toLowerCase()
          .includes(filters.name.toLowerCase());
        const matchesMinPrice = filters.minPrice
          ? product.actual_price >= parseFloat(filters.minPrice)
          : true;
        const matchesMaxPrice = filters.maxPrice
          ? product.actual_price <= parseFloat(filters.maxPrice)
          : true;
        return matchesName && matchesMinPrice && matchesMaxPrice;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return a.actual_price - b.actual_price;
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

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reseta para a primeira página ao alterar o número de itens
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex flex-row justify-between bg-[#FAF3EA] min-h-[100px] items-center">
        <div className="flex items-center w-full px-28 gap-12">
          <div className="relative">
            <button onClick={() => setIsModalOpen(true)}>
              <img
                src="https://desafio-3.s3.us-east-1.amazonaws.com/filter.svg"
                alt=""
              />
            </button>
            {isModalOpen && (
              <div className="absolute top-1 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 font-poppins">
                <div className="flex flex-col bg-white p-4 gap-4">
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
                  <div className="flex justify-between gap-4">
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      label="Close"
                      type="button"
                      kind="outlineblack"
                      size="xs"
                    />
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      label="Apply"
                      type="button"
                      kind="outlineblack"
                      size="xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className="font-semibold">Filter</p>
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
          <p className="text-nowrap">
            Showing {itemsPerPage} of {processedData.length} results
          </p>
        </div>
        <div className="flex items-center gap-4 px-28">
          <p>Show</p>
          <select
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
            className="p-2 border rounded bg-white"
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
          </select>
          <p>Sort</p>
          <select
            onChange={handleSortChange}
            value={sortBy}
            className="p-2 border rounded bg-white"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      <ApiFetcher
        url="http://ec2-34-239-122-225.compute-1.amazonaws.com:3000/products"
        render={(data, isLoading, error) => {
          if (isLoading) return <LoadingSpinner />;
          if (error) return <p>Erro: {error}</p>;
          if (!data || data.length === 0) return <p>No products</p>;

          setAllProducts(data);

          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const productsToShow = processedData.slice(startIndex, endIndex);

          return (
            <>
              <ProductsGrid
                products={productsToShow}
                onAddToCart={(product) => console.log("Add to cart", product)}
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
