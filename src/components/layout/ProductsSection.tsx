import React, { useState } from "react";
import ApiFetcher from "../../services/ApiFetcher";
import LoadingSpinner from "../common/LoadingSpinner";
import Button from "../common/Button";

const ProductsSection: React.FC = () => {
  const [visibleRows, setVisibleRows] = useState(2);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 1);
  };

  return (
    <div className="p-6">
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
              <div className="grid grid-cols-4 p-20 gap-6 font-poppins">
                {productsToShow.map((product, index) => {
                  const oldPrice = product.old_price;
                  console.log(oldPrice);
                  const actualPrice = product.actual_price;
                  console.log(actualPrice);
                  const discount =
                    oldPrice > actualPrice
                      ? Math.round(((oldPrice - actualPrice) / oldPrice) * 100)
                      : null;
                  console.log(discount);

                  return (
                    <div
                      key={index}
                      className="relative bg-[#F4F5F7] overflow-hidden w-[285px]"
                    >
                      {discount !== null && discount > 0 ? (
                        <div className="absolute top-3 right-3 bg-[#E97171] text-white text-sm font-bold w-12 h-12 rounded-full flex items-center justify-center">
                          {discount}%
                        </div>
                      ) : (
                        <div className="absolute top-3 right-3 bg-[#2EC1AC] text-white text-sm font-medium w-12 h-12 rounded-full flex items-center justify-center">
                          New
                        </div>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-[285px] h-[300px] object-cover"
                      />
                      <div className="p-4">
                        <h2 className="text-[24px] font-poppins text-[#3A3A3A] font-semibold mb-1">
                          {product.name}
                        </h2>
                        <p className="mb-3 text-[#898989]">{product.type}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-[#3A3A3A] font-bold text-[20px]">
                            Rp{" "}
                            {new Intl.NumberFormat("pt-BR").format(actualPrice)}
                          </p>
                          {discount !== null && (
                            <p className="text-[#B0B0B0] line-through">
                              Rp{" "}
                              {new Intl.NumberFormat("pt-BR").format(oldPrice)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-[#3A3A3A] bg-opacity-70 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Button
                          onClick={handleShowMore}
                          label="Add to cart"
                          type="button"
                          kind="outline"
                          size="sm"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

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
