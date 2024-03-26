import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { infoAlertFC } from "../../utils/functions";
import Swal from "sweetalert2";
import CardHistoryOrder from "../../components/Admin/CardHistoryOrder";

const HistoryOrderUser = () => {
  const authToken = Cookies.get("authToken");
  const [dataUser, setDataUser] = useState({
    data: [],
  });

  const cekData = async () => {
    try {
      const response = await axios.get("https://mern-storeidku.vercel.app/my-payment", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setDataUser(response);
    } catch (error) {
      infoAlertFC("Warning", "Anda Belum Punya Riwayat Order", "warning");
    }
  };

  useEffect(() => {
    cekData();
  }, []);

  const ubahStatus = (id: any) => {
    Swal.fire({
      title: "Confirmation",
      text: "Anda ingin mengubah Status?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "NO",
      confirmButtonColor: "rgb(255 10 10)",
    }).then((res: any) => {
      if (res.isConfirmed) {
        axios
          .put(
            `https://mern-storeidku.vercel.app/payment/${id}`,
            { status: "Selesai" },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          .then(() => {
            Swal.fire({
              title: "Confirmation",
              text: "Status Produk Berhasil diubah",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "rgb(255 10 10)",
            });
            cekData();
          });
      }
    });
  };
  return (
    <>
      <div id="main-container" className="flex flex-col font-Poppins">
        <h2 className="font-poppins text-xl md:text-2xl font-semibold text-[#111827] mb-[12px] ml-5">Pesanan Saya</h2>
        <div id="users-container" className="flex justify-center items-center">
          <div id="users-list" className="flex flex-col lg:h-[100vh] h-[105vh] gap-5 mb-20 border-2 border-slate-50 p-2 md:p-5 overflow-y-scroll w-full">
            {dataUser.data.map((item: any) =>
              item.dataSemua.map((item: any) => (
                <CardHistoryOrder
                  key={item._id}
                  price={item.price}
                  nama_lengkap={item.nama_lengkap}
                  description={item.alamat}
                  type={item._id}
                  image={item.image}
                  brand={item.brand}
                  stock={item.quantity}
                  status={item.status}
                  hapus={() => ubahStatus(item._id)}
                  paymentStatus={item.transaction_status}
                  check={true}
                />
              ))
            )}

            {(!dataUser || !dataUser.data || dataUser.data.length === 0) && (
              <div className="flex items-center w-full justify-center h-[20vh] md:h-40">
                <p className="text-2xl text-gray-500">Tidak ada data.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryOrderUser;
