import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

export const handleLoginError = (error: any) => {
  if (error.message === "Network Error") {
    Swal.fire({
      title: "Warning",
      text: "Tidak terkoneksi ke database",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "rgb(255 10 10)",
    });
  } else if (error.response.status === 404) {
    Swal.fire({
      title: "Warning",
      text: "Anda Belum Punya akun, Anda harus registrasi dulu",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "rgb(255 10 10)",
    }).then((res: any) => {
      if (res.isConfirmed) {
        navigate("/register");
      }
    });
  } else if (error.response.status === 400) {
    Swal.fire({
      title: "Confirmation",
      text: "Password anda Salah",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "rgb(255 10 10)",
    });
  }
};
