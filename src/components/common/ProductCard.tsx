import React from "react";
import Button from "../common/Button";
import Product from "../../services/ProductInterface";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../cart/slice";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
    <div className="relative bg-[#F4F5F7] overflow-hidden w-[285px]">
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
            Rp {new Intl.NumberFormat("pt-BR").format(actualPrice)}
          </p>
          {discount !== null && (
            <p className="text-[#B0B0B0] line-through">
              Rp {new Intl.NumberFormat("pt-BR").format(oldPrice)}
            </p>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-[#3A3A3A] bg-opacity-70 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
        <Button
          onClick={handleProductClick}
          label="Add to cart"
          type="button"
          kind="outline"
          size="sm"
        />
      </div>
    </div>
  );
};

export default ProductCard;
