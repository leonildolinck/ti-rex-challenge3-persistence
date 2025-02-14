import React, { useState } from "react";
import Product from "../../services/ProductInterface";

interface ProductsThumbProps {
  products: Product[];
}

const ThumbnailCarousel: React.FC<ProductsThumbProps> = ({ products }) => {
  const [activeImage, setActiveImage] = useState<string | null>(
    products[0]?.image?.[0] || null
  );

  return (
    <div className="flex items-start justify-center">
      <div className="lg:flex md:flex sm:flex lg:flex-row md:flex-row sm:flex-col-reverse lg:items-start sm:items-center sm:justify-center gap-6">
        <div className="lg:flex lg:flex-col sm:flex sm:flex-row md:flex md:flex-col sm:justify-center lg:gap-6 md:gap-6 sm:gap-4">
          {products[0]?.image.slice(1).map((image, index) => (
            <img
              key={`${products[0]?.id}-${index}`}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="lg:w-20 lg:h-20 lg:p-2 md:w-20 md:h-20 md:p-2 sm:w-16 sm:h-16 sm:p-2 object-contain rounded-lg cursor-pointer bg-[#F9F1E7]"
              onClick={() => setActiveImage(image)}
            />
          ))}
        </div>

        <div className="lg:w-[500px] lg:h-[500px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[300px] flex justify-center items-center">
          {activeImage ? (
            <img
              src={activeImage}
              alt=""
              className="bg-[#F9F1E7] w-full h-full object-contain rounded-lg"
            />
          ) : (
            <p className="text-center">Error</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
