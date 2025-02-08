import React, { useState, useRef, useEffect } from "react";
import { Splide as OriginalSplide, SplideSlide } from "@splidejs/react-splide";
import SplideCore from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";

interface SplideOptions {
  type: string;
  perPage: number;
  perMove: number;
  autoplay: boolean;
  interval: number;
  pagination: boolean;
  arrows: boolean;
  gap: string;
  focus: string;
}

interface CustomSplideProps {
  options: SplideOptions;
  children: React.ReactNode;
}

type SplideRefType = HTMLDivElement & { splide: SplideCore };

const Splide = OriginalSplide as React.ForwardRefExoticComponent<
  CustomSplideProps & React.RefAttributes<SplideRefType>
>;

interface Slide {
  image: string;
  number: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: "https://desafio-3.s3.us-east-1.amazonaws.com/room-1.png",
    title: "Bed Room",
    number: "01",
    description: "Inner Peace",
  },
  {
    image: "https://desafio-3.s3.us-east-1.amazonaws.com/room-2.png",
    title: "Dining Room",
    number: "02",
    description: "Simple Clean",
  },
  {
    image: "https://desafio-3.s3.us-east-1.amazonaws.com/room-3.png",
    title: "Single Bedroom",
    number: "03",
    description: "Modern Stylish",
  },
  {
    image: "https://desafio-3.s3.us-east-1.amazonaws.com/room-4.jpeg",
    title: "Master Bed Room",
    number: "04",
    description: "Retro Fancy",
  },
  {
    image: "https://desafio-3.s3.us-east-1.amazonaws.com/share-5.png",
    title: "Dining Table",
    number: "05",
    description: "Retro Black",
  },
];

const InspirationSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const splideRef = useRef<SplideRefType>(null);

  useEffect(() => {
    const instance = splideRef.current?.splide;
    if (!instance) return;

    const handleMove = (): void => {
      const newIndex = instance.Components.Controller.getIndex();
      console.log("Active Index:", newIndex);
      setActiveIndex(newIndex);
    };

    (instance.on as unknown as (event: string, callback: () => void) => void)(
      "move",
      handleMove
    );

    return () => {
      (
        instance.off as unknown as (event: string, callback: () => void) => void
      )("move", handleMove);
    };
  }, []);

  return (
    <section className="products-section flex bg-[#FCF8F3] p-20 items-center font-poppins">
      <div className="w-1/3 p-2 mr-6">
        <h2 className="text-[40px] font-bold mb-4 text-[#3A3A3A]">
          50+ Beautiful Rooms Inspiration
        </h2>
        <p className="text-lg mb-6 font-medium text-[#616161]">
          Our designer already made a lot of beautiful prototypes of rooms that
          inspire you.
        </p>
      </div>

      <div className="w-2/3">
        <Splide
          options={{
            type: "loop",
            perPage: 2,
            perMove: 1,
            autoplay: true,
            interval: 5000,
            pagination: true,
            arrows: true,
            gap: "1rem",
            focus: "left",
          }}
          ref={splideRef}
        >
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <SplideSlide key={index}>
                <div
                  className={`relative transition-all duration-300 ${
                    isActive
                      ? "active-slide w-[404px] h-[582px]"
                      : "inactive-slide w-[372px] h-[486px]"
                  }`}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={slide.image}
                    alt={slide.title}
                  />
                  {isActive ? (
                    <div className="absolute left-6 bottom-6 flex flex-row justify-end items-end">
                      <div className="flex flex-col bg-white bg-opacity-70 w-[217px] h-[130px] items-center justify-center">
                        <h3 className="mb-2">
                          {slide.number} ⸺ {slide.title}
                        </h3>
                        <p className="text-[28px] text-[#3A3A3A] font-semibold">
                          {slide.description}
                        </p>
                      </div>
                      <button className="h-[48px] w-[48px] bg-[#B88E2F] text-white">
                        &rarr;
                      </button>
                    </div>
                  ) : (
                    <div className="invisible"></div>
                  )}
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </section>
  );
};

export default InspirationSection;
