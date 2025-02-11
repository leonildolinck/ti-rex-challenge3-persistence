import React from "react";
import Button from "../common/Button";
import Product from "../../services/ProductInterface";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../cart/slice";
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

  const dispatch = useDispatch();

  const handleProductClick = () => {
    dispatch(addProductToCart(product));
  };
  return (
    <div
      className={`lg:relative lg:mt-6 sm:relative bg-[#F4F5F7] overflow-hidden ${
        viewMode === "grid" ? "lg:w-[285px] sm:w-[150px]" : "flex"
      }`}
    >
      {discount !== null && discount > 0 ? (
        <div className="lg:absolute sm:relative sm:top-7 sm:left-[120px] lg:top-3 lg:left-[230px] bg-[#E97171] text-white lg:text-sm sm:text-[8px] font-medium lg:w-12 lg:h-12 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
          {discount}%
        </div>
      ) : (
        <div className="lg:absolute sm:relative sm:top-7 sm:left-[120px] lg:top-3 lg:left-[230px] bg-[#2EC1AC] text-white lg:text-sm sm:text-[8px] font-medium lg:w-12 lg:h-12 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
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
          viewMode === "grid" ? "" : "flex flex-col p-4 justify-between w-full"
        }`}
      >
        <div>
          <h2 className="lg:text-[24px] sm:text-[16px] font-poppins text-[#3A3A3A] font-semibold lg:p-4 sm:p-0">
            {product.name}
          </h2>
          <p className="text-[#898989] sm:text-[12px] lg:text-lg">{product.type}</p>
        </div>
        <div className="flex justify-between items-center sm:flex sm:flex-col-reverse lg:flex-row">
          <p className="text-[#3A3A3A] font-bold lg:text-[20px] sm:text-[14px] lg:text-left sm:text-right ">
            R$ {new Intl.NumberFormat("pt-BR").format(actualPrice)}
          </p>
          {discount !== null && (
            <p className="text-[#B0B0B0] line-through sm:text-[10px] lg:text-sm lg:text-left sm:text-right">
              Rp {new Intl.NumberFormat("pt-BR").format(oldPrice)}
            </p>
          )}
        </div>
      </div>

      {viewMode === "grid" && (
        <div 
        className="lg:absolute sm:hidden lg:flex lg:inset-0 bg-[#3A3A3A] bg-opacity-70 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
          <Button
            onClick={handleProductClick}
            label="Add to cart"
            type="button"
            kind="outline"
            size="sm"
          />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
