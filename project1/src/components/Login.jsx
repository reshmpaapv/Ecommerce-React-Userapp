/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const navigate = useNavigate();
  const loginCheck = async () => {
    if (email === "" || password === "") {
      alert(`Please Enter Email or Password`);
    } else {
      const url = "https://cybotrix.com/webapi/login/auth";
      const newBrand = { email: email, password: password };
      const postData = {
        headers: { "content-type": "application/json" },
        method: "post",
        body: JSON.stringify(newBrand),
      };
      try {
        const response = await fetch(url, postData);
        const userinfo = await response.json();
        console.log(userinfo);
        if (userinfo.type === "USER") {
          localStorage.setItem("tokenno", userinfo.tokenno);
          localStorage.setItem("name", userinfo.name);
          localStorage.setItem("status", userinfo.status);
          navigate("/cart");
        } else {
          alert("Invalid User Type");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <img src="login.gif" alt="pic" />
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-4 " style={{ marginTop: "100px" }}>
          <div className="card border border-dark shadow-lg ">
            <div className="card-header bg-dark text-white text-center p-2 fw-semibold fs-3">
              Login
            </div>
            <div className="card-body">
              <div className="mb-4">
                <label htmlFor="email" className="fs-5 py-2">
                  E-mail
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="fs-5 py-2">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassWord(e.target.value)}
                  value={password}
                />
              </div>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-secondary" onClick={loginCheck}>
                Login <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
