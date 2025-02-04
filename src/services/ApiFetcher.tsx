import React, { useEffect, useState } from "react";

type Product = {
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
};

interface ApiFetcherProps {
  url: string;
  render: (
    data: Product[] | null,
    isLoading: boolean,
    error: string | null
  ) => React.ReactNode;
}

const ApiFetcher: React.FC<ApiFetcherProps> = ({ url, render }) => {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const json: Product[] = await response.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "UnknowError");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return <>{render(data, isLoading, error)}</>;
};

export default ApiFetcher;
