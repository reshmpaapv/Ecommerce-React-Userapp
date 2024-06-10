/** @format */

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container-fluid bg-black footer mt-5">
      <div className="container p-5 ">
        <div className="row text-white">
          <div className="col-lg-3 ">
            <div>
              <h6 className="fw-bolder fs-5">Useful Links</h6>
              <li>
                <Link className="footer1 " to={"/vendorRegister"}>
                  Vendor Registration
                </Link>
              </li>
              <li>
                <Link to={"/contact"} className="footer1">Contact Us</Link>
              </li>
              <li>
                <Link className="footer1">About Us</Link>
              </li>

              <li>
                <Link className="footer1">Careers</Link>
              </li>
              <li>
                <Link className="footer1">Press</Link>
              </li>
            </div>
          </div>
          <div className="col-lg-3">
            <div>
              <h6 className="fw-bolder fs-5">Help</h6>
              <li>
                <Link className="footer1">Payments</Link>
              </li>
              <li>
                <Link className="footer1">Shipping</Link>
              </li>
              <li>
                <Link className="footer1">Cancellation & Returns</Link>
              </li>
              <li>
                <Link className="footer1">Report Infringement</Link>
              </li>
              <li>
                <Link className="footer1">FAQ</Link>
              </li>
            </div>
          </div>
          <div className="col-lg-3">
            <div>
              <h6 className="fw-bolder fs-5">Consumer Policy</h6>
              <li>
                <Link className="footer1">Cancellation & Returns</Link>
              </li>
              <li>
                <Link className="footer1">Terms & use</Link>
              </li>
              <li>
                <Link className="footer1">Privacy</Link>
              </li>
              <li>
                <Link className="footer1">Security</Link>
              </li>
              <li>
                <Link className="footer1">Cancellation & Returns</Link>
              </li>
            </div>
          </div>
          <div className="col-lg-3">
            <h6 className="fw-bolder fs-5">Social</h6>
            <div className="mt-4">
              <Link className="footer1">
                <span>
                  <i className="fa-brands fa-facebook fa-2x mx-2"></i>
                </span>
              </Link>
              <Link className="footer1">
                <span>
                  <i className="fa-brands fa-instagram fa-2x mx-2"></i>
                </span>
              </Link>
              <Link className="footer1 mx-3">
                <span>
                  <i className="fa-brands fa-twitter fa-2x"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
