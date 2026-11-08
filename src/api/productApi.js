import axios from "axios";
import { useEffect, useState } from "react";

// Responses are kept for the session so going back to a page is instant
const responseCache = new Map();

const cachedGet = (url, params) => {
  const key = `${url}?${new URLSearchParams(params)}`;

  if (!responseCache.has(key)) {
    const request = axios
      .get(url, { params })
      .then((response) => response.data)
      .catch((error) => {
        responseCache.delete(key);
        throw error;
      });
    responseCache.set(key, request);
  }

  return responseCache.get(key);
};

const cleanParams = (params) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );

// { page, limit, category, q, sort, maxPrice } -> { products, total, page, pages, priceMax }
export const getProducts = (params = {}) =>
  cachedGet("/api/products", cleanParams(params));

export const getProduct = (id) =>
  cachedGet(`/api/products/${encodeURIComponent(id)}`, {});

export const getCategories = () => cachedGet("/api/categories", {});

// Runs an api call whenever deps change and tracks loading / error state
export const useApi = (load, deps) => {
  const key = JSON.stringify(deps);
  const [state, setState] = useState({ key: null, data: null, error: null });

  useEffect(() => {
    let cancelled = false;

    load()
      .then((data) => !cancelled && setState({ key, data, error: null }))
      .catch((error) => {
        console.error(error);
        if (!cancelled) setState({ key, data: null, error });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Until the result for the current deps arrives, we are loading
  const isLoading = state.key !== key;

  return {
    data: isLoading ? null : state.data,
    error: isLoading ? null : state.error,
    isLoading,
  };
};

export const useCategories = () => {
  const { data, isLoading } = useApi(getCategories, []);
  return { categories: data || [], isLoading };
};
