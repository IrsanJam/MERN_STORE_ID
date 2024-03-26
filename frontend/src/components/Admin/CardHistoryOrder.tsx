import { FC } from "react";
import { typeHistoryOrder } from "../../utils/products/type";
import NumberFormatter from "../NumberFormatter";

const CardHistoryOrder: FC<typeHistoryOrder> = (props: typeHistoryOrder) => {
  const { price, nama_lengkap, description, stock, brand, image, hapus, status, check, paymentStatus, type } = props;

  return (
    <>
      <div id="orderDetails" className="flex flex-col gap-3 bg-[#F0F8FF]">
        <div className="flex flex-col">
          <div className="flex flex-col p-3">
            <div className="card">
              <div className="flex justify-between items-center p-3">
                <div className="flex gap-3">
                  <span id="userName">{nama_lengkap}</span>
                </div>
                <div className="div">
                  <span id="orderStatus" className="text-[#0396C7]">
                    {status}
                  </span>
                </div>
              </div>
            </div>
            <div className="line bg-[#E6E6E6] p-[1.5px]"></div>
            <div className="div md:flex-row flex flex-col p-3 gap-3">
              <div className="h-[10vh] w-[20vw] md:h-auto hidden md:block">
                <img src={image} alt="img" className=" md:w-auto w-[20%] rounded-md" />
              </div>
              <div className="md:flex flex-col gap-4 md:w-[51%] hidden">
                <span id="productName" className="font-semibold md:text-base text-sm">
                  {brand}
                </span>
                <span id="productStorage" className=" text-xs">
                  Alamat : {description}
                </span>
                <span id="productStorage" className=" text-xs">
                  Status Pembayaran : {paymentStatus}
                </span>
                <span id="productQuantity" className="md:text-base text-xs text-[#0396C7]">
                  x {stock}
                </span>
              </div>

              <div className="flex md:hidden justify-around items-start">
                <div className="h-auto">
                  <img src={image} alt="img" className="w-[50%] rounded-md" />
                </div>
                <div className="flex flex-col gap-2 md:ml-[-150px] ml-[-110px] md:w-10/12 w-full">
                  <span id="productNameMobile" className="font-semibold md:text-base text-sm">
                    {brand}
                  </span>
                  <span id="productStorageMobile" className="md:text-base text-xs">
                    {description}
                  </span>
                  <span id="productQuantityMobile" className="md:text-base text-xs text-[#0396C7]">
                    x {stock}
                  </span>
                </div>
              </div>

              <div className="line bg-[#E6E6E6] p-[1.5px] md:w-[0] w-[14rem] h-[0] md:h-[10rem] mx-2"></div>

              <div className="flex md:w-[55%] flex-col md:gap-5 gap-2 items-start">
                <div className="flex justify-around gap-2">
                  <div className="flex justify-center items-center gap-1">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.30873 17H18.1379C19.0879 17 19.5629 17 19.95 16.8284C20.2913 16.6771 20.5834 16.4333 20.7933 16.1246C21.0314 15.7744 21.1164 15.3071 21.2863 14.3724L22.6371 6.94311C22.696 6.61918 22.7255 6.45721 22.68 6.33074C22.6401 6.21979 22.5622 6.12651 22.4602 6.06739C22.3439 6 22.1793 6 21.85 6H5.80873M2.80859 2H4.125C4.36769 2 4.48903 2 4.58717 2.04433C4.67367 2.0834 4.74726 2.14628 4.79934 2.22563C4.85843 2.31565 4.87736 2.43551 4.91521 2.67523L7.70198 20.3248C7.73983 20.5645 7.75875 20.6843 7.81785 20.7744C7.86993 20.8537 7.94352 20.9166 8.03002 20.9557C8.12816 21 8.2495 21 8.49219 21H19.8086"
                        stroke="#999999"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span id="orderNumberText" className="text-[#999999]  text-xs w-full">
                      ID Order
                    </span>
                  </div>
                  <div>
                    <span id="orderNumber" className="text-[#0396C7]  text-xs">
                      {type}
                    </span>
                  </div>
                </div>

                <div className="flex justify-around gap-3">
                  <div className="flex gap-1 justify-center items-center">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.80859 11V15M18.8086 9V13M17.8086 4C20.2573 4 21.5817 4.37476 22.2407 4.66544C22.3285 4.70415 22.3724 4.72351 22.499 4.84437C22.5749 4.91682 22.7135 5.12939 22.7491 5.22809C22.8086 5.39274 22.8086 5.48274 22.8086 5.66274V16.4111C22.8086 17.3199 22.8086 17.7743 22.6723 18.0079C22.5337 18.2454 22.4 18.3559 22.1405 18.4472C21.8855 18.5369 21.3706 18.438 20.3408 18.2401C19.62 18.1017 18.7651 18 17.8086 18C14.8086 18 11.8086 20 7.80859 20C5.35989 20 4.03546 19.6252 3.37648 19.3346C3.28872 19.2958 3.24484 19.2765 3.11819 19.1556C3.04228 19.0832 2.90371 18.8706 2.86806 18.7719C2.80859 18.6073 2.80859 18.5173 2.80859 18.3373L2.80859 7.58885C2.80859 6.68009 2.80859 6.2257 2.94487 5.99214C3.0835 5.75456 3.21718 5.64412 3.47665 5.55281C3.73173 5.46305 4.24663 5.56198 5.27642 5.75985C5.99721 5.89834 6.85207 6 7.80859 6C10.8086 6 13.8086 4 17.8086 4ZM15.3086 12C15.3086 13.3807 14.1893 14.5 12.8086 14.5C11.4279 14.5 10.3086 13.3807 10.3086 12C10.3086 10.6193 11.4279 9.5 12.8086 9.5C14.1893 9.5 15.3086 10.6193 15.3086 12Z"
                        stroke="#999999"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span id="totalOrderText" className="text-[#999999]  text-xs w-full">
                      Total Pesanan
                    </span>
                  </div>
                  <div>
                    <span id="totalOrderAmount" className="text-[#0396C7] md:text-[0.8rem] text-xs">
                      <NumberFormatter value={price} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="line bg-[#E6E6E6] p-[1.6px]"></div>
            <div id="orderDate" className="flex justify-between w-full gap-5 p-3 md:text-base text-xs">
              <div className="flex justify-center items-center">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.3491 6V12L16.3491 14M22.3491 12C22.3491 17.5228 17.872 22 12.3491 22C6.82627 22 2.34912 17.5228 2.34912 12C2.34912 6.47715 6.82627 2 12.3491 2C17.872 2 22.3491 6.47715 22.3491 12Z"
                    stroke="#999999"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>14/01/2024</p>
              </div>

              {check && status !== "Selesai" && (
                <button onClick={hapus} className=" md:px-3 md:py-2 p-2 text-sm md:text-base bg-red-400 rounded-md  text-white">
                  Ubah Status
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardHistoryOrder;
