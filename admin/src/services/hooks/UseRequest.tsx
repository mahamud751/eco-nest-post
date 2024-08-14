import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

const useFetch = <T,>(path: string) => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });
      try {
        const res = await axios.get<T>(`http://localhost:8080/v1/${path}`);
        setState({ data: res.data, loading: false, error: null });
      } catch (err) {
        setState({ data: null, loading: false, error: err as AxiosError });
      }
    };

    fetchData();
  }, [path]);

  const reFetch = async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const res = await axios.get<T>(`http://localhost:8080/v1/${path}`);
      setState({ data: res.data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: err as AxiosError });
    }
  };

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    reFetch,
  };
};

export default useFetch;
