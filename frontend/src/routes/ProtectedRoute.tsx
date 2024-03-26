import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const token = Cookies.get("username");
  const { pathname } = useLocation();

  const authProtected = ["/404"];
  const protectedByToken = [
    "/profilerenter",
    "/create-product",
    "/detail-product/:id",
    "/list-users",
    "/history-order-all",
    "/payment",
    "/list-product",
    "/shop-profile",
    "/my-profile",
    "/cart",
    "/detail-transaction",
    "/history-order-user",
    "/create-toko",
    "/edit-produk/:id",
  ];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to={"/"} />;
  }
  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
