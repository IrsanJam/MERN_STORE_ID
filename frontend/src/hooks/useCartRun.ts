import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCart, deleteCart, getCart, updateCart } from "../api/cart";
import Swal from "sweetalert2";
import { useRedirect } from "./useNavigate";

const useCartRun = () => {
  const redirect = useRedirect();
  const queryClient = useQueryClient();

  // ✅ Ambil data terbaru setiap kali ada perubahan
  const {
    data: cartData,
    isLoading,
    error,
    refetch, // Tambahkan refetch agar bisa dipanggil secara manual
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 0, // Pastikan tidak mengambil dari cache lama
  });

  const addCartHandle = useMutation({
    mutationFn: ({ id, product }: { id: string; product: any }) => createCart(id, product),
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil",
        text: "Barang ditambahkan ke keranjang",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(3 150 199)",
      }).then((res) => {
        if (res.isConfirmed) {
          redirect("/cart");
        }
      });

      // ✅ Pastikan query cart diperbarui dengan data terbaru
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const editCartHandle = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: any }) => updateCart(id, quantity),
    onSuccess: () => {
      // ✅ Pastikan query cart diperbarui dengan data terbaru
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const deleteCartHandle = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      // ✅ Pastikan query cart diperbarui dengan data terbaru
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { cartData, deleteCartHandle, isLoading, addCartHandle, error, editCartHandle, refetch };
};

export default useCartRun;
