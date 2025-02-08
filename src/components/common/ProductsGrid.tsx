import React from "react";
import ProductCard from "./ProductCard";
import Product from "../../services/ProductInterface";

interface ProductsGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  onAddToCart,
}) => {
  return (
    <div className="grid grid-cols-4 gap-6 p-20 font-poppins">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
