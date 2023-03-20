import { useState, useEffect } from "react";

interface Item {
  id: number;
  title: string;
  tags: string[];
  description: string;
}

interface FetchResponse<T> {
  data: T[] | null;
  isPending: boolean;
  error: string | null;
}

export const useFetch = <T extends Item>(url: string): FetchResponse<T> => {
  const [data, setData] = useState<T[] | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = (await res.json()) as T[];

        setIsPending(false);
        setData(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setIsPending(false);
          setError('Could not fetch the data');
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isPending, error };
};
