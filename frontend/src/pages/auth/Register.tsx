import bgCoverUser from "../../img/Rectangle 2775.png";
import { FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useRegisterStore } from "../../feature/useRegisterStore";
import { useAuthRun } from "../../hooks/useAuthRun";

const Register: FC = () => {
  const navigate = useNavigate();
  const {registerData,setRegisterData} = useRegisterStore()
  const {registerRun} = useAuthRun()

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com)$/i;
    if (!emailRegex.test(registerData.email)) {
      Swal.fire({
        title: "Warning",
        text: "Format email tidak valid",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(255 10 10)",
      });
      return;
    }
    registerRun.mutate(registerData)
  };
  return (
    <>
      <div id="register-container" className="h-screen w-screen flex justify-center items-center font-['Poppins']">
        <div id="register-main" className="main h-[85vh] w-[90vw]">
          <div id="title-container" className="title flex flex-col mb-8">
            <span id="register-title" className="font=['Poppins'] text-xl font-semibold text-[#333333]">
              Register
            </span>
            <span id="register-subtitle" className="text-[#828282] text-sm font-semibold">
              Menambah akun
            </span>
          </div>

          <div id="shadow-container" className="shadow-md h-[75vh] rounded-md">
            <div id="image-container" className="container w-full md:h-[17vh] h-[10vh">
              <img src={bgCoverUser} className="h-full w-full" alt="bgCover" />
            </div>

            <div id="form-container" className="flex flex-col justify-start items-center mt-5 md:px-0 px-3">
              <span id="form-title" className="text-[#333333] font-bold font-['Poppins']">
                Users Profil
              </span>
              <form onSubmit={handleRegister} id="register-form">
                <div id="form-fields" className="flex md:flex-row flex-col justify-center items-start md:gap-16 gap-5 mt-5">
                  <div className="flex flex-col md:w-1/2 w-full items-start">
                    <span id="nama-lengkap-label">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </span>
                    <input
                      value={registerData.full_name}
                      onChange={(e) => setRegisterData("full_name", e.target.value)}
                      maxLength={32}
                      required
                      type="text"
                      className="w-full  border-2 px-[0.4rem] py-[0.3rem] border-[#CED4DA] rounded-md"
                      id="nama-lengkap-input"
                    />
                    <div className="flex justify-center items-start gap-5">
                      <div className="flex flex-col mt-2">
                        <span id="username-label">
                          Username <span className="text-red-500">*</span>
                        </span>
                        <input
                          value={registerData.username}
                          onChange={(e) => setRegisterData("username", e.target.value)}
                          maxLength={15}
                          required
                          type="text"
                          className="w-full px-[0.4rem]  py-[0.3rem] border-2 border-[#CED4DA] rounded-md"
                          id="username-input"
                        />
                      </div>
                      <div className="flex flex-col mt-2">
                        <span id="password-label">
                          Password <span className="text-red-500">*</span>
                        </span>
                        <input
                          value={registerData.password}
                          onChange={(e) => setRegisterData("password", e.target.value)}
                          required
                          type={registerData.showPassword ? "text" : "password"}
                          className="w-full  px-[0.4rem]  py-[0.3rem] border-2 border-[#CED4DA] rounded-md"
                          id="password-input"
                        />
                        <div className="flex justify-center items-center w-11/12 md:w-9/12 mt-3 ">
                          <input
                          onChange={() => setRegisterData("showPassword", !registerData.showPassword)}
                          checked={registerData.showPassword}
                            type="checkbox"
                            name="checkbox"
                            id="checkbox"
                            className="bg-[#EDEDED] text-blue-500 text-sm"
                          />
                          <label htmlFor="perempuan" className="text-xs md:text-sm ml-1">
                            Tampilkan Password
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <div className="flex flex-col mt-2">
                        <span id="jenis-kelamin-label">
                          Jenis Kelamin <span className="text-red-500">*</span>
                        </span>
                        <div className="flex gap-5">
                          <div className="div">
                            <input checked={registerData.gender === "laki-laki"}  onChange={() => setRegisterData("gender", "laki-laki")} required type="radio" name="jenis-kelamin" id="laki-laki" />
                            <label htmlFor="laki-laki" className="text-xs md:text-sm ml-1">
                              Laki laki
                            </label>
                          </div>
                          <div className="div">
                            <input checked={registerData.gender === "perempuan"}  onChange={() => setRegisterData("gender", "perempuan")}required type="radio" name="jenis-kelamin" id="perempuan" />
                            <label htmlFor="perempuan" className="text-xs md:text-sm ml-1">
                              Perempuan
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:w-1/2 w-full">
                    <span id="email-label">
                      Email <span className="text-red-500">*</span>
                    </span>
                    <input  onChange={(e) => setRegisterData("email", e.target.value)} type="email" className="w-full px-[0.4rem]  py-[0.3rem]  border-2 border-[#CED4DA] rounded-md" id="email-input" />
                    <span className="mt-2" id="nomor-hp-label">
                      No Handphone <span className="text-red-500">*</span>
                    </span>
                    <input
                   onChange={(e) => setRegisterData("no_handphone", e.target.value)}
                      type="tel"
                      pattern="[0-9]*"
                      maxLength={12}
                      className="w-full px-[0.4rem]  py-[0.3rem] border-2 border-[#CED4DA] rounded-md"
                      id="nomor-hp-input"
                    />

                    {registerData.full_name === "" && (
                      <span id="login-link" className="underline p-2 text-[#0396C7] cursor-pointer " onClick={() => navigate("/login")}>
                        Saya sudah punya akun
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button type="submit" className="py-2  bg-[#0396C7] text-white px-5 rounded-md mt-5" id="submit-button">
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
