export interface productDataType {
  brand: string;
  type: string;
  processor: string;
  ram: string;
  storage: string;
  price: number;
  cekProduk: () => void;
  allData: any;
  image: string;
  id: string | number;
}

export interface lapData {
  data: [];
}

export interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  content: JSX.Element;
  svg: JSX.Element;
}

export interface setDataKu {
  data?: [];
}

export interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  content: JSX.Element;
  svg: JSX.Element;
}

export interface Product {
  id: string;
  nama: string;
  merek: string;
  jumlah_barang: number;
  harga_satuan: number;
  deskripsi_barang: string;
  username: string;
  gambar_barang: string;
}

export interface ProductItem {
  product_id: string;
  nama_produk: string;
  jumlah: number;
  harga_satuan: number;
  total_harga: number;
}

export interface OrderHistoryType {
  order_id: string;
  tanggal_pemesanan: string;
  total_pembayaran: number;
  status: string;
  item_produk: ProductItem[];
}

export interface typePayment {
  gambar: string;
  value: string;
  onSelection: (value: string) => void;
  name: string;
}

export interface postPayment {
  nama_lengkap: string;
  alamat: string;
}

export interface userDataType {
  data: [];
}

export interface typeListUsers {
  id?: string | number;
  nama: string;
  no_hp: number;
  email: string;
  gambar?: string;
  username: string;
}

export interface NumberFormatterProps {
  value: number;
}

export interface showPayment {
  nama_lengkap: string;
  alamat: string;
  bank_account: string;
  va_number: string;
}

export interface orders {
  brand?: string;
  ram?: string;
  storage?: string;
  jumlah?: string;
  totalAmount: number;
  data?: any;
  orderId: string;
}
