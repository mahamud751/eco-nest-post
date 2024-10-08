import { useEffect, useState } from "react";
import axios from "axios";

const UseFetch = <T,>(path: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/v1/${path}`);
        setData(res.data.data); // Assuming your response structure has "data" as a key
      } catch (err) {
        setError((err as Error).message);
      }
      setLoading(false);
    };
    fetchData();
  }, [path]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/v1/${path}`);
      setData(res.data.data); // Ensure we're setting the correct part of the response
    } catch (err) {
      setError((err as Error).message);
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    reFetch,
  };
};

export default UseFetch;
