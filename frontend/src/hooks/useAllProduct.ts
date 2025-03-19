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
  return useQuery({
    queryKey,
    queryFn: getAllProduct,
    staleTime: 1000 * 60 * 5,
  });
};
