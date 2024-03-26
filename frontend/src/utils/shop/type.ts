export interface FormDataShop {
  name: string;
  address: string;
}

export interface ShopProfile {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  svg: React.ReactNode;
}

export interface CartType {
  _id: string;
  brand?: string;
  type?: string;
  quantity: number;
  price: number;
  totalPrice: number;
  image: string;
}

export interface CartState {
  items: CartType[];
  total: number;
  brand?: string;
  type?: string;
  qty?: number;
}
