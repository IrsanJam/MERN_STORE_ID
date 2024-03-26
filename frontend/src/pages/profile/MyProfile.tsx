import bgUserCover from "../../img/Rectangle 2775.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { MyProfile } from "../../utils/products/type";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FormDataObject } from "../../utils/profile/type";
import HistoryOrderUser from "../payment/HistoryOrderUser";
import Header from "../../components/Product/Header";
import Footer from "../../components/Footer";
import { infoAlertFC } from "../../utils/functions";

function UserProfile() {
  const [activeUser, setActiveUser] = useState<string>("myProfile");

  const myProfiles: MyProfile[] = [
    {
      id: "myProfile",
      title: "Profil Saya",
      subtitle: "Ubah foto profil, nama pengguna, dll",
      content: myProfile(),
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path
            d="M11.3334 13C11.3334 12.0696 11.3334 11.6044 11.2186 11.2259C10.9601 10.3736 10.2931 9.70669 9.44084 9.44816C9.06231 9.33333 8.59712 9.33333 7.66675 9.33333H4.33342C3.40304 9.33333 2.93785 9.33333 2.55932 9.44816C1.70705 9.70669 1.04011 10.3736 0.781574 11.2259C0.666748 11.6044 0.666748 12.0696 0.666748 13M9.00008 4C9.00008 5.65685 7.65694 7 6.00008 7C4.34323 7 3.00008 5.65685 3.00008 4C3.00008 2.34315 4.34323 1 6.00008 1C7.65694 1 9.00008 2.34315 9.00008 4Z"
            stroke={activeUser === "myProfile" ? "#0396C7" : "white"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "orderHistory",
      title: "Riwayat Pesanan",
      subtitle: "Lihat riwayat pesanan Anda",
      content: orderHistory(),
      svg: (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.6353 9.57145C13.4501 11.3114 12.4643 12.9419 10.8329 13.8837C8.12262 15.4485 4.65694 14.5199 3.09214 11.8096L2.92547 11.5209M2.36395 8.38099C2.54915 6.64106 3.53501 5.01057 5.16633 4.06873C7.87666 2.50392 11.3423 3.43255 12.9071 6.14287L13.0738 6.43155M2.32861 13.0202L2.81665 11.1988L4.63801 11.6869M11.3613 6.26556L13.1827 6.75359L13.6707 4.93222M7.99967 5.97621V8.97621L9.66633 9.97621"
            stroke={activeUser === "orderHistory" ? "#0396C7" : "white"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const handleMenuProfileClick = (userId: string) => {
    setActiveUser(userId);
    if (window.innerWidth <= 768) {
      window.scrollTo({
        top: 380,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      window.scrollTo({
        top: 380,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="md:pl-24 px-0 pt-32 md:pt-40">
        <div>
          <h2 className="font-poppins text-2xl md:text-3xl font-semibold leading-4 mb-4  md:px-0 px-6">Profil Saya</h2>
          <nav className="flex mb-4 font-poppins " aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a className="inline-flex items-center text-sm md:text-xl font-medium text-gray-500 hover:text-gray-700 md:w-auto w-10/12 md:px-0 px-6">Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun</a>
              </li>
            </ol>
          </nav>
          <div className="flex flex-col lg:flex-row gap-12 mt-7">
            <aside className="w-full lg:w-1/5 px-4 py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md min-w-[309px] max-w-none lg:max-w-[309px] h-min">
              <ul className="space-y-4 lg:space-y-10">
                {myProfiles.map(({ svg, title, subtitle, id }) => (
                  <li key={id} className={`${activeUser === id ? "bg-[#0396C7]" : "bg-[#D0E9FEB2]"} rounded-md flex px-3 py-2 items-center gap-3 cursor-pointer`} onClick={() => handleMenuProfileClick(id)}>
                    <div className={`${activeUser === id ? "bg-white" : "bg-[#0396C7]"} p-2 rounded-full`}>{svg}</div>
                    <div className="flex flex-col">
                      <h4 className={`${activeUser === id ? "text-white" : "text-[#0396C7]"} font-poppins font-medium text-sm`}>{title}</h4>
                      <p className={`${activeUser === id ? "text-white" : "text-[#0396C7]"} font-poppins font-normal text-[10px]`}>{subtitle}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
            {myProfiles.find((user) => user.id === activeUser)?.content}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function orderHistory() {
  return (
    <section className="w-full lg:flex-1 py-[15px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md max-w-none lg:max-w-[849px] mb-8">
      <HistoryOrderUser />
    </section>
  );
}
function myProfile(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const [formData, setformData] = useState<FormDataObject>({
    full_name: "",
    username: "",
    gender: "Pilih Jenis Kelamin",
    email: "",
    no_handphone: "",
    password: "",
    image: "",
  });

  const getProfile = async () => {
    const authToken = Cookies.get("authToken");
    try {
      const response = await axios.get("https://mern-storeidku.vercel.app/user", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = response.data;
      setformData({
        full_name: data.full_name,
        username: data.username,
        gender: data.gender,
        email: data.email,
        no_handphone: data.no_handphone,
        password: data.password,
        image: data.image,
      });
      if (data.image_profil) {
        setUploadedImageUrl(data.image_profil);
      }
    } catch (error) {
      infoAlertFC("Error", "Gagal mendapatkan data", "error");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    const full_name = formData.full_name;
    const username = formData.username;
    const gender = formData.gender;
    const email = formData.email;
    const no_handphone = formData.no_handphone;
    const password = formData.password;

    e.preventDefault();
    const authToken = Cookies.get("authToken");
    !uploadedImageUrl && "";
    try {
      const formData = new FormData();
      formData.append("full_name", full_name);
      formData.append("username", username);
      formData.append("gender", gender);
      formData.append("email", email);
      formData.append("no_handphone", no_handphone);
      formData.append("password", password);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.put("https://mern-storeidku.vercel.app/user", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedImageUrl(response.data.image);
      if (response.data) {
        Swal.fire({
          title: "Confirmation",
          text: "Akun Berhasil dirubah",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(3 150 199)",
        }).then((res) => {
          const update = response.data.username;
          const image = response.data.image;
          console.log(image);
          if (res.isConfirmed) {
            Cookies.remove("username");
            Cookies.remove("gambar");
          }
          Cookies.set("username", update);
          Cookies.set("gambar", image);
          navigate("/my-profile");
        });
      }
    } catch (error) {
      infoAlertFC("warning", "Terjadi kesalahan saat mengupdate data", "error");
    }
  };

  const handleHapus = async (e: any) => {
    e.preventDefault();
    const authToken = Cookies.get("authToken");
    Swal.fire({
      title: "Confirmation",
      text: "Anda yakin menghapus akun ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "NO",
      confirmButtonColor: "rgb(255 10 10)",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await axios
            .delete("https://mern-storeidku.vercel.app/user", {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            })
            .then(() => {
              infoAlertFC("Information", "Berhasil menghapus akun", "success");
              Cookies.remove("username");
              setTimeout(() => {
                navigate("/");
              }, 3000);
            });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Terjadi kesalahan saat menghapus akun",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "rgb(3 150 199)",
          });
        }
      }
    });
  };

  const handlePerubahan = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setformData({
      ...formData,
      [id]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <section className="w-full lg:flex-1 px-5 py-[15px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md max-w-none lg:max-w-[749px] mb-8">
      <h2 className="text-xl md:text-2xl font-semibold text-[#111827] mb-[12px] font-Poppins">Edit Profil</h2>
      <form onSubmit={handleSave}>
        <div className="container w-full h-[17vh] relative">
          <img src={bgUserCover} className="h-full w-full rounded-md" alt="bgCover" />

          <div className="  w-[4.5rem] h-[4.5rem] md:w-14 md:h-14 cursor-pointer rounded-full overflow-hidden absolute top-[2rem] ml-3 md:ml-5" onClick={() => document.getElementById("uploadInput")?.click()}>
            {selectedImage ? (
              <img className="w-[4.5rem] h-[4.5rem] rounded-full top-0" src={URL.createObjectURL(selectedImage)} alt="Selected" />
            ) : (
              <div>
                <img
                  className="w-[4.5rem] h-[4.5rem] rounded-full top-0"
                  src={
                    formData.image
                      ? formData.image
                      : `data:image/png;base64,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`
                  }
                  alt="Selected"
                />
              </div>
            )}
          </div>

          <div className="GantiCover" style={{ width: 40, height: 20, position: "absolute", top: 0, right: 0, padding: "5px", display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
            <label htmlFor="uploadInput" className="Cover" style={{ width: 70, height: 15, display: "flex", alignItems: "center" }}>
              <input type="file" id="uploadInput" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
            </label>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
            <div>
              <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-[#6B7280]">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="full_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Lengkap"
                value={formData.full_name}
                onChange={handlePerubahan}
                required
              />
            </div>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-[#6B7280]">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handlePerubahan}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="username"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="mb-6">
            <label htmlFor="gender" className="mb-2 text-sm font-medium text-[#6B7280] flex items-center gap-2">
              Jenis Kelamin
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 10.6667V8" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 5.33337H8.0075" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </label>
            <select id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.gender} onChange={handlePerubahan}>
              <option value="" disabled>
                Pilih Jenis Kelamin
              </option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#6B7280]">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="nama_pengguna@email.com"
              required
              value={formData.email}
              onChange={handlePerubahan}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
          <div>
            <label htmlFor="no_handphone" className="block mb-2 text-sm font-medium text-[#6B7280]">
              Nomor Handphone
            </label>
            <input
              type="text"
              id="no_handphone"
              value={formData.no_handphone}
              onChange={handlePerubahan}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="08123456789"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#6B7280]">
              Password
            </label>
            <input
              type="text"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="password"
              required
              onChange={handlePerubahan}
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-3">
            <button type="submit" className="text-white bg-[#0396C7] focus:ring-4 font-poppins font-medium rounded-lg text-base px-12 py-2 text-center">
              Simpan
            </button>

            <button onClick={handleHapus} className="text-white bg-[#fa5151] focus:ring-4 font-poppins font-medium rounded-lg text-base px-12 py-2 text-center">
              Hapus Akun
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default UserProfile;
