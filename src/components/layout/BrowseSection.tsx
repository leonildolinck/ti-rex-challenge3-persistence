import React from "react";

const BrowseSection: React.FC = () => {
  const items = [
    {
      src: "https://desafio-3.s3.us-east-1.amazonaws.com/browse-1.png",
      alt: "Dining",
      title: "Dining",
    },
    {
      src: "https://desafio-3.s3.us-east-1.amazonaws.com/browse-2.png",
      alt: "Living",
      title: "Living",
    },
    {
      src: "https://desafio-3.s3.us-east-1.amazonaws.com/browse-3.png",
      alt: "Bedroom",
      title: "Bedroom",
    },
  ];

  return (
    <section className="flex flex-col items-center p-6 md:p-24 font-poppins">
      <h1 className="font-bold text-2xl md:text-[32px] text-center">
        Browse the Range
      </h1>
      <h2 className="text-base md:text-[20px] text-center mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h2>

      <div className="flex flex-wrap justify-center gap-5 mt-10 w-full max-w-[1200px]">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="h-[200px] w-[300px] md:h-[480px] md:w-[381px] overflow-hidden rounded-xl">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 md:mt-7 font-semibold text-lg md:text-[24px]">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseSection;
