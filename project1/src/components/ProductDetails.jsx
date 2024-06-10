import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import img1 from "../assets/img-1.jpg";
import img2 from "../assets/img-2.webp";
// import {  useParams } from "react-router-dom";
const ProductDetails = () => {
  const [productList, setProductList] = useState({});
  const { purl } = useParams();
  const searchedProduct = async () => {
    // alert(purl);
    let url = "https://cybotrix.com/webapi/product/searchproductbyurl";
    let searchData = { url: purl, type: "pdetails" };
    let postData = {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(searchData),
    };
    await fetch(url, postData)
      .then((response) => response.json())
      .then((resultArr) => {
        console.log(resultArr);
        // setShowSuggestions(resultArr);
        setProductList(resultArr);
      })
      .catch((err) => console.log("Error in getting product", err));
  };
  useEffect(() => {
    searchedProduct();
  }, []);
  const changeImage = (src) => {
    document.getElementById("mainimg").src = src;
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 d-flex">
          <div className="d-flex flex-column gap-4">
            <img
              src={
                "https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/s/9/i/m6-pro-5g-mzb0eqjin-poco-original-imags3e7dazavyje.jpeg?q=20&crop=false"
              }
              alt=""
              width={100}
              height={100}
              onClick={() => {
                changeImage(
                  "https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/s/9/i/m6-pro-5g-mzb0eqjin-poco-original-imags3e7dazavyje.jpeg?q=20&crop=false"
                );
              }}
            />
            <img
              src={img1}
              alt=""
              width={100}
              height={100}
              onClick={() => {
                changeImage(img1);
              }}
            />
            <img
              src={
                "https://imgs.search.brave.com/gyG3ID_B6BG197KVxsc22qz9UyodpIfIPuZGRSB3kFE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFZSGZtb3NQckwu/anBn"
              }
              alt=""
              width={100}
              height={100}
              onClick={() => {
                changeImage(
                  "https://imgs.search.brave.com/gyG3ID_B6BG197KVxsc22qz9UyodpIfIPuZGRSB3kFE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFZSGZtb3NQckwu/anBn"
                );
              }}
            />
            <img
              src={img2}
              alt=""
              width={100}
              height={100}
              onClick={() => {
                changeImage(img2);
              }}
            />
          </div>
          <div className="mb-3">
            <img
              id="mainimg"
              className=" border-secondary-subtle p-5 rounded-3 shadow-sm"
              src="https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/s/9/i/m6-pro-5g-mzb0eqjin-poco-original-imags3e7dazavyje.jpeg?q=20&crop=false"
              alt="pic"
              height={400}
              width={300}
            />
          </div>

          {/* <button
            className=" rounded-3 px-2 text-white btn-hover text-center ms-5"
            style={{ backgroundColor: "#866528" }}
          >
            Add to cart
          </button> */}
        </div>
        <div className="col-lg-6 ">
          <h1 className="mb-3">Product Details</h1>
          <p>
            <span className="fw-semibold">Name : </span>{" "}
            {productList.productname}
          </p>
          <p>
            <span className="fw-semibold">Price : ₹</span> {productList.price}
          </p>
          <p>
            <span className="fw-semibold">Brand : </span>
            {productList.brandname}
          </p>
          <p>
            <span className="fw-semibold">Category : </span>{" "}
            {productList.categorydetails}
          </p>
          <p>
            <span className="fw-semibold">Details : </span>{" "}
            {productList.details}
          </p>
        </div>
        <div className="col-lg-1"></div>
      </div>
    </div>
  );
};

export default ProductDetails;
