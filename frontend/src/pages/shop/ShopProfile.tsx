import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormDataShop, ShopProfile } from "../../utils/shop/type";
import CreateProduct from "../../pages/products/CreateProduct";
import ListProduct from "../../pages/products/ListProduct";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Product/Header";
import { infoAlertFC } from "../../utils/functions";
import HistoryOrderProducts from "../payment/HistoryOrderProducts";

const ProfileToko: React.FC = () => {
  const [activeShop, setActiveShop] = useState<string>("MyProfile");
  const renderActiveShopContent = (activeShop: string, shopProfiles: ShopProfile[]) => {
    const activeShopContent = shopProfiles.find((user: ShopProfile) => user.id === activeShop)?.content;

    return <div>{activeShopContent}</div>;
  };
  const shopProfiles: ShopProfile[] = [
    {
      id: "MyProfile",
      title: "Profil Toko Saya",
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

    {
      id: "ListProduct",
      title: "Produk Saya",
      subtitle: "Lihat Produk Saya",
      content: <ListProducts />,
      svg: (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.6353 9.57145C13.4501 11.3114 12.4643 12.9419 10.8329 13.8837C8.12262 15.4485 4.65694 14.5199 3.09214 11.8096L2.92547 11.5209M2.36395 8.38099C2.54915 6.64106 3.53501 5.01057 5.16633 4.06873C7.87666 2.50392 11.3423 3.43255 12.9071 6.14287L13.0738 6.43155M2.32861 13.0202L2.81665 11.1988L4.63801 11.6869M11.3613 6.26556L13.1827 6.75359L13.6707 4.93222M7.99967 5.97621V8.97621L9.66633 9.97621"
            stroke={activeShop === "ListProduct" ? "#0396C7" : "white"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "myProducts",
      title: "Produk Saya",
      subtitle: "Tambah Produk Baru",
      content: <MyProducts />,
      svg: (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.66683 8.47616H3.92147C4.37828 8.47616 4.79587 8.73424 5.00016 9.14282C5.20445 9.5514 5.62205 9.80949 6.07885 9.80949H9.92147C10.3783 9.80949 10.7959 9.5514 11.0002 9.14282C11.2045 8.73424 11.622 8.47616 12.0789 8.47616H14.3335M5.97787 3.14282H10.0225C10.7404 3.14282 11.0993 3.14282 11.4162 3.25213C11.6965 3.3488 11.9517 3.50655 12.1635 3.71399C12.403 3.94855 12.5636 4.26962 12.8846 4.91174L14.329 7.80049C14.455 8.05248 14.518 8.17847 14.5624 8.31052C14.6019 8.42779 14.6304 8.54847 14.6475 8.671C14.6668 8.80897 14.6668 8.94984 14.6668 9.23157V10.6095C14.6668 11.7296 14.6668 12.2896 14.4488 12.7175C14.2571 13.0938 13.9511 13.3998 13.5748 13.5915C13.147 13.8095 12.5869 13.8095 11.4668 13.8095H4.5335C3.41339 13.8095 2.85334 13.8095 2.42552 13.5915C2.04919 13.3998 1.74323 13.0938 1.55148 12.7175C1.3335 12.2896 1.3335 11.7296 1.3335 10.6095V9.23157C1.3335 8.94984 1.3335 8.80897 1.35281 8.671C1.36997 8.54847 1.39845 8.42779 1.43791 8.31052C1.48234 8.17848 1.54533 8.05248 1.67133 7.80049L3.1157 4.91174C3.43677 4.26962 3.5973 3.94855 3.83679 3.71399C4.04858 3.50655 4.30384 3.3488 4.58409 3.25213C4.901 3.14282 5.25996 3.14282 5.97787 3.14282Z"
            stroke={activeShop === "myProducts" ? "#0396C7" : "white"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "orderProducts",
      title: "History Order",
      subtitle: "History Order Products",
      content: <HistoryOrderProduct />,
      svg: (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.66683 8.47616H3.92147C4.37828 8.47616 4.79587 8.73424 5.00016 9.14282C5.20445 9.5514 5.62205 9.80949 6.07885 9.80949H9.92147C10.3783 9.80949 10.7959 9.5514 11.0002 9.14282C11.2045 8.73424 11.622 8.47616 12.0789 8.47616H14.3335M5.97787 3.14282H10.0225C10.7404 3.14282 11.0993 3.14282 11.4162 3.25213C11.6965 3.3488 11.9517 3.50655 12.1635 3.71399C12.403 3.94855 12.5636 4.26962 12.8846 4.91174L14.329 7.80049C14.455 8.05248 14.518 8.17847 14.5624 8.31052C14.6019 8.42779 14.6304 8.54847 14.6475 8.671C14.6668 8.80897 14.6668 8.94984 14.6668 9.23157V10.6095C14.6668 11.7296 14.6668 12.2896 14.4488 12.7175C14.2571 13.0938 13.9511 13.3998 13.5748 13.5915C13.147 13.8095 12.5869 13.8095 11.4668 13.8095H4.5335C3.41339 13.8095 2.85334 13.8095 2.42552 13.5915C2.04919 13.3998 1.74323 13.0938 1.55148 12.7175C1.3335 12.2896 1.3335 11.7296 1.3335 10.6095V9.23157C1.3335 8.94984 1.3335 8.80897 1.35281 8.671C1.36997 8.54847 1.39845 8.42779 1.43791 8.31052C1.48234 8.17848 1.54533 8.05248 1.67133 7.80049L3.1157 4.91174C3.43677 4.26962 3.5973 3.94855 3.83679 3.71399C4.04858 3.50655 4.30384 3.3488 4.58409 3.25213C4.901 3.14282 5.25996 3.14282 5.97787 3.14282Z"
            stroke={activeShop === "orderProducts" ? "#0396C7" : "white"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const handleShopProfileClick = (shopId: any) => {
    setActiveShop(shopId);
    if (window.innerWidth <= 768) {
      window.scrollTo({
        top: 473,
        behavior: "smooth", // Animasi guliran halus (opsional)
      });
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      window.scrollTo({
        top: 473,
        behavior: "smooth", // Animasi guliran halus (opsional)
      });
    }
  }, []);

  return (
    <div>
      <Header />
      <div>
        <div className="px-0 md:px-20 pt-32 md:pt-[28vh]">
          <h2 className="font-poppins md:text-3xl text-2xl font-semibold leading-4 mb-4 px-6 md:px-0">Profil Toko Saya</h2>
          <nav className="flex mb-4 font-poppins " aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a className="inline-flex items-center text-sm md:text-xl font-medium text-gray-500 hover:text-gray-700 px-6 md:px-0">Kelola informasi profil toko Anda</a>
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

const MyProducts: React.FC = () => {
  return <CreateProduct hidden={false} />;
};

const ListProducts: React.FC = () => {
  return (
    <section className="lg:w-[60vw] lg:flex-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md max-w-none  mb-8">
      <ListProduct />
    </section>
  );
};

const HistoryOrderProduct: React.FC = () => {
  return (
    <section className="lg:w-[60vw] lg:flex-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md max-w-none  mb-8">
      <HistoryOrderProducts />
    </section>
  );
};

const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataShop>({
    name: "",
    address: "",
  });

  const getToko = async () => {
    const authToken = Cookies.get("authToken");
    try {
      const response = await axios.get("https://mern-storeidku.vercel.app/store", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = response.data;
      setFormData({
        name: data.name,
        address: data.address,
      });
    } catch (error) {
      infoAlertFC("Error", "Gagal mendapatkan data", "error");
    }
  };

  useEffect(() => {
    getToko();
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    const name = formData.name;
    const address = formData.address;
    e.preventDefault();
    const authToken = Cookies.get("authToken");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);

      const response = await axios.put("https://mern-storeidku.vercel.app/store", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      Swal.fire({
        title: "Confirmation",
        text: `Berhasil Update Toko`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(3 150 199)",
      });
      const update = response.data.name;
      Cookies.remove("nama_toko");
      Cookies.set("nama_toko", update);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleHapus = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const authToken = Cookies.get("authToken");
    try {
      const response = await axios.delete("https://mern-storeidku.vercel.app/store", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response) {
        Swal.fire({
          title: "Confirmation",
          text: `Hapus Toko Berhasil`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(3 150 199)",
        });
        Cookies.remove("nama_toko");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePerubahan = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <section className="w-full lg:flex-1 px-5 py-[15px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-[100vh] rounded-md max-w-none lg:max-w-[749px] mb-8">
      <h2 className="text-xl md:text-2xl font-semibold text-[#111827] mb-[12px] font-Poppins">Edit Toko</h2>
      <form onSubmit={handleSave}>
        <div className="container w-full h-[17vh] md:h-[30vh] relative">
          <img src={`https://png.pngtree.com/thumb_back/fw800/background/20231003/pngtree-e-commerce-and-digital-marketing-store-on-laptop-screen-and-mobile-image_13524633.png`} className="h-full rounded-md w-full" alt="bgCover" />
          <div className="GantiCover" style={{ width: 40, height: 20, position: "absolute", top: 0, right: 0, padding: "5px", display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
            <label htmlFor="uploadInput" className="Cover" style={{ width: 70, height: 15, display: "flex", alignItems: "center" }}>
              <input type="file" id="uploadInput" accept="image/*" style={{ display: "none" }} />
            </label>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
            <div>
              <label htmlFor="nama_toko" className="block mb-2 text-sm font-medium text-[#6B7280]">
                Nama Toko
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nama Toko"
                value={formData.name}
                onChange={handlePerubahan}
                required
              />
            </div>
            <div>
              <label htmlFor="alamat_toko" className="block mb-2 text-sm font-medium text-[#6B7280]">
                Alamat Toko<span className="text-[#F43F5E]">*</span>
              </label>
              <textarea
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Alamat Toko"
                required
                value={formData.address}
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

            <button onClick={handleHapus} className="text-white bg-[#fa5151] focus:ring-4 font-poppins font-medium rounded-lg text-base px-12 py-2 text-center">
              Hapus Akun
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ProfileToko;
