import Swal, { SweetAlertIcon } from "sweetalert2";
import Cookies from "js-cookie";
import { useRedirect } from "../hooks/useNavigate";

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com)$/i;
  return emailRegex.test(email);
};

export const infoAlertFC = (
  warning: string,
  textAlert: string,
  icon: SweetAlertIcon
) => {
  Swal.fire({
    title: warning,
    text: textAlert,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: "OK",
    confirmButtonColor: "rgb(255 10 10)",
  });
};

export const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

export const copyToClipboard = (vaNumber: string | any) => {
  const vaCodeInput = document.createElement("input");
  let valueToCopy = "";
  if (vaNumber) {
    valueToCopy = vaNumber;
  }
  vaCodeInput.value = valueToCopy;
  document.body.appendChild(vaCodeInput);
  vaCodeInput.select();
  document.execCommand("copy");
  document.body.removeChild(vaCodeInput);

  infoAlertFC("Info", "VA Number Berhasil disalin", "success");
};


export const logOut = (): void => {
  Swal.fire({
    title: "Confirmation",
    text: "Anda yakin ingin keluar?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "NO",
    confirmButtonColor: "rgb(255 10 10)",
  }).then((res) => {
    if (res.isConfirmed) {
      Cookies.remove("username");
      Cookies.remove("gambar");
      Cookies.remove("image");
      Cookies.remove("authToken");
      window.location.href = "/login"; // Paksa redirect ke login
    }
  });
};
