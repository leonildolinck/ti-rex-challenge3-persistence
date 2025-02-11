import React, { useState } from "react";
import ApiFetcher from "../../../services/ApiFetcher";
import LoadingSpinner from "../../common/LoadingSpinner";
import Product from "../../../services/ProductInterface";
import Button from "../../common/Button";
import ProductsGrid from "../../common/ProductsGrid";

const ProductsSection: React.FC = () => {
  const [visibleRows, setVisibleRows] = useState(2);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 1);
  };

  const handleAddToCart = (product: Product) => {
    console.log("Adicionar ao carrinho:", product);
  };

  return (
    <div className="sm:flex sm:flex-col lg:block lg:p-6 sm:p-2 sm:items-center">
      <h1 className="text-[40px] font-bold mb-6 text-center">Our Products</h1>
      <ApiFetcher
        url="http://ec2-34-239-122-225.compute-1.amazonaws.com:3000/products"
        render={(data, isLoading, error) => {
          if (isLoading) return <LoadingSpinner />;
          if (error) return <p>Erro: {error}</p>;
          if (!data || data.length === 0) return <p>No products</p>;

          const productsToShow = data.slice(0, visibleRows * 4);
          const canShowMore = data.length > productsToShow.length;

          return (
            <>
              <ProductsGrid
                products={productsToShow}
                onAddToCart={handleAddToCart}
                viewMode="grid"
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

export default ProductsSection;
