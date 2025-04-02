import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import StoreUserForm from '../Store/StoreUserForm';
import RetailerUserForm from '../Retailer/RetailerUserForm';
import DeliveryUserForm from '../Delivery/DeliveryUserForm';
const CreateAccount = () => {
  const [roleForForm, setRoleForForm] = useState(null);

  const [formData, setFormData] = useState({
    role: "",
    name: "",
    username: "",
    phone: "",
    password: "",
    profilePhoto: null,
    roleData: {},
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profilePhoto: e.target.files[0],
    }));
  };

  const handleRoleChange = (data) => {
    setFormData((prev) => ({
      ...prev,
      role: data,
    }));
  };

  const handleRoleDataChange = (data) => {
    setFormData((prev) => ({
      ...prev,
      roleData: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("username", formData.username);
      formPayload.append("phone", formData.phone);
      formPayload.append("password", formData.password);
      formPayload.append("role", formData.role);
      if (formData.profilePhoto) {
        formPayload.append("profilePhoto", formData.profilePhoto);
      }
      for (const key in formData.roleData) {
        formPayload.append(key, formData.roleData[key]);
      }
      
      const response = await axios.post(
        "https://localhost:44374/api/Auth/Register",
        formPayload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response.data);
      
      alert("Registration successful!");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to register user.");
    }
  };

  return (
    <>
    <div className="container mt-5 d-flex align-items-center justify-content-center">
      <div className="row w-100 shadow-lg rounded-top-3 overflow-hidden">
        {/* Left Section with Image and Overlay */}
        <div className="col-lg-4 p-0">
          <div
            className="h-100 position-relative text-white"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/5d/73/ea/5d73eaabb25e3805de1f8cdea7df4a42--tumblr-backgrounds-iphone-phone-wallpapers-iphone-wallaper-tumblr.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="h-100 d-flex flex-column align-items-center justify-content-center p-4 text-center"
              style={{
                background: "#5961f9ad",
              }}
            >
              <h1
                className="display-1 fw-bold mb-3"
                style={{ fontFamily: "'Macondo Swash Caps', cursive" }}
              >
                RMS
              </h1>
              <p>Web-app services for sales, customer satisfaction, and staff productivity</p>
              <div className="mt-4">
                <p>Login with social media</p>
                <a
                  href="#"
                  className="btn btn-primary rounded-pill me-3"
                  style={{ background: "#1dcaff" }}
                >
                  <i className="fa fa-google me-2"></i>Login with Google
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section with Login Form */}
        <div className="col-lg-8 bg-white p-5 d-flex flex-column justify-content-center">
          <h5 className="display-6 mb-3">Register</h5>
          <p className="text-muted">
            Already have an account?{" "}
            <Link to="/login">Log Into Your Account</Link> it takes less
            than a minute.
          </p>
          <form>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="mb-2">Name: </label>
                  <input className="form-control" name="name"
                      onChange={handleInputChange} />
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="mb-2">Email: </label>
                  <input type="email"
                      className="form-control"
                      name="username"
                      onChange={handleInputChange} />
                  <span className="text-danger"></span>
                </div>
              </div>
            </div>
            <div className="row">

              <div className="col-6">
                <div className="mb-3">
                  <label className="mb-2">Phone: </label>
                  <input type="number"
                      className="form-control"
                      name="phone"
                      onChange={handleInputChange} />
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="col-6">
              <div className="mb-3">
                  <label className="mb-2">Password: </label>
                  <input type="password"
                      className="form-control"
                      name="password"
                      onChange={handleInputChange} />
                  <span className="text-danger"></span>
                </div>
              </div>
            </div>
            <div className="mb-3">
                <label  className="mb-2">Profile Photo: </label>
                <input type="file"
                  name="profilePhoto"
                  className="form-control"
                  onChange={handleFileChange} />
            </div>
            <br/>
            <div className="row" style={{marginBottom:"-45px"}}>
              <div className="btn btn-outline-primary col-3" onClick={()=> {setRoleForForm("store"); handleRoleChange("store")  }} >Store</div>
              <div className="btn btn-outline-primary col-3" onClick={()=> {setRoleForForm("retailer"); handleRoleChange("retailer") }} >Retailer</div>
              <div className="btn btn-outline-primary col-3" onClick={()=> {setRoleForForm("delivery"); handleRoleChange("delivery") }} >Delivery</div>
              <div className="btn btn-outline-primary col-3" onClick={()=> {setRoleForForm("admin"); handleRoleChange("admin") }} >Admin</div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div className='container pb-5 d-flex align-items-center justify-content-center'>
      <div className='col-12 row shadow-lg rounded-bottom-3 bg-secondary overflow-hidden' style={{backgroundColor:"white"}}>
        {roleForForm=="store" ? <StoreUserForm onChange={handleRoleDataChange} />: <></>}
        {roleForForm=="retailer" ? <RetailerUserForm onChange={handleRoleDataChange} />: <></>}
        {roleForForm=="delivery" ? <DeliveryUserForm onChange={handleRoleDataChange} />: <></>}
        <div className="text-center m-2">
        <button className='btn btn-success w-25' onClick={handleSubmit} type="submit">Submit</button>
        </div>
      </div>
      </div>
    </>
  );
};

export default CreateAccount;
