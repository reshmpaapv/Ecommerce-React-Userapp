import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import EmptyCart from "../shimmer/EmptyCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartShimmer from "../shimmer/CartShimmer";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const getCartItem = async () => {
    setIsLoading(true);
    const url = "https://cybotrix.com/webapi/cart/getcartitem";
    const addProduct = {
      orderid: localStorage.getItem("orderid"),
    };
    let postData = {
      headers: { "content-type": "application/json" },
      method: "post",
      body: JSON.stringify(addProduct),
    };
    try {
      const response = await fetch(url, postData);
      const msg = await response.json();
      console.log(msg);
      setCartItem(msg);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const totalPrice = () => {
    let totalCost = 0;
    cartItem.map((item) => {
      totalCost += Number(item.total);
    });
    return totalCost;
  };
  // console.log(totalPrice());

  const deleteProduct = async (product) => {
    const url = "https://cybotrix.com/webapi/cart/removeCartItem";
    const addProduct = {
      productid: product.orderid,
      id: product.id,
      qty: product.quantity,
    };
    let postData = {
      headers: { "content-type": "application/json" },
      method: "post",
      body: JSON.stringify(addProduct),
    };
    try {
      const response = await fetch(url, postData);
      const msg = await response.text();
      toast.error(msg, {
        autoClose: 1000, // Close after 1 seconds
      });
      setTimeout(() => {
        getCartItem();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateCart = async (product, action) => {
    let qty = 0;
    if (action == "add") qty = 1;
    else if (action == "sub") qty = -1;
    if (product.quantity == 1 && action == "sub") deleteProduct(product);
    else {
      let url = "https://cybotrix.com/webapi/cart/addtocart";
      let cartproduct = {
        productid: product.productid,
        orderid: product.orderid,
        qty: qty,
        price: product.priceperunit,
      };
      let postdata = {
        headers: { "Content-Type": "application/json" },
        method: "post",
        body: JSON.stringify(cartproduct),
      };
      await fetch(url, postdata)
        .then((response) => response.text())
        .then((msg) => {
          toast.success(msg, {
            autoClose: 1000, // Close after 3 seconds
          });
          getCartItem();
        });
    }
  };

  const placeOrder = (action) => {
    if (localStorage.getItem("tokenno")) {
      // navigate("/checkout");
      action === "open" ? setShow(true) : setShow(false);
    } else {
      navigate("/login");
    }
  };

  const payNow = async () => {
    const url = "https://cybotrix.com/webapi/cart/paynow";
    const orderData = {
      mode: mode,
      orderid: localStorage.getItem("orderid"),
      userid: localStorage.getItem("tokenno"),
      total: totalPrice(),
    };
    const postData = {
      headers: { "content-type": "application/json" },
      method: "post",
      body: JSON.stringify(orderData),
    };
    try {
      const response = await fetch(url, postData);
      const msg = response.text();
      setShow(false);
      toast.success(msg, {
        autoClose: 2000, // Close after 3 seconds
      });
      setTimeout(() => {
        localStorage.removeItem("orderid");
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.log("Error", err);
      toast.error("Payment failed. Please try again later.");
    }
  };

  useEffect(() => {
    getCartItem();
  }, []);

  return isLoading ? (
    <CartShimmer />
  ) : cartItem.length == 0 ? (
    <EmptyCart />
  ) : (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12 mb-4">
          <h3 className="text-center">Cart Items</h3>
        </div>
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-7">
            <ToastContainer position="top-center" />
            <h4 className="text-center mb-3">Item Added</h4>
            <div>
              {cartItem.map((product, index) => {
                return (
                  <div
                    className=" row mb-3 border border-black main-div"
                    key={index}
                  >
                    <div className="col-lg-3">
                      {
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0lOAbGwrTH9HV2C9md0fn379g-KY4avQ_Jubs6IkBQg&s"
                          className="card-img-top"
                          alt="..."
                        />
                      }
                    </div>
                    <div className="col-lg-4 ">
                      <p className="mt-3 fw-bold">{product.productname}</p>
                      <p>
                        <span className="fw-bold">Price</span> : ₹
                        {product.priceperunit}
                      </p>
                      <p>
                        <span className="fw-bold">Total Amount</span> : ₹
                        {product.total}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <p className="mt-3 ">
                        <span className="fw-bold">Order Id</span> :
                        {product.orderid}
                      </p>

                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={updateCart.bind(this, product, "sub")}
                        >
                          -
                        </button>
                        <button type="button" className="">
                          <span className="fw-bold me-2">
                            {product.quantity}
                          </span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={updateCart.bind(this, product, "add")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-1">
                      <i
                        className="fa fa-circle-xmark fa-2x delete-btn mt-3 del-icon"
                        onClick={deleteProduct.bind(this, product)}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-lg-4 mt-5">
            <div className="card ">
              <div className="card-header text-center fw-bold">
                Cart Summary
              </div>
              <div className="card-body">
                <p>Total Items : {cartItem.length} </p>
                <p>Total Price : ₹ {totalPrice()} </p>
              </div>
              <div className="card ">
                <div className="d-flex justify-content-between mb-4 p-3">
                  <span>Total Amount</span>
                  <span>₹ {totalPrice()}</span>
                </div>
                <button
                  className="btn btn-secondary w-100 "
                  onClick={() => placeOrder("open")}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <ToastContainer position="top-right" />
            <div className="row">
              <p className="fs-6">
                Total amount to be paid : ₹
                <span className="fs-4 ms-1">{totalPrice()}</span>
              </p>
              <p className="fs-5 fw-semibold">Choose Payment Methods : </p>
              <div className="col-lg-12 d-flex justify-content-between">
                <div
                  className={`p-2 m-2 ${
                    mode === "netBanking" ? "activediv" : "inactivediv"
                  } `}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4488/4488426.png"
                    alt="paymentIcon"
                    width={50}
                    onClick={() => setMode("netBanking")}
                  />
                  <p>Net Banking</p>
                </div>
                <div
                  className={`p-2 m-2 ${
                    mode === "upi" ? "activediv" : "inactivediv"
                  } `}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3186/3186923.png"
                    alt="paymentIcon"
                    width={50}
                    onClick={() => setMode("upi")}
                  />
                  <p>Upi</p>
                </div>
                <div
                  className={`p-2 m-2 ${
                    mode === "debit" ? "activediv" : "inactivediv"
                  } `}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/9334/9334540.png"
                    alt="paymentIcon"
                    width={50}
                    onClick={() => setMode("debit")}
                  />
                  <p>Debit Card</p>
                </div>
                <div
                  className={`p-2 m-2 ${
                    mode === "credit" ? "activediv" : "inactivediv"
                  }`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/10473/10473692.png"
                    alt="paymentIcon"
                    width={50}
                    onClick={() => setMode("credit")}
                  />
                  <p>Credit Card</p>
                </div>
                <div
                  className={`p-2 m-2 ${
                    mode === "cod" ? "activediv" : "inactivediv"
                  }`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/5359/5359689.png"
                    alt="paymentIcon"
                    width={50}
                    onClick={() => setMode("cod")}
                  />
                  <p>Cash on delivery</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => placeOrder("close")}>
            Close
          </Button>
          <Button variant="primary" onClick={payNow}>
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
