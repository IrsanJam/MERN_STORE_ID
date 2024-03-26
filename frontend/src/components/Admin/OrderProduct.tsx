import { FC } from "react";
import { typeHistoryOrder } from "../../utils/products/type";
import NumberFormatter from "../NumberFormatter";

const OrderProduct: FC<typeHistoryOrder> = (props: typeHistoryOrder) => {
  const { price, nama_lengkap, description, stock, brand, type, image, hapus, status, check, paymentStatus } = props;
  return (
    <div id="profileInfo" className="flex gap-5 bg-[#E5F3FF] md:p-8 p-2 rounded-md">
      <img id="profileImage" src={image} alt="person" className="rounded-md  md:h-1/2 h-1/4 w-1/4" />
      <div className="flex flex-col w-full gap-3">
        <div className="div flex justify-between">
          <span id="profileName" className="font-semibold md:text-xl text-sm place-self-end">
            Nama Pelanggan : {nama_lengkap}
          </span>
          <span className={`md:ml-5 ml-1 rounded-md md:py-2 md:px-4 p-1 text-black  ${status === "Selesai" ? "bg-orange-400 text-white" : "bg-slate-50"}  border-opacity-60 md:text-base text-xs`}>{status}</span>
        </div>
        <span id="profileUsername" className="text-[#999999] text-xs md:text-base">
          Nama Produk : {brand} {type}
        </span>
        <span id="profileUsername" className="text-[#999999] text-xs md:text-base">
          Alamat : {description}
        </span>
        <span id="profilePhone" className="text-[#999999] text-xs md:text-base">
          Kuantitas : {stock}
        </span>
        <span id="profilePhone" className="text-[#999999] text-xs md:text-base">
          Status Pembayaran : {paymentStatus}
        </span>
        <span id="profileEmail" className="text-[#999999] text-xs md:text-base">
          <NumberFormatter value={price} />
        </span>
        <div className="flex items-center gap-5 mt-2">
          {check && status !== "Selesai" && (
            <button onClick={hapus} className="md:px-3 md:py-2 p-2 text-sm md:text-base bg-red-400 rounded-md  text-white">
              Ubah Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderProduct;
