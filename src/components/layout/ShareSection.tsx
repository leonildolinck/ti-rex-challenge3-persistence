import React from "react";

interface Photo {
  id: number;
  src: string;
  alt: string;
}

const photos: Photo[] = [
  {
    id: 1,
    src: "https://desafio-3.s3.us-east-1.amazonaws.com/share-1.png",
    alt: "Forniture",
  },
  {
    id: 2,
    src: "https://desafio-3.s3.us-east-1.amazonaws.com/share-2.png",
    alt: "Forniture",
  },
  {
    id: 3,
    src: "https://desafio-3.s3.us-east-1.amazonaws.com/share-3.png",
    alt: "Forniture",
  },
  {
    id: 4,
    src: "https://desafio-3.s3.us-east-1.amazonaws.com/share-4.png",
    alt: "Forniture",
  },
  {
    id: 5,
    src: "https://desafio-3.s3.us-east-1.amazonaws.com/share-5.png",
    alt: "Forniture",
  },
  {
    id: 6,
    src: "https://desafio-3.s3.us-east-1.amazonaws.com/share-6.png",
    alt: "Forniture",
  },
  {
    id: 7,
    src: "https://desafio-3.s3.us-east-1.amazonaws.com/share-7.png",
    alt: "Forniture",
  },
  {
    id: 8,
    src: "https://desafio-3.s3.us-east-1.amazonaws.com/share-8.png",
    alt: "Forniture",
  },
  {
    id: 9,
    src: "https://desafio-3.s3.us-east-1.amazonaws.com/share-9.png",
    alt: "Forniture",
  },
];

const getRandomSize = () => {
  const min = 100;
  const max = 500;
  const width = Math.floor(Math.random() * (max - min + 1)) + min;
  const height = Math.floor(Math.random() * (max - min + 1)) + min;
  return { width, height };
};

const ShareSection: React.FC = () => {
  return (
    <div className="border-b">
      <div>
        <h1 className="mt-24 text-[20px] font-poppins font-medium text-center">
          Share your setup with
        </h1>
        <h2 className="text-[40px] font-poppins font-bold text-center">
          #FurniroFurniture
        </h2>
      </div>
      <div className="flex flex-wrap gap-4 p-4 items-center justify-center">
        {photos.map((photo) => {
          const { width, height } = getRandomSize();
          return (
            <div
              key={photo.id}
              className="relative"
              style={{ width: `${width}px`, height: `${height}px` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="object-cover w-full h-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShareSection;
