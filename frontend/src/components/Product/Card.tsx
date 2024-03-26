import NumberFormatter from "../NumberFormatter";
import { FC } from "react";
import keranjangIcon from "../../img/Keranjang.svg";
import { productDataType } from "../../utils/interface";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Card: FC<productDataType> = (props: productDataType) => {
  const { type, price, processor, cekProduk, allData, image, id, brand } = props;
  const navigate = useNavigate();
  const username = Cookies.get("username");
  const authToken = Cookies.get("authToken");

  const addCart = (data: any, id: any) => {
    const totalPrice = price;
    const updateData = { ...data, totalPrice, quantity: 1 };
    if (username) {
      try {
        axios
          .post(`https://mern-storeidku.vercel.app/cart?productId=${id}`, updateData, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            Swal.fire({
              title: "Berhasil",
              text: `Barang ditambahkan ke keranjang`,
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "rgb(3 150 199)",
            }).then((res) => {
              if (res.isConfirmed) {
                navigate("/cart");
              }
            });
          });
      } catch (error) {
        console.log("error", error);
      }
    } else {
      Swal.fire({
        title: "Konfirmasi",
        text: `Sebelum membeli Barang, anda Harus Login Dulu`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "No",
        confirmButtonColor: "rgb(3 150 199)",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <>
      <div id={`card-${id}`} className="flex flex-col justify-center items-start shadow-md border-2  border-b-zinc-600 rounded-md md:p-5 p-3 font-Poppins gap-2">
        <img id={`image-${id}`} src={`${image ? image : `https://via.placeholder.com/250`}`} alt="image" width={"200px"} className="h-full rounded-md" />
        <span id={`type-${id}`} className="font-bold md:text-sm text-xs font-Poppins">{`${brand} ${type}`}</span>
        <span id={`details-${id}`} className="text-xs">{`${processor} `}</span>
        <NumberFormatter value={price} />
        <div className="flex justify-center items-center w-full md:gap-5 gap-1">
          <button onClick={cekProduk} id={`view-product-${id}`} className="w-[80%] lg:text-base text-xs py-2 bg-[#0396C7] text-white rounded-md">
            Lihat Produk
          </button>

          <button onClick={() => addCart(allData, id)} id={`add-to-cart-${id}`} className={`md:w-[20%] w-[23%] bg-slate-300 md:py-2 py-[3px]  rounded-md flex justify-center items-center`}>
            <img src={keranjangIcon} className="w-10 p-1  md:w-6 md:p-[0.3px]" />
          </button>
        </div>
      </div>
    </>
  );
};
export default Card;
