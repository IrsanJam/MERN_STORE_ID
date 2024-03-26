import { FC, useEffect } from "react";
import givSukser from "../../img/sukses-transaksi.gif";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Header from "../../components/Product/Header";

const DetailTransaction: FC = () => {
  const navigate = useNavigate();
  const username = Cookies.get("username");

  useEffect(() => {
    setTimeout(() => {
      Swal.fire({
        title: "Confirmation",
        text: "Anda ingin ke beranda ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "NO",
        confirmButtonColor: "rgb(255 10 10)",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/");
        }
      });
    }, 3000);
  }, [username]);

  return (
    <>
      <Header />
      <div className="w-full h-full flex-col justify-start items-center gap-12 flex pt-40">
        <div className="w-96 h-96 relative bg-white rounded-2xl">
          <div className="w-96 h-96 left-0 top-[47px] absolute flex-col justify-start items-center gap-12 inline-flex">
            <img src={givSukser} alt="image" width={"270px"} />
            <div className="w-[600px] h-44 flex-col justify-center items-center gap-4 flex">
              <h2 className="font-bold text-3xl">Pembayaran Berhasil</h2>
            </div>
          </div>
          <div className="w-10 h-10 left-[616px] top-[20px] absolute" />
        </div>
      </div>
    </>
  );
};

export default DetailTransaction;
