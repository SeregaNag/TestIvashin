import { useState, useEffect } from "react";

interface Item {
  id?: string;
  title: string;
  tags: string[];
  description: string;
}

interface FetchResponse<T> {
  data: T[] | null;
  isPending: boolean;
  error: string | null;
  postData: (postData: Item) => void;
}

export const useFetch = <T extends Item>(url: string, method = 'GET'): FetchResponse<T> => {
  const [data, setData] = useState<T[] | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<RequestInit | null>(null);

  const postData = (postData: Item) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions: RequestInit | null) => {
      setIsPending(true);

      try {
        const res = await fetch(url, {...fetchOptions, signal: controller.signal });
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

    if (method === "GET") {
      fetchData(null);
    }
    if (method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, options, method]);

  return { data, isPending, error, postData };
};
