import { useState } from "react";

const VendorRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPinCode] = useState("");

  const createVendor = () => {
    let url = "https://cybotrix.com/webapi/login/createaccount";
    let newbrand = {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      city: city,
      address: address,
      pincode: pincode,
    };
    let postdata = {
      headers: { "content-type": "application/json" },
      method: "post",
      body: JSON.stringify(newbrand),
    };
    fetch(url, postdata)
      .then((response) => response.text())
      .then((userinfo) => {
        console.log(userinfo);
        setName("");
        setEmail("");
        setPassword("");
        setMobile("");
        setCity("");
        setAddress("");
        setPinCode("");
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-5">
          <div className="card border-0 shadow-lg ">
            <div className="card-header bg-info text-white text-center">
              <i className="fa fa-user fa-lg mx-2"></i>Vendor Registration
            </div>
            <div className="card-body">
              <div className="mb-4">
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email">e-Mail Id</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile">Mobile No</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password">Address</label>
                <textarea
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                ></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="city">Pin Code</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => setPinCode(e.target.value)}
                  value={pincode}
                />
              </div>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-info" onClick={createVendor}>
                Register <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default VendorRegister;
