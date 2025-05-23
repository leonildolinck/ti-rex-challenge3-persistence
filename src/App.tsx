import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleProduct from "./components/layout/SingleProduct";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import UserSync from "./hooks/UserSync";
import AuthCallback from "./services/AuthCallback";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import LoadingSpinner from "./components/common/LoadingSpinner";


const App: React.FC = () => {
  
  return (
    <div>
      <UserSync />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in-callback" element={<AuthCallback />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/*" element={<NotFound />} />



        <Route path="/load" element={<LoadingSpinner  />} />
      </Routes>
    </div>
  );
};

export default App;
