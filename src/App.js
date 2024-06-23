import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import PrivateRoute from "./components/Routes/Private";
import Dashboard from "./pages/userView/Dashboard";
import Profile from "./pages/userView/Profile";
import UserOrders from "./pages/userView/UserOrders";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/adminView/AdminDashboard";
import ImageUpload from "./pages/ImageUpload";
import CreateProduct from "./pages/adminView/CreateProduct";
import ViewProduct from "./pages/adminView/ViewProduct";
import UserDetails from "./pages/adminView/UserDetails";
import NewAdmin from "./pages/adminView/NewAdmin";
import ViewAdmins from "./pages/adminView/ViewAdmins";
import AdminProfile from "./pages/adminView/AdminProfile";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import PagenotFound from "./pages/PagenotFound";
import OrderDetails from "./pages/adminView/OrderDetails";

function App() {
  return (
    <>
      <Routes>
        {/* User + Admin both access pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/image" element={<ImageUpload />} />
        <Route path="/product-details/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<PagenotFound />} />

        {/* //user access pages */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        {/* admin access pages */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/product" element={<CreateProduct />} />
          <Route path="admin/product-view" element={<ViewProduct />} />
          <Route path="admin/user-details" element={<UserDetails />} />
          <Route path="admin/new-admin" element={<NewAdmin />} />
          <Route path="admin/admin-details" element={<ViewAdmins />} />
          <Route path="admin/profile" element={<AdminProfile />} />
          <Route path="admin/orders" element={<OrderDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
