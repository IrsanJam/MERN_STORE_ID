import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/product";

export const useDetailProductRun = (id: string) => {
    const queryKey = ["detail-product", id];
    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn: ({ queryKey }) => getProductById(queryKey[1]),
        staleTime: 1000 * 60 * 5
    });

    return { data, isLoading, error };
};
