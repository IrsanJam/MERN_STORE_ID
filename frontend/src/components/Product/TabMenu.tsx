
const TabMenu = ({
  showHamMenu,
  username,
  navigate,
  hidden,
  logOut,
}: {
  showHamMenu: boolean;
  username: string;
  navigate: any;
  hidden: boolean;
  logOut: () => void;
}) => {
  return (
    <div>
      {username === "admin" && showHamMenu && (
        <div className="bg-white ease-in duration-1000 transition-all p-4 absolute md:top-[20vh] top-[11vh] right-[0rem] border-[1.2px] shadow-md w-[50vw] md:w-[20vw]">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center items-start w-full gap-3">
              <button
                id="userListBtn"
                className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="#272D2F"
                  />
                </svg>
                Daftar User
              </button>
              <button
                id="transaksiUserBtn"
                className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 19V13.6C13 13.0399 13 12.7599 12.891 12.546C12.7951 12.3578 12.6422 12.2049 12.454 12.109C12.2401 12 11.9601 12 11.4 12H8.6C8.03995 12 7.75992 12 7.54601 12.109C7.35785 12.2049 7.20487 12.3578 7.10899 12.546C7 12.7599 7 13.0399 7 13.6V19M1 5C1 6.65685 2.34315 8 4 8C5.65685 8 7 6.65685 7 5C7 6.65685 8.34315 8 10 8C11.6569 8 13 6.65685 13 5C13 6.65685 14.3431 8 16 8C17.6569 8 19 6.65685 19 5M4.2 19H15.8C16.9201 19 17.4802 19 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C19 17.4802 19 16.9201 19 15.8V4.2C19 3.0799 19 2.51984 18.782 2.09202C18.5903 1.71569 18.2843 1.40973 17.908 1.21799C17.4802 1 16.9201 1 15.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V15.8C1 16.9201 1 17.4802 1.21799 17.908C1.40973 18.2843 1.71569 18.5903 2.09202 18.782C2.51984 19 3.07989 19 4.2 19Z"
                    stroke="#272D2F"
                  />
                </svg>
                Daftar Transaksi User
              </button>
              <button
                onClick={logOut}
                id="logoutBtn"
                className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
        <div className="bg-white ease-in duration-1000 transition-all p-4 absolute md:top-[20vh] top-[11vh] right-[0rem] border-[1.2px] shadow-md w-[50vw] md:w-[20vw]">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center items-start w-full gap-3">
              <button
                onClick={() => navigate("my-profile")}
                className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                <button
                  id="profilTokoBtn"
                  onClick={() => navigate("/create-toko")}
                  className="text-[#828282] hover:text-[#0396C7] flex items-center gap-3 w-full"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                <button
                  id="profilTokoBtn"
                  onClick={() => navigate("/shop-profile")}
                  className="text-[#828282] hover:text-[#0396C7] flex items-center gap-3 w-full"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
              <button
                onClick={logOut}
                className="text-[#828282] hover:text-[#0396C7] flex  items-center gap-3 w-full"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
    </div>
  );
};

export default TabMenu;
