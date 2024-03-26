import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { infoAlertFC } from "../../utils/functions";
import CardHistoryOrder from "../../components/Admin/CardHistoryOrder";

const HistoryOrderProducts = () => {
  const authToken = Cookies.get("authToken");
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState({
    data: [],
  });

  const ubahData = (id: any) => {
    if (id) {
      navigate(`/edit-produk/${id}`, {
        state: {
          id: `${id}`,
        },
      });
    }
  };

  const cekData = async () => {
    try {
      const response = await axios.get("https://mern-storeidku.vercel.app/payment", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setDataUser(response);
    } catch (error) {
      infoAlertFC("Warning", "Anda belum Pernah Punya Pesanan", "warning");
    }
  };

  useEffect(() => {
    cekData();
  }, []);

  return (
    <>
      <div id="main-container" className="flex flex-col py-5  font-Poppins">
        <h2 className="font-poppins text-xl md:text-2xl font-semibold text-[#111827] mb-[12px] ml-5">Daftar Pesanan</h2>
        <div id="users-container" className="flex justify-center items-center">
          <div id="users-list" className="flex flex-col lg:h-[80vh] h-[100vh] gap-5  border-2 border-slate-50 p-2 md:p-5 overflow-y-scroll w-[95vw] md:w-[90vw]">
            {dataUser.data.map((item: any) =>
              item.dataSemua.map((item: any) => (
                <CardHistoryOrder
                  key={item._id}
                  ubah={() => ubahData(item._id)}
                  price={item.price}
                  nama_lengkap={item.nama_lengkap}
                  description={item.alamat}
                  type={item._id}
                  image={item.image}
                  brand={item.brand}
                  stock={item.quantity}
                  status={item.status}
                  paymentStatus={item.transaction_status}
                  check={false}
                />
              ))
            )}

            {(!dataUser || dataUser.data.length === 0) && (
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

export default HistoryOrderProducts;
