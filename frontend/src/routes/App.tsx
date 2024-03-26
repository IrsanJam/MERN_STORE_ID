import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../../src/pages/auth/Login";
import Register from "../../src/pages/auth/Register";
import MainProduct from "../../src/pages/products/MainProduct";
import CreateProduct from "../../src/pages/products/CreateProduct";
import DetailProduct from "../../src/pages/products/DetailProduct";
import ListUsers from "../../src/pages/admin/ListUser";
import Payment from "../../src/pages/payment/Payment";
import HistoryOrderAll from "../../src/pages/admin/HistoryOrderAll";
import ListProduct from "../../src/pages/products/ListProduct";
import ShopProfile from "../../src/pages/shop/ShopProfile";
import MyProfile from "../../src/pages/profile/MyProfile";
import DetailTransaction from "../../src/pages/payment/DetailTransaction";
import Cart from "../../src/pages/shop/Cart";
import HistoryOrderUser from "../../src/pages/payment/HistoryOrderUser";
import CreateShop from "../../src/pages/shop/CreateShop";
import EditProduct from "../../src/pages/products/EditProduct";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainProduct />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/create-product" element={<CreateProduct />}></Route>
            <Route path="/detail-product/:id" element={<DetailProduct />}></Route>
            <Route path="/list-users" element={<ListUsers />}></Route>
            <Route path="/history-order-all" element={<HistoryOrderAll />}></Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route path="/list-product" element={<ListProduct />}></Route>
            <Route path="/shop-profile" element={<ShopProfile />}></Route>
            <Route path="/my-profile" element={<MyProfile />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/detail-transaction" element={<DetailTransaction />}></Route>
            <Route path="/history-order-user" element={<HistoryOrderUser />}></Route>
            <Route path="/create-toko" element={<CreateShop />}></Route>
            <Route path="/edit-produk/:id" element={<EditProduct />}></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
