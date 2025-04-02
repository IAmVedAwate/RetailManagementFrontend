import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRole, setToken } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sumbitHandler = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post(
        "https://localhost:44374/api/Auth/Login",
        {
          username: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { statusCode, isSuccess, result, errorMessages } = response.data;
      
      if (isSuccess && statusCode === 200) {
        const { email, role, token } = result;
        dispatch(setToken(token));
        dispatch(setRole(role));
        localStorage.setItem("token",`Bearer ${token}`);
        localStorage.setItem("role",`${role}`);
        navigate("/home/index");
      } else {
        console.error("Login failed:", errorMessages || "Unknown error occurred");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }

  return (
    <div className="container mt-5 d-flex align-items-center justify-content-center">
      <div className="row w-100 shadow-lg rounded overflow-hidden">
        {/* Left Section with Image and Overlay */}
        <div className="col-lg-6 p-0">
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

        <div className="col-lg-6 bg-white p-5 d-flex flex-column justify-content-center">
          <h5 className="display-6 mb-3">Login</h5>
          <p className="text-muted">
            Don't have an account?{" "}
            <Link to="/create/account">Create Your Account</Link> it takes less
            than a minute.
          </p>
          <form onSubmit={sumbitHandler}>
            <div className="mb-3">
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="User name"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-muted mb-0">Forget password?</p>
            </div>
            <button className="btn btn-success mt-4 w-100 rounded-pill">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
