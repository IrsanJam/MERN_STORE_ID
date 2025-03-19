import Cookies from "js-cookie";
import { FC, FormEvent } from "react";
import { infoAlertFC, isEmailValid } from "../../utils/functions";
import { useLoginStore } from "../../feature/useLoginStore";
import { useAuthRun } from "../../hooks/useAuthRun";
import { useRedirect } from "../../hooks/useNavigate";

const Login: FC = () => {
  const redirect = useRedirect()
  const {email, password, passwordVisible, setEmail, setPassword,togglePasswordVisible} = useLoginStore()
  const {loginRun} = useAuthRun()
 

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      infoAlertFC("Warning", "Format email tidak valid", "error");
      return;
    }
    if (email === "admin@gmail.com" && password === "1") {
      redirect("/list-users");
      Cookies.set("username", "admin");
    } else {
      loginRun.mutate({email,password})
    }
  };

  return (
    <>
      <div className="bg-white w-screen h-screen text-black" id="login-container">
        <div className="bg-white shadow-md text-black navbar w-screen h-[10vh] md:h-[15vh] flex justify-between px-8 md:px-16 items-center" id="navbar">
          <span className="text-lg lg:text-3xl font-bold text-[#0396C7]" id="logo">
            StoreID
          </span>
          <span onClick={() => redirect('/register')} className="underline text-xs lg:text-lg font-bold text-[rgb(130,130,130)] cursor-pointer" id="sign-up-link">
            Sign Up
          </span>
        </div>

        <form onSubmit={handleLogin} id="login-form">
          <div className="flex flex-col py-[8vh] h-[80vh] md:h-[60vh] lg:h-[80%] justify-center items-center gap-5">
            <span className="font-bold text-[2.8rem] mb-5 font-['Poppins']" id="sign-in-heading">
              Sign In
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}              type="email"
              placeholder="E-mail"
              className="px-5 py-3 w-10/12 lg:w-1/3 rounded-3xl bg-white text-gray-400 border-2"
              required
              id="email-input"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="px-5 py-3 w-10/12 lg:w-1/3 rounded-3xl bg-white text-gray-400 border-2"
              required
              id="password-input"
            />

            <div className="flex flex-col w-[80vw] lg:w-[32vw] gap-9">
              <div className="flex justify-between items-center" id="password-checkbox">
                <span className="text-[#000000]">
                  <input
                    onChange={() => togglePasswordVisible()}
                    checked={passwordVisible}
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className="bg-[#EDEDED] text-blue-500 text-sm"
                  />
                  <span className="text-sm md:text-base"> Tampilkan kata sandi</span>
                </span>
              </div>
              <button type="submit" className="py-3 px-10 text-white rounded-3xl font-bold font-['Poppins'] bg-[#0396C7] hover:opacity-80" id="sign-in-button">
                Sign In
              </button>
              <span className="text-black flex justify-center -mt-5" id="no-account-message">
                Belum punya akun?{" "}
                <span onClick={() => redirect('/register')} className="cursor-pointer underline ml-3 text-[#041DFF]" id="register-link">
                  Daftar
                </span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
