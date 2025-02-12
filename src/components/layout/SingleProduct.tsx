import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../cart/slice";
import StarRating from "../common/StarRating";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import Button from "../common/Button";
import ProductsGrid from "../common/ProductsGrid";
import ApiFetcher from "../../services/ApiFetcher";

interface Product {
  id: string;
  name: string;
  image: string;
  type: string;
  old_price: number;
  actual_price: number;
  description: string;
  additional: string;
  size: string;
  color: string;
  SKU: string;
  category: string;
  tags: string[];
  quantity: number;
}

interface CartPageItemProps {
  product: Product;
}

const SingleProduct: React.FC<CartPageItemProps> = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);

  const [visibleRows, setVisibleRows] = useState<number>(1);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 1);
  };

  const [quantity, setQuantity] = useState(1);

  const handleIncreaseClick = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseClick = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addProductToCart({ ...product, quantity }));
    }
  };

  const handleProductClick = () => {
    if (product) {
      dispatch(addProductToCart({ ...product, quantity }));
    }
  };

  const shareUrl = "http://localhost/produto/1";
  const title = "Look this amazing furniture!";
  const bgColor = "#000000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://ec2-34-239-122-225.compute-1.amazonaws.com:3000/products/${id}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setProduct({
          ...data,
          quantity: 1,
        });
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <div className="lg:flex lg:w-full lg:h-[100px] bg-[#F9F1E7] lg:items-center lg:gap-[27px] sm:flex sm:h-[80px] sm:items-center sm:px-4 sm:gap-[10px]">
        <Link
          to="/home"
          className="font-poppins lg:ml-[100px] lg:hover:text-gray-400 sm:text-sm sm:ml-0"
        >
          Home
        </Link>
        <img
          src="https://desafio-3.s3.us-east-1.amazonaws.com/maior.svg"
          alt="separator"
          className=""
        />
        <Link
          to="/shop"
          className="font-poppins lg:hover:text-gray-400 sm:text-sm"
        >
          Shop
        </Link>
        <img
          src="https://desafio-3.s3.us-east-1.amazonaws.com/maior.svg"
          alt="separator"
          className=""
        />
        <img
          src="https://desafio-3.s3.us-east-1.amazonaws.com/barra.svg"
          alt="separator"
          className=""
        />
        <p className="sm:text-sm">{product?.name}</p>
      </div>

      <div className="lg:flex lg:mx-auto lg:p-4 lg:flex-row lg:items-center lg:justify-center lg:gap-20 font-poppins sm:flex-col sm:px-4 sm:gap-6 sm:mt-4">
        <div className="flex flex-row gap-8 sm:mb-4">
          <div className="sm:hidden md:hidden flex flex-col gap-8">
            <img
              src={product?.image}
              alt=""
              className="lg:w-[80px] lg:h-[80px] lg:object-cover sm:w-full sm:h-auto rounded-lg"
            />
            <img
              src={product?.image}
              alt=""
              className="lg:w-[80px] lg:h-[80px] lg:object-cover sm:w-full sm:h-auto rounded-lg"
            />
            <img
              src={product?.image}
              alt=""
              className="lg:w-[80px] lg:h-[80px] lg:object-cover sm:w-full sm:h-auto rounded-lg"
            />
            <img
              src={product?.image}
              alt=""
              className="lg:w-[80px] lg:h-[80px] lg:object-cover sm:w-full sm:h-auto rounded-lg"
            />
          </div>
          <img
            src={product?.image}
            alt=""
            className="lg:w-[423px] lg:h-[500px] lg:object-cover sm:w-full sm:h-auto rounded-lg"
          />
        </div>
        {product && (
          <div className="overflow-hidden">
            <div className="lg:flex lg:flex-col lg:p-4 lg:gap-4 sm:gap-1">
              <h2 className="lg:text-[40px] lg:font-semibold sm:text-[24px]">
                {product.name}
              </h2>
              <p className="lg:text-[24px] lg:font-medium lg:text-[#9F9F9F] sm:text-[18px] sm:text-gray-700">
                R$ {new Intl.NumberFormat("pt-BR").format(product.actual_price)}
              </p>
              <div className="lg:flex lg:flex-row lg:items-center lg:gap-4 sm:flex-col sm:items-start sm:gap-2">
                <StarRating rating={3} />
                <div className="lg:flex lg:border-l-[1px] lg:h-[10px] lg:items-center lg:p-4 lg:text-[#9F9F9F] lg:text-[13px] sm:border-0 sm:p-0 sm:text-sm">
                  5 Customer Review
                </div>
              </div>
              <p className="lg:text-gray-600 lg:text-[13px] sm:text-sm sm:text-gray-700">
                {product.description}
              </p>

              <div className="lg:block sm:text-sm">Size</div>
              <div className="flex flex-row gap-4">
                <button className="rounded bg-[#B88E2F] text-white text-[13px] h-[30px] w-[30px]">
                  L
                </button>
                <button className=" rounded bg-[#F9F1E7] text-black text-[13px] h-[30px] w-[30px] opacity-50">
                  XL
                </button>
                <button className="rounded  bg-[#F9F1E7] text-black text-[13px] h-[30px] w-[30px] opacity-50">
                  XS
                </button>
              </div>
              <div className="lg:block sm:text-sm">Color</div>
              <div className="flex flex-row gap-3 mb-4">
                <span className="flex rounded-full bg-[#816DFA] h-[30px] w-[30px]"></span>
                <span className="flex rounded-full bg-black h-[30px] w-[30px]"></span>
                <span className="flex rounded-full bg-[#B88E2F] h-[30px] w-[30px]"></span>
              </div>
              <div className="flex lg:flex-row lg:gap-4  sm:gap-6 flex-col items-cente justify-start">
                <div className="flex flex-col">
                  <div className="flex items-center border border-[#9F9F9F] rounded-lg font-medium h-[35px] sm:h-[47px] lg:h-[64px] sm:px-2 lg:px-3 lg:w-[123px] sm:w-[123px]">
                    <button
                      onClick={handleDecreaseClick}
                      className="px-3 py-1 rounded-l-lg text-sm sm:text-base lg:text-lg"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-sm sm:text-base lg:text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncreaseClick}
                      className="px-3 py-1 rounded-r-lg text-sm sm:text-base lg:text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleProductClick}
                  className="font-poppins text-[20px] text-black border border-[#000000] rounded-[10px] h-[64px] w-[215px]"
                >
                  Add To Cart
                </button>
              </div>
              <hr className="lg:my-8 lg:p-4 lg:border-t lg:border-[#D9D9D9] sm:my-4 sm:border-gray-300" />
              <div className="lg:flex lg:flex-row lg:gap-8 sm:flex-col sm:gap-4">
                <div className="sm: hidden lg:flex lg:flex-col lg:gap-3 lg:text-[#9F9F9F] font-poppins sm:text-sm sm:text-gray-700">
                  <p>SKU</p>
                  <p>Category</p>
                  <p>Tags</p>
                  <p>Share</p>
                </div>
                <div className="sm:hidden md:hidden lg:flex sm:flex-row lg:flex-col lg:gap-3
                 lg:text-[#9F9F9F] font-poppins sm:text-sm sm:text-gray-700">
                  <p>: {product.SKU}</p>
                  <p>: {product.category}</p>
                  <p>: {product.tags}</p>
                  <div className="sm:hidden lg:flex lg:flex-row lg:gap-4 sm:flex-row sm:gap-2">
                    <p>:</p>
                    <FacebookShareButton url={shareUrl} hashtag={title}>
                      <FacebookIcon
                        size={20}
                        round={false}
                        borderRadius={30}
                        bgStyle={{ fill: bgColor }}
                        iconFillColor="white"
                      />
                    </FacebookShareButton>
                    <LinkedinShareButton
                      url={shareUrl}
                      title={title}
                      source="SeuSite.com"
                    >
                      <LinkedinIcon
                        size={20}
                        round={false}
                        borderRadius={30}
                        bgStyle={{ fill: bgColor }}
                        iconFillColor="white"
                      />
                    </LinkedinShareButton>
                    <TwitterShareButton
                      url={shareUrl}
                      title={title}
                      hashtags={["ProdutoIncrível", "Promoção"]}
                    >
                      <TwitterIcon
                        size={20}
                        round={false}
                        borderRadius={30}
                        bgStyle={{ fill: bgColor }}
                        iconFillColor="white"
                      />
                    </TwitterShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <hr className="lg:my-8 lg:p-4 lg:border-t lg:border-[#D9D9D9] sm:my-4 sm:border-gray-300" />

      <div className="lg:flex lg:flex-col lg:items-center sm:px-4">
        <div className="lg:flex lg:flex-row lg:gap-[130px] lg:items-center lg:justify-center sm:flex-col sm:gap-4">
          <h2 className="lg:text-[24px] lg:font-semibold sm:text-[20px]">
            Description
          </h2>
          <h2 className="lg:text-[24px] lg:font-semibold lg:text-[#9F9F9F] sm:text-[20px] sm:text-gray-700">
            Additional Information
          </h2>
        </div>
        <div className="lg:flex lg:flex-col lg:gap-[30px] lg:max-w-[1000px] lg:mt-[36px] sm:mt-4 sm:gap-2">
          <p className="lg:text-[#9F9F9F] sm:text-gray-700">
            Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
            portable active stereo speaker takes the unmistakable look and sound
            of Marshall, unplugs the chords, and takes the show on the road.
          </p>
          <p className="lg:text-[#9F9F9F] sm:text-gray-700">
            Weighing in under 7 pounds, the Kilburn is a lightweight piece of
            vintage styled engineering...
          </p>
        </div>
        <div className="lg:flex lg:flex-row lg:gap-[30px] lg:items-center lg:justify-center lg:mt-[36px] sm:flex-col sm:gap-4 sm:mt-4">
          <div className="lg:flex lg:bg-[#F9F1E7] lg:rounded-[10px] sm:bg-transparent">
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/sofa.png"
              alt="produto relacionado"
              className="lg:h-[348px] lg:w-[605px] sm:w-full sm:h-auto"
            />
          </div>
          <div className="lg:flex lg:bg-[#F9F1E7] lg:rounded-[10px] sm:bg-transparent">
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/sofa.png"
              alt="produto relacionado"
              className="lg:h-[348px] lg:w-[605px] sm:w-full sm:h-auto"
            />
          </div>
        </div>
      </div>

      <hr className="lg:my-8 lg:p-4 lg:border-t lg:border-[#D9D9D9] sm:my-4 sm:border-gray-300" />

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
                <div className="sm:px-16 lg:text-center sm:text-center mt-6">
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
      <hr className="lg:my-8 lg:p-4 lg:border-t lg:border-[#D9D9D9] sm:my-4 sm:border-gray-300" />

      <Footer />
    </>
  );
};

export default SingleProduct;
