import React from "react";
import Button from "../common/Button";
import Product from "../../services/ProductInterface";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  viewMode: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const { old_price: oldPrice, actual_price: actualPrice } = product;
  const discount =
    oldPrice > actualPrice
      ? Math.round(((oldPrice - actualPrice) / oldPrice) * 100)
      : null;

  return (
    <div
      className={`lg:relative lg:mt-6 md:mt-6 sm:mt-6 sm:relative bg-[#F4F5F7] overflow-hidden ${
        viewMode === "grid" ? "lg:w-[285px] sm:w-[150px]" : "flex p-2 mb-2 ml-10 mr-10"
      }`}
    >
      {discount !== null && discount > 0 ? (
        <div className="absolute top-2 right-2 bg-[#E97171] text-white lg:text-sm sm:text-[8px] font-medium lg:w-12 lg:h-12 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
          {discount}%
        </div>
      ) : (
        <div className="absolute top-2 right-2 bg-[#2EC1AC] text-white lg:text-sm sm:text-[8px] font-medium lg:w-12 lg:h-12 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
          New
        </div>
      )}

      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className={
            viewMode === "grid"
              ? "lg:w-[285px] lg:h-[300px] sm:w-[150px] sm:h-[150px] object-cover"
              : "lg:w-[150px] lg:h-[150px] sm:w-[100px] sm:h-[100px] object-cover"
          }
        />
      </Link>

      <div
        className={`lg:p-4 sm:p-1 ${
          viewMode === "grid" ? "" : "flex flex-row p-4 justify-between w-full"
        }`}
      >
        <div>
          <h2 className="lg:text-[24px] sm:text-[16px] font-poppins text-[#3A3A3A] font-semibold lg:p-0 sm:p-0 lg:text-start md:text-center sm:text-center">
            {product.name}
          </h2>
          <p className="text-[#898989] sm:text-[12px] lg:text-lg lg:text-start md:text-center sm:text-center">
            {product.type}
          </p>
        </div>
        <div className="flex justify-between items-center sm:flex sm:flex-col-reverse md:flex-col-reverse lg:flex-row">
          <p className="text-[#3A3A3A] font-bold lg:text-[20px] sm:text-[14px] md:text-[14px] lg:text-left sm:text-right ">
            R$ {new Intl.NumberFormat("pt-BR").format(actualPrice)}
          </p>
          {discount !== null ? (
            <p className="text-[#B0B0B0] line-through sm:text-[10px] md:text-[8px] lg:text-sm lg:text-left sm:text-right">
              R$ {new Intl.NumberFormat("pt-BR").format(oldPrice)}
            </p>
          ) : (
            <p className="sm:text-[10px] md:text-[8px] lg:text-sm lg:text-left sm:text-right">
              &nbsp;
            </p>
          )}
        </div>
      </div>

      {viewMode === "grid" && (
        <div className="lg:absolute sm:hidden lg:flex lg:inset-0 bg-[#3A3A3A] bg-opacity-70 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
          <Link to={`/product/${product.id}`}>
          <Button
            label="Add to cart"
            type="button"
            kind="outline"
            size="sm"
          />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
