import { apiConfig } from "../../utils/api/api.config";

interface ProductQueryParams {
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export const getAllProduct = async ({ queryKey }: { queryKey: [string, ProductQueryParams?] }) => {
  const [, params = {}] = queryKey;
  const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value));
  const response = await apiConfig.get("/product-all", { params: filteredParams });
  return response.data;
};
//API untuk TOKO

export const getProduct = async () => {
    const response = await apiConfig.get("/product");
    return response.data;
};


export const getProductById = async (id: string) => {
    const response = await apiConfig.get(`/product/${id}`);
    return response.data;
};

export const createProduct = async (data: any) => {
    const response = await apiConfig.post("/product", data);
    return response.data;
}

export const updateProduct = async (id: string, data: any) => {
    const response = await apiConfig.put(`/product/${id}`, data);
    return response.data;
}

export const deleteProduct = async (id: string) => {
    const response = await apiConfig.delete(`/product/${id}`);
    return response.data;
}