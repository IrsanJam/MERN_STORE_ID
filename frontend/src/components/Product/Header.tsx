import axios from "axios";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar: FC = () => {
  const authToken = Cookies.get("authToken");
  const username = Cookies.get("username");
  const gambar = Cookies.get("gambar");
  const navigate = useNavigate();
  const [showHamMenu, setShowHam] = useState<Boolean>(false);
  const [hidden, setHidden] = useState<Boolean>(false);

  const logOut = (): void => {
    Swal.fire({
      title: "Confirmation",
      text: "Anda yakin ingin keluar",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "NO",
      confirmButtonColor: "rgb(255 10 10)",
    }).then((res) => {
      if (res.isConfirmed) {
        Cookies.remove("gambar");
        Cookies.remove("image");
        Cookies.remove("authToken");
        Cookies.remove("username");
        navigate("/login");
      }
    });
  };

  const call = async () => {
    if (username) {
      try {
        const userIdToko = await axios.get(`https://mern-storeidku.vercel.app/store`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (userIdToko.data.message !== "There is no store") {
          setHidden(true);
        }
      } catch (error: any) {
        setHidden(false);
      }
    }
  };

  useEffect(() => {}, [username]);
  useEffect(() => {
    call();
  }, []);

  return (
    <div className="flex justify-between  fixed z-10 w-screen items-center px-5 md:px-28 py-2 md:py-0 bg-white shadow-sm h-[10vh] md:h-[20vh]">
      {username !== "admin" ? (
        <h2 onClick={() => navigate("/")} className="cursor-pointer text-2xl md:text-4xl font-bold text-[#0396C7]">
          StoreID
        </h2>
      ) : (
        <h2 className=" text-2xl md:text-4xl font-bold text-[#0396C7]">StoreID</h2>
      )}

      <div className="flex items-center gap-2 md:gap-10">
        <div className="items-center justify-end gap-5 flex">
          {username !== "admin" && (
            <p className="font-poppins font-normal text-lg hidden lg:block font-Poppins text-[#828282] cursor-pointer" onClick={() => navigate("/")}>
              Product
            </p>
          )}

          {username === "admin" || username ? (
            ""
          ) : username ? (
            <svg onClick={() => navigate("/cart")} className="cursor-pointer" width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.7188 23.3125C11.7188 23.7761 11.5813 24.2292 11.3238 24.6146C11.0662 25 10.7002 25.3004 10.2719 25.4778C9.84365 25.6552 9.3724 25.7017 8.91776 25.6112C8.46311 25.5208 8.0455 25.2976 7.71772 24.9698C7.38994 24.642 7.16672 24.2244 7.07628 23.7697C6.98585 23.3151 7.03226 22.8438 7.20966 22.4156C7.38705 21.9873 7.68746 21.6213 8.07288 21.3637C8.45831 21.1062 8.91145 20.9688 9.375 20.9688C9.9966 20.9688 10.5927 21.2157 11.0323 21.6552C11.4718 22.0948 11.7188 22.6909 11.7188 23.3125ZM21.5625 20.9688C21.0989 20.9688 20.6458 21.1062 20.2604 21.3637C19.875 21.6213 19.5746 21.9873 19.3972 22.4156C19.2198 22.8438 19.1733 23.3151 19.2638 23.7697C19.3542 24.2244 19.5774 24.642 19.9052 24.9698C20.233 25.2976 20.6506 25.5208 21.1053 25.6112C21.5599 25.7017 22.0312 25.6552 22.4594 25.4778C22.8877 25.3004 23.2537 25 23.5113 24.6146C23.7688 24.2292 23.9062 23.7761 23.9062 23.3125C23.9062 22.6909 23.6593 22.0948 23.2198 21.6552C22.7802 21.2157 22.1841 20.9688 21.5625 20.9688ZM27.5941 6.85117L24.3961 17.2457C24.1919 17.9179 23.7764 18.5064 23.2113 18.9237C22.6462 19.3411 21.9615 19.5651 21.259 19.5625H9.71836C9.00575 19.5602 8.31308 19.327 7.74413 18.8979C7.17518 18.4688 6.7606 17.8669 6.5625 17.1824L2.55586 3.15625H1.40625C1.03329 3.15625 0.675604 3.00809 0.411881 2.74437C0.148158 2.48065 0 2.12296 0 1.75C0 1.37704 0.148158 1.01935 0.411881 0.755631C0.675604 0.491908 1.03329 0.34375 1.40625 0.34375H2.90859C3.41759 0.345322 3.91235 0.511893 4.31866 0.818474C4.72497 1.12506 5.02092 1.55512 5.16211 2.04414L6.01641 5.03125H26.25C26.4701 5.03123 26.6871 5.08287 26.8836 5.18201C27.0801 5.28115 27.2505 5.42502 27.3813 5.60205C27.512 5.77908 27.5994 5.98432 27.6364 6.20128C27.6733 6.41823 27.6589 6.64083 27.5941 6.85117ZM24.3457 7.84375H6.81914L9.26719 16.4102C9.29522 16.5082 9.35442 16.5943 9.43584 16.6557C9.51725 16.717 9.61643 16.7501 9.71836 16.75H21.259C21.3593 16.7502 21.4571 16.7182 21.5379 16.6587C21.6186 16.5992 21.6782 16.5154 21.7078 16.4195L24.3457 7.84375Z"
                fill="#0396C7"
              />
            </svg>
          ) : (
            <span onClick={() => navigate("/register")} className="md:mr-[10vw] mr-0 underline text-sm lg:text-lg font-bold text-[#0396C7] cursor-pointer">
              Sign Up
            </span>
          )}
        </div>

        {username === "admin" && showHamMenu && (
          <div className="bg-white ease-in duration-1000 transition-all p-4 absolute md:top-[20vh] top-[10vh] right-[0rem] border-[1.2px] shadow-md w-[60vw] md:w-[20vw]">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col justify-center items-start w-full gap-3">
                <button onClick={() => navigate("/list-users")} className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="#272D2F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Daftar User
                </button>
                <button onClick={() => navigate("/history-order-all")} className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 19V13.6C13 13.0399 13 12.7599 12.891 12.546C12.7951 12.3578 12.6422 12.2049 12.454 12.109C12.2401 12 11.9601 12 11.4 12H8.6C8.03995 12 7.75992 12 7.54601 12.109C7.35785 12.2049 7.20487 12.3578 7.10899 12.546C7 12.7599 7 13.0399 7 13.6V19M1 5C1 6.65685 2.34315 8 4 8C5.65685 8 7 6.65685 7 5C7 6.65685 8.34315 8 10 8C11.6569 8 13 6.65685 13 5C13 6.65685 14.3431 8 16 8C17.6569 8 19 6.65685 19 5M4.2 19H15.8C16.9201 19 17.4802 19 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C19 17.4802 19 16.9201 19 15.8V4.2C19 3.0799 19 2.51984 18.782 2.09202C18.5903 1.71569 18.2843 1.40973 17.908 1.21799C17.4802 1 16.9201 1 15.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V15.8C1 16.9201 1 17.4802 1.21799 17.908C1.40973 18.2843 1.71569 18.5903 2.09202 18.782C2.51984 19 3.07989 19 4.2 19Z"
                      stroke="#272D2F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Daftar Transaksi User
                </button>
                <button onClick={logOut} className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full">
                  <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.56 2.44L11.11 3.89C11.9912 4.42057 12.7203 5.16984 13.2266 6.06515C13.733 6.96046 13.9994 7.97142 14 9C14 10.5913 13.3679 12.1174 12.2426 13.2426C11.1174 14.3679 9.5913 15 8 15C6.4087 15 4.88258 14.3679 3.75736 13.2426C2.63214 12.1174 2 10.5913 2 9C2 6.83 3.16 4.94 4.88 3.88L3.44 2.44C2.3779 3.17279 1.50984 4.15277 0.910579 5.29555C0.311319 6.43832 -0.00117702 7.70963 3.33137e-06 9C3.33137e-06 11.1217 0.842858 13.1566 2.34315 14.6569C3.84344 16.1571 5.87827 17 8 17C10.1217 17 12.1566 16.1571 13.6569 14.6569C15.1571 13.1566 16 11.1217 16 9C16 6.28 14.64 3.88 12.56 2.44ZM9 0H7V10H9"
                      fill="#272D2F"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {username !== "admin" && showHamMenu && (
          <div className="bg-white ease-in duration-1000 transition-all p-4 absolute md:top-[20vh] top-[10vh] right-[0rem] border-[1.2px] shadow-md w-[50vw] md:w-[20vw]">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col justify-center items-start w-full gap-3">
                <button onClick={() => navigate("/my-profile")} className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="#272D2F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Profil Saya
                </button>
                {!hidden ? (
                  <button id="profilTokoBtn" onClick={() => navigate("/create-toko")} className="text-[#828282] hover:text-[#0396C7] flex items-center gap-3 w-full">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13 19V13.6C13 13.0399 13 12.7599 12.891 12.546C12.7951 12.3578 12.6422 12.2049 12.454 12.109C12.2401 12 11.9601 12 11.4 12H8.6C8.03995 12 7.75992 12 7.54601 12.109C7.35785 12.2049 7.20487 12.3578 7.10899 12.546C7 12.7599 7 13.0399 7 13.6V19M1 5C1 6.65685 2.34315 8 4 8C5.65685 8 7 6.65685 7 5C7 6.65685 8.34315 8 10 8C11.6569 8 13 6.65685 13 5C13 6.65685 14.3431 8 16 8C17.6569 8 19 6.65685 19 5M4.2 19H15.8C16.9201 19 17.4802 19 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C19 17.4802 19 16.9201 19 15.8V4.2C19 3.0799 19 2.51984 18.782 2.09202C18.5903 1.71569 18.2843 1.40973 17.908 1.21799C17.4802 1 16.9201 1 15.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V15.8C1 16.9201 1 17.4802 1.21799 17.908C1.40973 18.2843 1.71569 18.5903 2.09202 18.782C2.51984 19 3.07989 19 4.2 19Z"
                        stroke="#272D2F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Buat Toko Saya
                  </button>
                ) : (
                  <button id="profilTokoBtn" onClick={() => navigate("/shop-profile")} className="text-[#828282] hover:text-[#0396C7] flex items-center gap-3 w-full">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13 19V13.6C13 13.0399 13 12.7599 12.891 12.546C12.7951 12.3578 12.6422 12.2049 12.454 12.109C12.2401 12 11.9601 12 11.4 12H8.6C8.03995 12 7.75992 12 7.54601 12.109C7.35785 12.2049 7.20487 12.3578 7.10899 12.546C7 12.7599 7 13.0399 7 13.6V19M1 5C1 6.65685 2.34315 8 4 8C5.65685 8 7 6.65685 7 5C7 6.65685 8.34315 8 10 8C11.6569 8 13 6.65685 13 5C13 6.65685 14.3431 8 16 8C17.6569 8 19 6.65685 19 5M4.2 19H15.8C16.9201 19 17.4802 19 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C19 17.4802 19 16.9201 19 15.8V4.2C19 3.0799 19 2.51984 18.782 2.09202C18.5903 1.71569 18.2843 1.40973 17.908 1.21799C17.4802 1 16.9201 1 15.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V15.8C1 16.9201 1 17.4802 1.21799 17.908C1.40973 18.2843 1.71569 18.5903 2.09202 18.782C2.51984 19 3.07989 19 4.2 19Z"
                        stroke="#272D2F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Toko Saya
                  </button>
                )}
                <button onClick={logOut} className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full">
                  <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.56 2.44L11.11 3.89C11.9912 4.42057 12.7203 5.16984 13.2266 6.06515C13.733 6.96046 13.9994 7.97142 14 9C14 10.5913 13.3679 12.1174 12.2426 13.2426C11.1174 14.3679 9.5913 15 8 15C6.4087 15 4.88258 14.3679 3.75736 13.2426C2.63214 12.1174 2 10.5913 2 9C2 6.83 3.16 4.94 4.88 3.88L3.44 2.44C2.3779 3.17279 1.50984 4.15277 0.910579 5.29555C0.311319 6.43832 -0.00117702 7.70963 3.33137e-06 9C3.33137e-06 11.1217 0.842858 13.1566 2.34315 14.6569C3.84344 16.1571 5.87827 17 8 17C10.1217 17 12.1566 16.1571 13.6569 14.6569C15.1571 13.1566 16 11.1217 16 9C16 6.28 14.64 3.88 12.56 2.44ZM9 0H7V10H9"
                      fill="#272D2F"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {username && (
          <div className="flex items-center gap-2 md:gap-5">
            <p className="text-base md:text-xl font-medium text-[#0396C7]">{username}</p>
            <img
              onClick={() => setShowHam(!showHamMenu)}
              className="cursor-pointer rounded-full w-10 h-10 md:w-12 md:h-12 object-cover shadow-md border-[2px] border-slate-400"
              src={!gambar ? `https://cdn-icons-png.flaticon.com/512/9131/9131529.png` : gambar}
              alt="profile"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
