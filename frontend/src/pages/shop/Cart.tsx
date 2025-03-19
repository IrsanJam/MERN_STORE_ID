import { useEffect, useState } from "react";
import axios from "axios";
import { CartType, CartState } from "../../utils/shop/type";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../../components/Product/Header";
import Footer from "../../components/Footer";
import { infoAlertFC } from "../../utils/functions";
import { useRef } from "react";
import Swal from "sweetalert2";
import useCartRun from "../../hooks/useCartRun";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Cart() {
  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");
  const [cartItems, setCartItems] = useState<CartType[]>([]);
  const [finalOrder, setFinalOrder] = useState<CartState>({
    items: [],
    total: 0,
  });
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const toCart: any = useRef();
  const [quantitySpace, setQuantity] = useState(false);
  const { cartData, editCartHandle, isLoading, deleteCartHandle } =
    useCartRun();

  const clickProduct = async () => {
    if (!quantitySpace) {
      try {
        const response = await axios.post(
          "https://mern-storeidku.vercel.app/orders",
          { id: 1 },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response) {
          navigate(`/payment/`, {
            state: {
              finalOrder: finalOrder,
              total: `${finalOrder.total}`,
            },
          });
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          infoAlertFC("Error", "Error Autorisasi", "error");
        } else {
          infoAlertFC("Error", "Gagal Terkoneksi", "error");
        }
      }
    }
  };

  const editCartItem = async (productId: string, jumlah: number) => {
    try {
      editCartHandle.mutate({ id: productId, quantity: jumlah });
    } catch (error: any) {
      if (error.response.status === 400) {
        getCartItem();
        setQuantity(true);
        Swal.fire({
          title: "Konfirmasi",
          text: `${error.response.data.message}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "No",
          confirmButtonColor: "rgb(255 15 19)",
        });
      }
      console.error("Error editing item:", error);
      throw error;
    }
  };

  const incrementQuantity = async (itemId: string) => {
    if (!quantitySpace) {
      const product = cartItems.find((item) => item._id === itemId);
      const newquantity = product ? product.quantity + 1 : 1;
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId
            ? {
                ...item,
                quantity: newquantity,
                totalPrice: newquantity * item.price,
              }
            : item
        )
      );

      try {
        await editCartItem(itemId, newquantity);
      } catch (error) {
        console.error("Error incrementing quantity:", error);
      }
    }
  };

  const decrementQuantity = async (itemId: string) => {
    setQuantity(false);
    const product = cartItems.find((item) => item._id === itemId);
    const newquantity = product ? Math.max(product.quantity - 1, 1) : 1;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId
          ? {
              ...item,
              quantity: newquantity,
              totalPrice: newquantity * item.price,
            }
          : item
      )
    );

    try {
      await editCartItem(itemId, newquantity);
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };

  const handleFinalOrder = (itemId: string) => {
    const product = cartItems.find((item) => item._id === itemId);
    if (product) {
      setFinalOrder((prevOrder) => {
        const productTotalPrice = product.totalPrice;
        return {
          items: [...prevOrder.items, product],
          total: prevOrder.total + productTotalPrice,
        };
      });
    } else {
      console.error("Product not found in cart");
    }
  };

  const deleteCartItem = (productId: string) => {
    try {
      deleteCartHandle.mutate(productId);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== productId)
      );
      if (checkedItems.has(productId)) {
        removeFromFinalOrder(productId);
      }
      
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const removeFromFinalOrder = (itemId: string) => {
    setFinalOrder((prevOrder) => {
      const updatedItems = prevOrder.items.filter(
        (item) => item._id !== itemId
      );
      const updatedTotal = updatedItems.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );

      return {
        items: updatedItems,
        total: updatedTotal,
      };
    });
  };

  const toggleCheckbox = (itemId: string) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = new Set(prevCheckedItems);
      if (newCheckedItems.has(itemId)) {
        newCheckedItems.delete(itemId);
        removeFromFinalOrder(itemId);
      } else {
        newCheckedItems.add(itemId);
        handleFinalOrder(itemId);
      }
      return newCheckedItems;
    });
  };

  function formatToIDR(price: number) {
    const formattedPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
    return formattedPrice.replace(/^Rp\s?/, "");
  }

  const getCartItem = () => {
    try {
      cartData.forEach((item: any) => {
        if (item.quantity === 0) {
          item.quantity = 1;
        }
      });
      setCartItems(cartData);
    } catch (error) {
      console.error("Error fetching shopping cart:", error);
    }
  };

  useEffect(() => {
    const newItemIds = new Set(cartItems.map((item) => item._id));
    setCheckedItems(newItemIds);
    setFinalOrder({
      items: [...cartItems],
      total: cartItems.reduce((acc, item) => acc + item.totalPrice, 0),
    });
  }, [cartItems]);

  useEffect(() => {
    toCart.current.scrollIntoView({ behavior: "smooth" });
    getCartItem();
  }, []);

  return (
    <div>
      <Header />
      <div ref={toCart} className="px-3 md:px-24 pt-7">
        <nav className="flex mb-4 font-poppins " aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-xl font-medium text-gray-500 hover:text-gray-700"
              >
                Beranda
              </a>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.16305 3.08675L14.4131 9.33675C14.5005 9.42385 14.5698 9.52734 14.6171 9.6413C14.6644 9.75525 14.6888 9.87743 14.6888 10.0008C14.6888 10.1242 14.6644 10.2464 14.6171 10.3603C14.5698 10.4743 14.5005 10.5778 14.4131 10.6649L8.16305 16.9149C7.98693 17.091 7.74806 17.1899 7.49899 17.1899C7.24992 17.1899 7.01105 17.091 6.83493 16.9149C6.65881 16.7388 6.55986 16.4999 6.55986 16.2508C6.55986 16.0017 6.65881 15.7629 6.83493 15.5868L12.4216 10L6.83415 4.41332C6.65803 4.2372 6.55908 3.99833 6.55908 3.74926C6.55908 3.50018 6.65803 3.26131 6.83415 3.08519C7.01027 2.90907 7.24914 2.81013 7.49821 2.81013C7.74728 2.81013 7.98615 2.90907 8.16227 3.08519L8.16305 3.08675Z"
                    fill="#828282"
                  />
                </svg>
                <span className="ml-1 text-xl font-medium text-gray-700 md:ml-2">
                  Keranjang
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <section className="py-[5rem] w-full mx-auto lg:flex-1 px-3 md:px-[38px]  rounded-md max-w-none lg:max-w-[1404px] mb-10 ">
        {isLoading ? (
          <div className="px-3 md:px-24 pt-7">
            <Skeleton height={30} width={200} className="mb-4" />
            <section className="py-20 w-full mx-auto lg:flex-1 px-3 md:px-10 rounded-md max-w-none lg:max-w-[1404px]">
              <div className="text-center">
                <Skeleton height={40} width={250} />
              </div>
              <div className="flex gap-7 w-full mt-10 flex-wrap lg:flex-nowrap">
                <div className="md:w-full w-[100vw] min-w-0 xl:min-w-[715px] space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="grid h-[188px] md:px-6 md:py-5 px-2 py-2 bg-white rounded-2xl shadow-md items-center"
                    >
                      <Skeleton
                        width={124}
                        height={124}
                        className="rounded-lg"
                      />
                      <div className="ml-4 flex-1">
                        <Skeleton height={20} width={150} className="mb-2" />
                        <Skeleton height={24} width={200} className="mb-2" />
                        <Skeleton height={16} width={100} />
                      </div>
                      <div className="ml-auto">
                        <Skeleton height={30} width={80} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : (
          <>
            {cartItems.length > 0 ? (
              <>
                <div className="flex-col justify-start items-center gap-[30px] flex md:pt-10 ">
                  <div className="text-center text-zinc-700 text-3xl lg:text-[46px] font-semibold font-poppins">
                    Keranjang Kamu
                  </div>
                </div>
                <div className="flex gap-7 w-full mt-10 flex-wrap lg:flex-nowrap">
                  <div className="md:w-full w-[100vw] min-w-0 xl:min-w-[715px] space-y-6">
                    {cartItems.map(
                      (
                        {
                          _id,
                          totalPrice,
                          quantity,
                          type,
                          price,
                          brand,
                          image,
                        },
                        i
                      ) => (
                        <div
                          key={i}
                          className="md:w-full w-full  grid h-[188px] md:px-6 md:py-5 px-2 py-2 bg-white rounded-[20px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex-col justify-start items-start gap-6 lg:inline-flex "
                        >
                          <div className="self-stretch  justify-start items-center gap-4 inline-flex">
                            <div className="grow shrink basis-0 h-[124px] justify-between items-center flex">
                              <div className="md:w-[124px] md:h-[124px] border-2 border-slate-300 overflow-hidden bg-zinc-100 rounded-lg justify-center items-center flex">
                                <img className="md:w-full h-full" src={image} />
                              </div>
                              <div className="h-[118px]  flex-col justify-between items-start inline-flex">
                                <div className="flex-col w-[40vw] md:ml-0 ml-5 md:w-[20vw] justify-start items-start gap-0.5 flex">
                                  <div className="text-zinc-800 text-sm font-medium font-poppins truncate w-52">
                                    {brand}
                                  </div>
                                  <div className="text-zinc-800 text-xl font-semibold font-poppins">
                                    {type}
                                  </div>
                                  <div className="flex-col justify-start items-start gap-1 flex">
                                    <div>
                                      <span className="text-black text-sm font-normal font-poppins">
                                        Satuan :{" "}
                                      </span>
                                      <span className="text-black text-opacity-60 text-xs font-normal font-poppins">
                                        Rp {formatToIDR(price)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-orange-400 text-md md:text-2xl font-semibold md:ml-0 ml-5 font-poppins">
                                  Rp {formatToIDR(totalPrice)}
                                </div>
                              </div>

                              <div className="md:w-[225px] w-full gap-5 md:h-[124px] flex-col justify-between items-end  inline-flex">
                                <div className="h-6 justify-start items-start gap-4 inline-flex">
                                  <svg
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => deleteCartItem(_id)}
                                    className="cursor-pointer"
                                  >
                                    <path
                                      d="M20.25 5H16.5V4.25C16.5 3.65326 16.2629 3.08097 15.841 2.65901C15.419 2.23705 14.8467 2 14.25 2H9.75C9.15326 2 8.58097 2.23705 8.15901 2.65901C7.73705 3.08097 7.5 3.65326 7.5 4.25V5H3.75C3.55109 5 3.36032 5.07902 3.21967 5.21967C3.07902 5.36032 3 5.55109 3 5.75C3 5.94891 3.07902 6.13968 3.21967 6.28033C3.36032 6.42098 3.55109 6.5 3.75 6.5H4.5V20C4.5 20.3978 4.65804 20.7794 4.93934 21.0607C5.22064 21.342 5.60218 21.5 6 21.5H18C18.3978 21.5 18.7794 21.342 19.0607 21.0607C19.342 20.7794 19.5 20.3978 19.5 20V6.5H20.25C20.4489 6.5 20.6397 6.42098 20.7803 6.28033C20.921 6.13968 21 5.94891 21 5.75C21 5.55109 20.921 5.36032 20.7803 5.21967C20.6397 5.07902 20.4489 5 20.25 5ZM10.5 16.25C10.5 16.4489 10.421 16.6397 10.2803 16.7803C10.1397 16.921 9.94891 17 9.75 17C9.55109 17 9.36032 16.921 9.21967 16.7803C9.07902 16.6397 9 16.4489 9 16.25V10.25C9 10.0511 9.07902 9.86032 9.21967 9.71967C9.36032 9.57902 9.55109 9.5 9.75 9.5C9.94891 9.5 10.1397 9.57902 10.2803 9.71967C10.421 9.86032 10.5 10.0511 10.5 10.25V16.25ZM15 16.25C15 16.4489 14.921 16.6397 14.7803 16.7803C14.6397 16.921 14.4489 17 14.25 17C14.0511 17 13.8603 16.921 13.7197 16.7803C13.579 16.6397 13.5 16.4489 13.5 16.25V10.25C13.5 10.0511 13.579 9.86032 13.7197 9.71967C13.8603 9.57902 14.0511 9.5 14.25 9.5C14.4489 9.5 14.6397 9.57902 14.7803 9.71967C14.921 9.86032 15 10.0511 15 10.25V16.25ZM15 5H9V4.25C9 4.05109 9.07902 3.86032 9.21967 3.71967C9.36032 3.57902 9.55109 3.5 9.75 3.5H14.25C14.4489 3.5 14.6397 3.57902 14.7803 3.71967C14.921 3.86032 15 4.05109 15 4.25V5Z"
                                      fill="#FF3333"
                                    />
                                  </svg>
                                  <svg
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill={
                                      checkedItems.has(_id) ? "#0396C7" : "none"
                                    }
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => toggleCheckbox(_id)}
                                    className="cursor-pointer border-2"
                                  >
                                    <path d="M19 3.5C19.5304 3.5 20.0391 3.71071 20.4142 4.08579C20.7893 4.46086 21 4.96957 21 5.5V19.5C21 20.0304 20.7893 20.5391 20.4142 20.9142C20.0391 21.2893 19.5304 21.5 19 21.5H5C4.46957 21.5 3.96086 21.2893 3.58579 20.9142C3.21071 20.5391 3 20.0304 3 19.5V5.5C3 4.96957 3.21071 4.46086 3.58579 4.08579C3.96086 3.71071 4.46957 3.5 5 3.5H19ZM16.7 9.85C16.92 9.64 16.92 9.29 16.7 9.08L15.42 7.8C15.3703 7.7479 15.3106 7.70643 15.2444 7.6781C15.1782 7.64976 15.107 7.63515 15.035 7.63515C14.963 7.63515 14.8918 7.64976 14.8256 7.6781C14.7594 7.70643 14.6997 7.7479 14.65 7.8L13.65 8.8L15.7 10.85L16.7 9.85ZM7 15.44V17.5H9.06L15.12 11.44L13.06 9.38L7 15.44Z" />
                                  </svg>
                                </div>
                                <div className="lg:px-5 px-2 py-1 lg:py-3 bg-zinc-100 rounded-lg justify-center items-center gap-2 inline-flex">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => decrementQuantity(_id)}
                                    className="cursor-pointer"
                                  >
                                    <path
                                      d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                                      fill="black"
                                    />
                                  </svg>
                                  <div className="text-black text-sm font-medium font-poppins">
                                    {quantity}
                                  </div>
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => incrementQuantity(_id)}
                                    className="cursor-pointer"
                                  >
                                    <path
                                      d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                                      fill="black"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch h-[0px] border border-black border-opacity-10"></div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="w-full min-w-0 xl:min-w-[505px] px-6 py-5 bg-white rounded-[20px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex-col justify-start items-start gap-6 inline-flex h-min">
                    <div className="text-black text-md md:text-2xl font-semibold font-poppins">
                      Ringkasan Pesanan
                    </div>
                    <div className="self-stretch  flex-col justify-start items-start gap-5 flex">
                      {finalOrder.items.map(
                        ({ _id, totalPrice, type, brand, quantity }) => (
                          <div
                            key={_id}
                            className="self-stretch justify-between items-center inline-flex"
                          >
                            <div className="text-black text-opacity-60 text-sm md:text-xl font-normal font-poppins">
                              {brand} {type}
                            </div>
                            <div className="text-black text-opacity-60 text-sm md:text-xl font-normal font-poppins">
                              x{quantity}
                            </div>
                            <div className="text-right text-zinc-800 md:text-xl font-semibold font-poppins text-sm">
                              Rp {formatToIDR(totalPrice)}
                            </div>
                          </div>
                        )
                      )}
                      <div className="self-stretch" />
                      <div className="self-stretch h-[0px] border border-black border-opacity-10"></div>
                      <div className="self-stretch justify-between items-center inline-flex">
                        <div className="text-black md:text-xl text-md font-normal font-poppins">
                          Total
                        </div>
                        <div className="text-right text-zinc-800 text-lg md:text-2xl font-semibold font-poppins">
                          Rp {formatToIDR(finalOrder.total)}
                        </div>
                      </div>
                    </div>

                    {finalOrder.total !== 0 && (
                      <div
                        onClick={clickProduct}
                        className="cursor-pointer self-stretch h-[60px] md:px-[54px] px-3 text-center bg-sky-600 rounded-lg justify-center items-center gap-3 inline-flex"
                      >
                        <div className="text-white text-sm md:text-base font-medium font-poppins">
                          Lanjut Ke Pembayaran
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-col md:justify-center justify-start items-center gap-[30px] pt-20 flex h-[50vh] md:h-[50vh]">
                <div className="text-center text-zinc-700 md:text-[46px] font-semibold font-poppins text-2xl">
                  Keranjang Kamu Kosong
                </div>
                <span className="text-9xl mt-3">😢</span>
              </div>
            )}
          </>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Cart;
