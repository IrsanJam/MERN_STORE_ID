import { FC, useEffect, useState } from "react";
import { typeLaptopDetail } from "../../utils/products/type";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import NumberFormatter from "../../components/NumberFormatter";
import Header from "../../components/Product/Header";
import Footer from "../../components/Footer";
import { infoAlertFC } from "../../utils/functions";

const DetailProduct: FC = () => {
  const username = Cookies.get("username");
  const navigate = useNavigate();
  const location = useLocation();
  const [detail, setDetail] = useState<typeLaptopDetail>();
  const [number, setNumber] = useState(1);
  const id = location.state.id;
  const authToken = Cookies.get("authToken");

  const showDetail = async () => {
    try {
      const response = await axios.get(`https://mern-storeidku.vercel.app/product/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const filteredData = response.data;
      setDetail(filteredData);
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: `Tidak ada data`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(3 150 199)",
      });
    }
  };

  const addCart = async (data: any) => {
    try {
      const totalPrice = data.price * number;
      const quantity = 1 * number;
      const updateData = { ...data, totalPrice, quantity };

      if (username) {
        try {
          await axios.post(`https://mern-storeidku.vercel.app/cart?productId=${id}`, updateData, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          });
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
        } catch (error: any) {
          infoAlertFC("Error", "Gagal untuk menambahkan ke Keranjang", "error");
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
    } catch (error) {
      infoAlertFC("Error", "Error Menambahkan data Ke Keranjang", "error");
    }
  };

  const clickProduct = () => {
    if (username) {
      addCart(detail);
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

  const addValue = () => {
    setNumber((prev) => prev + 1);
    setTimeout(() => {
      if (number === detail?.stock) {
        Swal.fire({
          title: "Konfirmasi",
          text: `Stock hanya tersisa ${detail.stock}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "No",
          confirmButtonColor: "rgb(255 15 19)",
        });
        setNumber(detail.stock);
      }
    }, 0);
  };

  useEffect(() => {
    showDetail();
  }, []);

  return (
    <>
      <div id="main-container" className="h-screen w-screen">
        <Header />
        <div className="flex justify-center items-center w-full">
          <div
            id="content-container"
            className="content flex flex-col md:flex-row justify-center items-center lg:p-10 mb-20 mt-40  lg:px-10 shadow-md bg-white  border-[0.5px] border-slate-200 border-opacity-15 rounded-md gap-8 font-Poppins w-10/12"
          >
            <div id="image-container" className="flex justify-center h-full md:h-[25rem] items-center border-2 border-slate-100 rounded-md shadow-md w-full md:w-1/2 overflow-hidden">
              <img id="product-image" src={`${detail?.image}`} className="w-[80%] h-full  rounded-md" />
            </div>
            <div id="details-container" className="flex flex-col items-start p-5 lg:p-8 md:py-5 justify-start md:h-[25rem] w-full md:w-1/2 gap-5">
              <span id="product-model" className="md:text-3xl text-lg font-bold text-slate-400">
                {detail?.type}
              </span>
              <NumberFormatter value={detail ? detail?.price : ""} />
              <span id="product-info" className="md:text-xl text-sm font-semibold text-slate-500">
                Ram {detail?.ram} | Storage {detail?.storage}
              </span>
              <span id="product-description" className="md:text-sm text-xs font-sans">
                {detail?.description} with processor
                <span id="processor" className="font-semibold">
                  {detail?.processor}
                </span>
              </span>
              <div id="separator" className="p-[0.5px] bg-slate-400 w-1/2 "></div>
              <div id="quantity-controls" className="flex gap-5">
                <div id="quantity-selector" className="flex justify-center items-center p-3  bg-slate-400 md:p-3 gap-8 rounded-md text-white">
                  <span className="font-bold text-slate-50 text-xs lg:text-base cursor-pointer" onClick={() => setNumber((prev) => Math.max(prev - 1, 1))}>
                    -
                  </span>
                  <span id="quantity-display" className="font-bold text-slate-50 text-xs lg:text-base">
                    {number}
                  </span>
                  <span className="font-bold text-slate-50 text-xs lg:text-base cursor-pointer" onClick={addValue}>
                    +
                  </span>
                </div>

                <button id="add-to-cart" onClick={clickProduct} className="lg:px-16 px-5 text-xs lg:text-base py-2 rounded-lg bg-[#0396C7] text-white w-f">
                  Masukan Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DetailProduct;
