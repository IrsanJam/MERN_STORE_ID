import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../api/product";

interface ProductQueryParams {
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export const useMainRun = (filters: ProductQueryParams = {}) => {
  const queryKey: [string, ProductQueryParams?] = ["all-product", filters];
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: getAllProduct,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, error };
};
