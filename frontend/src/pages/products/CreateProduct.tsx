import bgUserCover from "../../img/Rectangle 2775.png";
import { useState } from "react";
import axios from "axios";
import { FormDataProduct, MyProfile } from "../../utils/products/type";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import HistoryOrderUser from "../payment/HistoryOrderUser";
import Header from "../../components/Product/Header";
import Footer from "../../components/Footer";
import { infoAlertFC } from "../../utils/functions";

function UserProfile(props: any) {
  const [activeUser, setActiveUser] = useState<string>("myProfile");
  const { hidden } = props;

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
  };

  return (
    <div>
      {!hidden ? "" : <Header />}
      <div>
        <div>
          <div className="flex flex-col lg:flex-row gap-12 ">
            {!hidden ? (
              ""
            ) : (
              <aside className="w-full lg:w-1/5 px-4 py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md min-w-[309px] max-w-none lg:max-w-[309px] h-min">
                <ul className="space-y-4 lg:space-y-10">
                  {myProfiles.map(({ svg, subtitle, id }) => (
                    <li key={id} className={`${activeUser === id ? "bg-[#0396C7]" : "bg-[#D0E9FEB2]"} rounded-md flex px-3 py-2 items-center gap-3 cursor-pointer`} onClick={() => handleMenuProfileClick(id)}>
                      <div className={`${activeUser === id ? "bg-white" : "bg-[#0396C7]"} p-2 rounded-full`}>{svg}</div>
                      <div className="flex flex-col">
                        <p className={`${activeUser === id ? "text-white" : "text-[#0396C7]"} font-poppins font-normal text-[10px]`}>{subtitle}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {myProfiles.find((user) => user.id === activeUser)?.content}
          </div>
        </div>
      </div>
      {!hidden ? "" : <Footer />}
    </div>
  );
}

function orderHistory() {
  return (
    <section className="w-full lg:flex-1 px-[8px] py-[15px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md max-w-none lg:max-w-[749px] mb-8">
      <HistoryOrderUser />
    </section>
  );
}
function myProfile(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [formData, setformData] = useState<FormDataProduct>({
    brand: "",
    price: "",
    categories: "",
    description: "",
    stock: "",
    storage: "",
    ram: "",
    type: "",
    processor: "",
  });

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    const brand = formData.brand;
    const price = formData.price;
    const categories = formData.categories;
    const description = formData.description;
    const stock = formData.stock;
    const storage = formData.storage;
    const ram = formData.ram;
    const type = formData.type;
    const processor = formData.processor;

    e.preventDefault();
    const authToken = Cookies.get("authToken");
    !uploadedImageUrl && "";
    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append("image", selectedImage);
        formData.append("brand", brand);
        formData.append("type", type);
        formData.append("categories", categories);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("storage", storage);
        formData.append("ram", ram);
        formData.append("processor", processor);
        formData.append("stock", stock);
      }

      const response = await axios.post("https://mern-storeidku.vercel.app/product", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedImageUrl(response.data.image_url);
      if (response.data) {
        Swal.fire({
          title: "Confirmation",
          text: "Data Berhasil disimpan",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(3 150 199)",
        }).then(() => {
          setformData({
            brand: "",
            price: "",
            categories: "",
            description: "",
            stock: "",
            storage: "",
            ram: "",
            type: "",
            processor: "",
          });
        });
      }
    } catch (error) {
      infoAlertFC("warning", "Error Anda Harus Masukan Gambar dulu", "error");
    }
  };

  const handlePerubahan = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    <section className="w-full lg:flex-1 px-5 md:px-[38px] py-[15px] h-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md max-w-none lg:max-w-[749px] mb-8">
      <h2 className="text-xl md:text-2xl font-semibold text-[#111827] mb-[12px] font-Poppins">Tambah Produk</h2>
      <form onSubmit={handleSave}>
        <div className="container w-full h-[17vh] relative">
          <img src={bgUserCover} className="h-full w-full rounded-md" alt="bgCover" />

          <div className="bg-blue-300 cursor-pointer p-1 w-14 h-14 rounded-full overflow-hidden absolute top-[2rem] ml-3" onClick={() => document.getElementById("uploadInput")?.click()}>
            {selectedImage ? (
              <div>
                <img className="w-[50px] h-[50px]  top-5" src={URL.createObjectURL(selectedImage)} alt="Selected" />
              </div>
            ) : (
              <div>
                <img className="w-[50px] h-[50px]  top-5" src={`https://totalcomp.com/images/no-image.jpeg`} alt="Not Selected" />
              </div>
            )}
          </div>
          <div className="Camera top-20 ml-10" style={{ width: "50%", height: "50%", position: "absolute", cursor: "pointer" }}>
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
          <div className="GantiCover" style={{ width: 40, height: 20, position: "absolute", top: 0, right: 0, padding: "5px", display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
            <label htmlFor="uploadInput" className="Cover" style={{ width: 70, height: 15, display: "flex", alignItems: "center" }}>
              <input type="file" id="uploadInput" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
            </label>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
            <div>
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-[#6B7280]">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.brand}
                onChange={handlePerubahan}
                placeholder="brand"
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="block mb-2 text-sm font-medium text-[#6B7280]">
                Model
              </label>
              <input
                type="text"
                id="type"
                value={formData.type}
                onChange={handlePerubahan}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Model"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="mb-6">
            <label htmlFor="categories" className="mb-2 text-sm font-medium text-[#6B7280] flex items-center gap-2">
              Categories
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 10.6667V8" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 5.33337H8.0075" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </label>
            <select id="categories" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.categories} onChange={handlePerubahan}>
              <option value="Pilih Jenis Kelamin">Pilih Kategori</option>
              <option value="Low End">Low End</option>
              <option value="Mid Range">Mid Range</option>
              <option value="High End">High End</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-[#6B7280]">
              price
            </label>
            <input
              type="number"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Harga"
              required
              value={formData.price}
              onChange={handlePerubahan}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-[#6B7280]">
              description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handlePerubahan}
              className="bg-gray-50 h-[20vh] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="deskripsi"
              required
            />
          </div>
          <div>
            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-[#6B7280]">
              stock
            </label>
            <input
              type="number"
              id="stock"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="stok"
              required
              value={formData.stock}
              onChange={handlePerubahan}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
          <div>
            <label htmlFor="ram" className="block mb-2 text-sm font-medium text-[#6B7280]">
              ram
            </label>
            <input
              type="text"
              id="ram"
              value={formData.ram}
              onChange={handlePerubahan}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="ram"
              required
            />
          </div>
          <div>
            <label htmlFor="storage" className="block mb-2 text-sm font-medium text-[#6B7280]">
              storage
            </label>
            <input
              type="text"
              id="storage"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="storage"
              required
              value={formData.storage}
              onChange={handlePerubahan}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
          <div>
            <label htmlFor="processor" className="block mb-2 text-sm font-medium text-[#6B7280]">
              processor
            </label>
            <input
              type="text"
              id="processor"
              value={formData.processor}
              onChange={handlePerubahan}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Processor"
              required
            />
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
}

export default UserProfile;
