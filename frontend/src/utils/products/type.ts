export interface typeLaptopDetail {
  storage?: string;
  price?: number | any;
  ram?: string;
  description?: string;
  type?: string;
  image?: string;
  brand?: string;
  processor?: string;
  _id?: any;
  total_price?: number;
  stock?: number;
  data?: any;
  ubah?: () => void;
  hapus?: () => void;
}

export interface typeHistoryOrder {
  price?: number | any;
  nama_lengkap?: string;
  description?: string;
  type?: string;
  image?: string;
  brand?: string;
  _id?: any;
  total_price?: number;
  stock?: number;
  data?: any;
  ubah?: () => void;
  hapus?: () => void;
  status?: string;
  check: boolean;
  paymentStatus: string;
}

export interface FormDataProduct {
  brand: string;
  price: string;
  categories: string;
  description: string;
  stock: string;
  storage: string;
  ram: string;
  type: string;
  processor: string;
  image?: string;
}

export interface MyProfile {
  id: string;
  title: string;
  subtitle: string;
  content: JSX.Element;
  svg: JSX.Element;
}
