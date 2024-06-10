import { useEffect, useState } from "react";
import OrderShimmer from "../shimmer/OrderShimmer";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrderList = async () => {
    setIsLoading(true);
    const url = "https://cybotrix.com/webapi/cart/myorder";
    const getProduct = {
      userid: localStorage.getItem("tokenno"),
    };
    let postData = {
      headers: { "content-type": "application/json" },
      method: "post",
      body: JSON.stringify(getProduct),
    };
    const response = await fetch(url, postData);
    const msg = await response.json();
    return msg;
  };

  useEffect(() => {
    getOrderList().then((msg) => {
      setOrderList(msg.reverse());
      setIsLoading(false);
    });
  }, []);
  // console.log("orderlist---------------", orderList);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 mb-3">
          <h2 className="text-center">
            Order History - {orderList.length} Items
          </h2>
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          {isLoading ? (
            <OrderShimmer />
          ) : (
            orderList.map((order, index) => {
              return (
                <div
                  className="row border border-light shadow-lg p-2 mb-3 rounded"
                  key={index}
                >
                  <div className="col-lg-1"></div>
                  <div className="col-lg-10">
                    <p className="fw-semibold">
                      Order Id : {order[0] && order[0].orderid}
                    </p>
                    {order.map((item, index) => {
                      return (
                        <div
                          className=" row mb-2 p-2 border border-light-subtle shadow-sm main-div"
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
                            <p className="text-capitalize">
                              <span className="fw-bold">Product Name : </span>
                              {item.productname}
                            </p>
                            <p>
                              <span className="fw-bold">Price</span> : ₹
                              {item.priceperunit}
                            </p>
                            <p>
                              <span className="fw-bold">Total Amount</span> : ₹
                              {item.total}
                            </p>
                          </div>
                          <div className="col-lg-4">
                            <p className="mt-3 ">
                              <span className="fw-bold ">Quantity</span> :
                              {item.quantity}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  );
};

export default OrderList;
