import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface UseFetchState<T> {
  data: T | null;
  total: number | null;
  loading: boolean;
  error: AxiosError | null;
}

const UseFetch = <T,>(path: string) => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    total: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: null, total: null, loading: true, error: null });
      try {
        const res = await axios.get<{ data: T; total: number }>(
          `https://api.korbojoy.shop/v1/${path}`
        );
        setState({
          data: res.data as T,
          total: res.data.total,
          loading: false,
          error: null,
        });
      } catch (err) {
        setState({
          data: null,
          total: null,
          loading: false,
          error: err as AxiosError,
        });
      }
    };

    fetchData();
  }, [path]);

  const reFetch = async () => {
    setState({ data: null, total: null, loading: true, error: null });
    try {
      const res = await axios.get<{ data: T; total: number }>(
        `https://api.korbojoy.shop/v1/${path}`
      );
      setState({
        data: res.data as T,
        total: res.data.total,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState({
        data: null,
        total: null,
        loading: false,
        error: err as AxiosError,
      });
    }
  };

  return {
    data: state.data,
    total: state.total,
    loading: state.loading,
    error: state.error,
    reFetch,
  };
};

export default UseFetch;
