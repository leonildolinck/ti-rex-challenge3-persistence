import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
};

export default App;
