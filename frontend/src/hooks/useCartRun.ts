import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCart, deleteCart, getCart, updateCart } from "../api/cart";
import Swal from "sweetalert2";
import { useRedirect } from "./useNavigate";

const useCartRun = () => {
  const redirect = useRedirect();
  const queryCLient = useQueryClient();

  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60 * 5,
  });

  const addCartHandle = useMutation({
    mutationFn: ({ id,product }: { id:string,product: any }) => createCart(id, product),
    onSuccess: (newData) => {
      Swal.fire({
        title: "Berhasil",
        text: `Barang ditambahkan ke keranjang`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(3 150 199)",
      }).then((res) => {
        if (res.isConfirmed) {
          redirect("/cart");
        }
      });
      queryCLient.setQueryData(["cart"], (oldCart:any[]) => {
        return oldCart ? [...oldCart, newData] : [newData]
      })

    },
  
  });

  const editCartHandle  = useMutation({
    mutationFn: ({ id,quantity }: { id:string,quantity: any }) => updateCart (id,  quantity),
    onSuccess: (updatedTodo) => {
      queryCLient.setQueryData(["cart"], (oldTodo: any) => {
        return oldTodo
          ? oldTodo.map((todo: any) =>
              todo.id === updatedTodo.id ? updatedTodo : todo
            )
          : [];
      });
    },
  })

  const deleteCartHandle = useMutation({
    mutationFn: deleteCart,
    onSuccess: (deleteTodo) => {
      queryCLient.setQueryData(["todos"], (oldTodo: any) => {
        return oldTodo
          ? oldTodo.filter((todo: any) => todo.id !== deleteTodo.id)
          : [];
      });
    },
  });

  return { cartData, deleteCartHandle, isLoading, addCartHandle, error, editCartHandle };
};

export default useCartRun;
