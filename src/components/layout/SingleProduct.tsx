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
import Product from "../../services/ProductInterface";

interface ProductCardProps {
  product: Product;
}

const SingleProduct: React.FC<ProductCardProps> = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [visibleRows, setVisibleRows] = useState<number>(1);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 1);
  };

  const handleAddToCart = (product: Product) => {
    console.log("add logica carrinho abaixo", product);
  };

  const shareUrl = "http://localhost/produto/1";
  const title = "Look this amazing furniture!";
  const bgColor = "#000000";

  const dispatch = useDispatch();
  const handleProductClick = () => {
    dispatch(addProductToCart(product));
  };

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
        setProduct(data);
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
      <div className="flex w-full h-[100px] bg-[#F9F1E7] items-center gap-[27px]">
        <Link
          to="/home"
          className="hover:text-gray-400 font-poppins ml-[100px]"
        >
          Home
        </Link>
        <img
          src="https://desafio-3.s3.us-east-1.amazonaws.com/maior.svg"
          alt="separator"
        />
        <Link to="/shop" className="hover:text-gray-400 font-poppins">
          Shop
        </Link>
        <img
          src="https://desafio-3.s3.us-east-1.amazonaws.com/maior.svg"
          alt="separator"
        />
        <img
          src="https://desafio-3.s3.us-east-1.amazonaws.com/barra.svg"
          alt="separator"
        />
        <p>{product?.name}</p>
      </div>

      <div className="flex mx-auto p-4 flex-row items-center justify-center gap-20 font-poppins">
        <div>
          <img
            src={product?.image}
            alt={product?.name}
            className="w-[423px] h-[500px] object-cover"
          />
        </div>
        {product && (
          <div className="overflow-hidden">
            <div className="flex flex-col p-4 gap-2">
              <h2 className="text-[40px] font-semibold">{product.name}</h2>
              <p className="text-[24px] font-medium text-[#9F9F9F]">
                R$ {new Intl.NumberFormat("pt-BR").format(product.actual_price)}
              </p>
              <div className="flex flex-row items-center gap-4">
                <StarRating rating={3} />
                <div className="flex border-l-[1px] h-[10px] items-center p-4 text-[#9F9F9F] text-[13px]">
                  5 Customer Review
                </div>
              </div>
              <p className="text-gray-600 text-[13px]">{product.description}</p>

              <div>Size</div>
              <div>Color</div>
              <div>Quantity</div>
              <Button
                onClick={handleProductClick}
                label="Add To Cart"
                type="button"
                kind="outlineblack"
                size="lg"
              />
              <hr className="my-8 p-4 border-t border-[#D9D9D9]" />
              <div className="flex flex-row gap-8">
                <div className="flex flex-col gap-3 text-[#9F9F9F] font-poppins">
                  <p>SKU</p>
                  <p>Category</p>
                  <p>Tags</p>
                  <p>Share</p>
                </div>
                <div className="flex flex-col gap-3 text-[#9F9F9F] font-poppins">
                  <p>: {product.SKU}</p>
                  <p>: {product.category}</p>
                  <p>: {product.tags}</p>
                  <div className="flex flex-row gap-4">
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

      <hr className="my-8 p-4 border-t border-[#D9D9D9]" />

      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-[130px] items-center justify-center">
          <h2 className="text-[24px] font-semibold">Description</h2>
          <h2 className="text-[24px] font-semibold text-[#9F9F9F]">
            Additional Information
          </h2>
        </div>
        <div className="flex flex-col gap-[30px] max-w-[1000px] mt-[36px]">
          <p className="text-[#9F9F9F]">
            Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
            portable active stereo speaker takes the unmistakable look and sound
            of Marshall, unplugs the chords, and takes the show on the road.
          </p>
          <p className="text-[#9F9F9F]">
            Weighing in under 7 pounds, the Kilburn is a lightweight piece of
            vintage styled engineering...
          </p>
        </div>
        <div className="flex flex-row gap-[30px] items-center justify-center mt-[36px]">
          <div className="flex bg-[#F9F1E7] rounded-[10px]">
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/sofa.png"
              alt="produto relacionado"
              className="h-[348px] w-[605px]"
            />
          </div>
          <div className="flex bg-[#F9F1E7] rounded-[10px]">
            <img
              src="https://desafio-3.s3.us-east-1.amazonaws.com/sofa.png"
              alt="produto relacionado"
              className="h-[348px] w-[605px]"
            />
          </div>
        </div>
      </div>

      <hr className="my-8 p-4 border-t border-[#D9D9D9]" />

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
                viewMode="list"
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
      <hr className="my-8 p-4 border-t border-[#D9D9D9]" />

      <Footer />
    </>
  );
};

export default SingleProduct;
