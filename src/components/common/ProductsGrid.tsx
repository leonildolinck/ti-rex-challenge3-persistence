import React from "react";
import ProductCard from "./ProductCard";
import Product from "../../services/ProductInterface";

interface ProductsGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  viewMode: 'grid' | 'list';
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  onAddToCart,
  viewMode
}) => {
  return (
    <div className={`grid ${viewMode === 'grid' ? 'grid-cols-4 gap-4' : 'grid-cols-1 gap-4'}`}>
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          onAddToCart={() => onAddToCart(product)}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
