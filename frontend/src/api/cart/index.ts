import { apiConfig } from "../../utils/api/api.config";

export const getCart = async () => {
  const response = await apiConfig.get("/cart");
  return response.data;
};

export const createCart = async (productId: string, updateData: any) => {
  const response = await apiConfig.post(`/cart?productId=${productId}`, 
    updateData,
  );
  return response.data;
};

export const updateCart = async (id: string, quantity:number) => {
  const response = await apiConfig.put(`/cart/${id}`, {quantity});
  return response.data;
};

export const deleteCart = async (id: string) => {
  const response = await apiConfig.delete(`/cart/${id}`);
  return response.data;
};
