import { FC, useEffect } from "react";
import { useState } from "react";
import { postPayment } from "../../utils/interface";
import Swal from "sweetalert2";
import NumberFormatter from "../../components/NumberFormatter";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../../components/Product/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Payment: FC = () => {
  const username = Cookies.get("username");
  const [items, setItems] = useState([]);
  const [popupTimer, setPopupTimer] = useState<number>(24 * 60 * 60 * 1000);
  const authToken = Cookies.get("authToken");
  const navigate = useNavigate();
  const location = useLocation();
  const [pembayaran, setPembayaran] = useState<postPayment>({
    nama_lengkap: "",
    alamat: "",
  });
  const toPayment: any = useRef();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPembayaran((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePayment = (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirmation",
      text: `Lanjutkan Pembayaran`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "NO",
      confirmButtonColor: "rgb(3 150 199)",
    }).then((res: any) => {
      if (res.isConfirmed) {
        axios
          .post("https://mern-storeidku.vercel.app/payment", pembayaran, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((response) => {
            navigate("/");
            window.location.href = response.data.redirect_url;
          })
          .catch((err) => {
            if (err.response.status === 400) {
              Swal.fire({
                title: "Gagal",
                text: `Anda Belum Punya Pesanan`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "OK",
                cancelButtonText: "NO",
                confirmButtonColor: "rgb(3 150 199)",
              });
            } else {
              Swal.fire({
                title: "Gagal",
                text: `Transaksi Belum Bisa dilakukan, Coba sesaat lagi `,
                icon: "error",
                showCancelButton: true,
                confirmButtonText: "OK",
                cancelButtonText: "NO",
                confirmButtonColor: "rgb(3 150 199)",
              });
            }
          });
      }
      if (popupTimer) {
        clearTimeout(popupTimer);
      }
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setPopupTimer((prev) => prev - 1000);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [popupTimer]);

  useEffect(() => {
    const finalOrder = location.state?.finalOrder;
    if (finalOrder) {
      setItems(finalOrder.items);
    }
  }, [location.state]);

  useEffect(() => {
    toPayment.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Header />
      <div ref={toPayment} className="flex flex-col items-center justify-center pt-44 gap-8 font-Poppins">
        <div className="flex flex-col px-10 gap-3">
          <span className="text-3xl  text-[#484848] font-semibold md:text-4xl lg:text-4xl text-center font-Poppins">Pembayaran</span>
          <span className=" text-[#8A8A8A] text-center text-xs md:text-base">Lakukan Pembayaran produk yang diinginkan</span>
        </div>
      </div>

      <form onSubmit={handlePayment}>
        <div className="flex justify-center items-center gap-3 h-auto my-20 font-Poppins w-full">
          <div className="flex flex-col justify-center gap-3 md:w-[50%]">
            <span className="font-semibold md:text-base text-sm">Pengguna</span>
            <input
              required
              onChange={pembayaran.nama_lengkap ? handleChange : () => setPembayaran((prev) => ({ ...prev, nama_lengkap: `${username}` }))}
              name="nama_lengkap"
              value={pembayaran.nama_lengkap}
              type="text"
              className="p-2 bg-[#F6F6F6] rounded-md"
              placeholder="Masukan Nama Pengguna"
            />
            <span className="font-semibold md:text-base text-sm">Alamat</span>
            <input required onChange={handleChange} name="alamat" value={pembayaran.alamat} type="text" className="p-2 bg-[#F6F6F6] rounded-md" placeholder="Masukan Alamat" />

            <span className="font-semibold md:text-base text-sm mt-5">Ringkasan Pembayaran</span>
            {items.map((item: any) => {
              return (
                <>
                  <hr className="w-full" />
                  <div className="flex gap-5 items-center justify-between ">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-sm">{item.type}</span>
                      <span className="font-bold text-sm">{item.quantity}x</span>
                    </div>
                  </div>
                </>
              );
            })}
            <div>
              <span className="text-sm font-bold">Total Bayar : </span>
              <span className="font-bold text-lg text-red-500">
                <NumberFormatter value={location.state.total} />
              </span>
            </div>
            <button className="flex justify-center items-center" type="submit">
              <div className="flex justify-center items-center my-10 font-semibold bg-sky-600 w-full md:w-1/2 text-white py-2.5 rounded-md">Lanjutkan Pembayaran</div>
            </button>
          </div>
        </div>
      </form>

      <Footer />
    </>
  );
};

export default Payment;
