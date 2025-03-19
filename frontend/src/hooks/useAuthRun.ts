import { useMutation } from "@tanstack/react-query";
import { loginFetch, registerFetch } from "../api/auth";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useLoginStore } from "../feature/useLoginStore";
import { useRedirect } from "./useNavigate";
import { registerType } from "../utils/auth/type";

export const useAuthRun = () => {
  const { reset } = useLoginStore();
  const redirect = useRedirect();
  const loginRun = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginFetch({ email, password }),
    onSuccess: (data) => {
      Cookies.set("authToken", data.accessToken);
      Swal.fire({
        title: "Confirmation",
        text: "Hello Selamat Datang",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(3 150 199)",
      }).then(() => {
        Cookies.set("username", data.username);
        Cookies.set("gambar", data.image);
        redirect("/");
      });
    },
    onError: (error: any) => {
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
            redirect("/register");
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
        }).then(() => {
          reset();
        });
      }
    },
  });

  const registerRun = useMutation({
    mutationFn: (body: registerType) => registerFetch(body),
    onSuccess: (data) => {
      Swal.fire({
        title: "Confirmation",
        text: `${data.username} Anda Berhasil Registrasi`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(3 150 199)",
      }).then((res: any) => {
        if (res.isConfirmed) {
          window.location.href = 'login'
        }
      });
    },
    onError: (error: any) => {
      if (error.message === "Network Error") {
        Swal.fire({
          title: "Warning",
          text: "Tidak terkoneksi ke database",
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(255 10 10)",
        });
      } else if (error.response.data.message) {
        Swal.fire({
          title: "Warning",
          text: "Email sudah terdaftar",
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(255 10 10)",
        });
      }
    },
  });

  return {
    loginRun,
    registerRun
  };
};
