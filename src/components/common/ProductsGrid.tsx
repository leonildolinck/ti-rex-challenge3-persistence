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
    <div className={`grid ${viewMode === 'grid' ? 'lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-8 md:gap-6 lg:gap-4 place-items-center' : 'grid-cols-1 gap-4'}`}>
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
