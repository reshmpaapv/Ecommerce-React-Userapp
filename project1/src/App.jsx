/** @format */

import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Search from "./components/Search";
import ProductDetails from "./components/ProductDetails";
import OrderList from "./components/OrderList";
import VendorRegister from "./components/VendorRegister";
import Contact from "./components/Contact";

function App() {
  if (localStorage.getItem("orderid") == null) {
    let orderid = Math.ceil(Math.random() * 7008525309);
    localStorage.setItem("orderid", orderid);
  }
  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderlist" element={<OrderList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vendorRegister" element={<VendorRegister />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search/:purl" element={<Search />} />
          <Route path="/product/details/:purl" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;
