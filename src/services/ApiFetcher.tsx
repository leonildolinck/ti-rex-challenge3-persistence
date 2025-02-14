import React, { useEffect, useState } from "react";
import Product from "./ProductInterface";


export interface ApiFetcherProps {
  url: string;
  render: (
    data: Product[] | null,
    isLoading: boolean,
    error: string | null
  ) => React.ReactNode;
  onDataFetched?: (data: Product[]) => void;
}

const ApiFetcher: React.FC<ApiFetcherProps> = ({ url, render, onDataFetched }) => {
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
        if (onDataFetched) {
          onDataFetched(json);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown Error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, onDataFetched]);

  return <>{render(data, isLoading, error)}</>;
};

export default ApiFetcher;
