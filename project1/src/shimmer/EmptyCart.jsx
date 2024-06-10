/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
const EmptyCart = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <img src="/AddCart.gif" alt="pic" className="img-fluid" />
        </div>
        <div className="text-center">
          <h3>Hey, It feels so light!</h3>
          <p>There is nothing in your cart. Let's add some items</p>
          <Link to={"/"}>
            <button>Add Item</button>
          </Link>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default EmptyCart;
