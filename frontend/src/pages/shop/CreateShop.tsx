import bgUserCover from "../../img/Rectangle 2775.png";
import React, { useState } from "react";
import axios from "axios";
import { ShopProfile } from "../../utils/shop/type";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Product/Header";
import { infoAlertFC } from "../../utils/functions";

const CreateShop: React.FC = () => {
  const [activeShop, setActiveShop] = useState<string>("MyProfile");
  const renderActiveShopContent = (activeShop: string, shopProfiles: ShopProfile[]) => {
    const activeShopContent = shopProfiles.find((user: ShopProfile) => user.id === activeShop)?.content;

    return <div>{activeShopContent}</div>;
  };
  const shopProfiles: ShopProfile[] = [
    {
      id: "MyProfile",
      title: "Tambah Toko",
      subtitle: "Ubah foto profil, nama toko, dll",
      content: <MyProfile />,
      svg: (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 14.4762V10.8762C10 10.5028 10 10.3161 9.92734 10.1735C9.86342 10.0481 9.76144 9.94611 9.63599 9.88219C9.49339 9.80953 9.3067 9.80953 8.93333 9.80953H7.06667C6.6933 9.80953 6.50661 9.80953 6.36401 9.88219C6.23857 9.94611 6.13658 10.0481 6.07266 10.1735C6 10.3161 6 10.5028 6 10.8762V14.4762M2 5.14286C2 6.24743 2.89543 7.14286 4 7.14286C5.10457 7.14286 6 6.24743 6 5.14286C6 6.24743 6.89543 7.14286 8 7.14286C9.10457 7.14286 10 6.24743 10 5.14286C10 6.24743 10.8954 7.14286 12 7.14286C13.1046 7.14286 14 6.24743 14 5.14286M4.13333 14.4762H11.8667C12.6134 14.4762 12.9868 14.4762 13.272 14.3309C13.5229 14.203 13.7268 13.9991 13.8547 13.7482C14 13.463 14 13.0896 14 12.3429V4.60953C14 3.86279 14 3.48942 13.8547 3.20421C13.7268 2.95333 13.5229 2.74935 13.272 2.62152C12.9868 2.4762 12.6134 2.4762 11.8667 2.4762H4.13333C3.3866 2.4762 3.01323 2.4762 2.72801 2.62152C2.47713 2.74935 2.27316 2.95333 2.14532 3.20421C2 3.48942 2 3.86279 2 4.60953V12.3429C2 13.0896 2 13.463 2.14532 13.7482C2.27316 13.9991 2.47713 14.203 2.72801 14.3309C3.01323 14.4762 3.3866 14.4762 4.13333 14.4762Z"
            stroke={activeShop === "MyProfile" ? "#0396C7" : "white"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const handleShopProfileClick = (shopId: string) => {
    setActiveShop(shopId);
  };

  return (
    <div>
      <Header />
      <div>
        <div className="md:px-24 px-8 pt-40">
          <h2 className="font-poppins md:text-3xl text-2xl font-semibold leading-4 mb-4">Profil Saya</h2>
          <nav className="flex mb-4 font-poppins " aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a className="inline-flex items-center md:text-xl text-sm font-medium text-gray-500 hover:text-gray-700">Kelola informasi profil toko Anda</a>
              </li>
            </ol>
          </nav>
          <div className="flex flex-col lg:flex-row gap-12 mt-7">
            <aside className="w-full lg:w-1/5 px-4 py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md min-w-[309px] max-w-none lg:max-w-[309px] h-min">
              <ul className="space-y-4 lg:space-y-10">
                {shopProfiles.map(({ svg, title, subtitle, id }) => (
                  <li key={id} className={`${activeShop === id ? "bg-[#0396C7]" : "bg-[#D0E9FEB2]"} rounded-md flex px-3 py-2 items-center gap-3 cursor-pointer`} onClick={() => handleShopProfileClick(id)}>
                    <div className={`${activeShop === id ? "bg-white" : "bg-[#0396C7]"} p-2 rounded-full`}>{svg}</div>
                    <div className="flex flex-col">
                      <h4 className={`${activeShop === id ? "text-white" : "text-[#0396C7]"} font-poppins font-medium text-sm`}>{title}</h4>
                      <p className={`${activeShop === id ? "text-white" : "text-[#0396C7]"} font-poppins font-normal text-[10px]`}>{subtitle}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
            {renderActiveShopContent(activeShop, shopProfiles)}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_toko: "",
    alamat_toko: "",
  });

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authToken = Cookies.get("authToken");
    try {
      const response = await axios.post(
        "https://mern-storeidku.vercel.app/store",
        { name: formData.nama_toko, address: formData.alamat_toko },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response) {
        Swal.fire({
          title: "Confirmation",
          text: `Toko sudah di Set`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(3 150 199)",
        });
      }
      navigate("/my-profile");
    } catch (error) {
      infoAlertFC("Warning", "Gagal untuk mendapatkan data", "warning");
    }
  };

  const handlePerubahan = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <section className="w-full lg:flex-1 px-[38px] py-[15px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md max-w-none lg:max-w-[749px] mb-8">
      <h2 className="font-poppins text-2xl font-semibold text-[#111827] mb-[12px]">Buat Toko</h2>
      <form onSubmit={handleSave}>
        <div className="container w-full h-[17vh] relative">
          <img src={bgUserCover} className="h-full w-full" alt="bgCover" />
          <div className="GantiCover" style={{ width: 40, height: 20, position: "absolute", top: 0, right: 0, padding: "5px", display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
            <label htmlFor="uploadInput" className="Cover" style={{ width: 70, height: 15, display: "flex", alignItems: "center" }}>
              <input type="file" id="uploadInput" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
              <div className="Camera" style={{ width: "50%", height: "50%", position: "relative", cursor: "pointer" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" role="img">
                  <path
                    d="M3.58579 7.58579C3.21071 7.96086 3 8.46957 3 9V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H19C19.5304 20 20.0391 19.7893 20.4142 19.4142C20.7893 19.0391 21 18.5304 21 18V9C21 8.46957 20.7893 7.96086 20.4142 7.58579C20.0391 7.21071 19.5304 7 19 7H18.07C17.7408 7.00005 17.4167 6.91884 17.1264 6.76359C16.8362 6.60834 16.5887 6.38383 16.406 6.11L15.594 4.89C15.4113 4.61617 15.1638 4.39166 14.8736 4.23641C14.5833 4.08116 14.2592 3.99995 13.93 4H10.07C9.74082 3.99995 9.41671 4.08116 9.12643 4.23641C8.83616 4.39166 8.5887 4.61617 8.406 4.89L7.594 6.11C7.4113 6.38383 7.16384 6.60834 6.87357 6.76359C6.58329 6.91884 6.25918 7.00005 5.93 7H5C4.46957 7 3.96086 7.21071 3.58579 7.58579Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.1213 15.1213C14.6839 14.5587 15 13.7956 15 13C15 12.2044 14.6839 11.4413 14.1213 10.8787C13.5587 10.3161 12.7956 10 12 10C11.2044 10 10.4413 10.3161 9.87868 10.8787C9.31607 11.4413 9 12.2044 9 13C9 13.7956 9.31607 14.5587 9.87868 15.1213C10.4413 15.6839 11.2044 16 12 16C12.7956 16 13.5587 15.6839 14.1213 15.1213Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
            <div>
              <label htmlFor="nama_toko" className="block mb-2 text-sm font-medium text-[#6B7280]">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="nama_toko"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Lengkap"
                value={formData.nama_toko}
                onChange={handlePerubahan}
                required
              />
            </div>
            <div>
              <label htmlFor="alamat_toko" className="block mb-2 text-sm font-medium text-[#6B7280]">
                Alamat Toko<span className="text-[#F43F5E]">*</span>
              </label>
              <textarea
                id="alamat_toko"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Alamat Toko"
                required
                value={formData.alamat_toko}
                onChange={handlePerubahan}
              ></textarea>
              <div className="font-poppins text-sm font-normal text-[#6B7280] mt-2">
                <p>Informasikan lokasi toko Anda, seperti Nama Jalan/Gedung, Nomor Rumah, dll</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-3">
            <button type="submit" className="text-white bg-[#0396C7] focus:ring-4 font-poppins font-medium rounded-lg text-base px-12 py-2 text-center">
              Simpan
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreateShop;
