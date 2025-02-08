import React, { useState } from "react";
import ApiFetcher from "../../services/ApiFetcher";
import LoadingSpinner from "../common/LoadingSpinner";
import Button from "../common/Button";
import ProductsGrid from "../common/ProductsGrid";
import Product from "../../services/ProductInterface";

const ShopSection: React.FC = () => {
  const [visibleRows, setVisibleRows] = useState(4);
  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
  });
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 1);
  };

  const handleAddToCart = (product: Product) => {
    console.log("Adicionar ao carrinho:", product);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as "name" | "price");
  };

  const filteredProducts = (data: Product[]) => {
    return data
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
  };
  return (
    <div>
      <div className="flex flex-row justify-between bg-[#FAF3EA] min-h-[100px] items-center">
        <div className="flex items-center w-full px-28 gap-12">
          <button onClick={() => setIsModalOpen(true)}>
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/filter.svg"
              alt=""
            />
          </button>
          <p className="font-semibold">Filter</p>
          <button onClick={() => setIsModalOpen(true)}>
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/grid.svg"
              alt=""
            />
          </button>
          <button onClick={() => setIsModalOpen(true)}>
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/list.svg"
              alt=""
            />
          </button>
          <img
            src="https://desafio-3.s3.us-east-1.amazonaws.com/barra.svg"
            alt="separator"
          />
          <p>Showing 1-16 of 32 results</p>
        </div>
        <div className="flex items-center justify-center px-20">
          <p>Show</p>
          <p>16</p>
          <p>Sort by</p>
          <p>Default</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 font-poppins">
          <div className="flex flex-col bg-white p-6 w-1/3 gap-10">
            <h3 className="text-xl font-bold mb-4">Filter</h3>
            <div className="mb-4">
              <label className="block">Name:</label>
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block">Min Price:</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block">Max Price:</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
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
            <div className="flex justify-between">
              <Button
                onClick={() => setIsModalOpen(false)}
                label="Close"
                type="button"
                kind="outlineblack"
                size="sm"
              />
              <Button
                onClick={() => setIsModalOpen(false)}
                label="Apply"
                type="button"
                kind="outlineblack"
                size="sm"
              />
            </div>
          </div>
        </div>
      )}

      <ApiFetcher
        url="http://ec2-34-239-122-225.compute-1.amazonaws.com:3000/products"
        render={(data, isLoading, error) => {
          if (isLoading) return <LoadingSpinner />;
          if (error) return <p>Erro: {error}</p>;
          if (!data || data.length === 0) return <p>No products</p>;

          const filteredData = filteredProducts(data);
          const productsToShow = filteredData.slice(0, visibleRows * 4);
          const canShowMore = filteredData.length > productsToShow.length;

          return (
            <>
              <ProductsGrid
                products={productsToShow}
                onAddToCart={handleAddToCart}
              />

              {canShowMore && (
                <div className="text-center mt-6">
                  <Button
                    onClick={handleShowMore}
                    label="Show More"
                    type="button"
                    kind="outline"
                    size="lg"
                  />
                </div>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default ShopSection;
