import React, { useState, useEffect } from "react";
import LoginService from "../../services/LoginService";
import { NavLink, useNavigate } from "react-router-dom";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [account, setaccount] = useState([]);
  const handleChange = (e) => {
    setaccount({ ...account, [e.target.name]: e.target.value });
  };
  const LoginComet = async (UID) => {
    try {
      await CometChatUIKit.getLoggedinUser().then(async (user) => {
        if (!user) {
          // Login user
          const loggedInUser = await CometChatUIKit.login(UID);
          console.log("Login Successful:", loggedInUser);
        }
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await LoginService.Login(account);
      localStorage.setItem("accessToken", res.data.token);
      await localStorage.setItem("username", res.data.user.usname);
      const username = res.data.user.usname;
      await LoginComet(username);
      alert("Success");
      window.location.replace("http://localhost:3000/");
    } catch (error) {
      alert("Login Fail")
      console.error("Error Login", error);
    }
  };

  return (
    <div className="wrapper">
      <section className="sign-in-page">
        <div id="container-inside">
          <div id="circle-small"></div>
          <div id="circle-medium"></div>
          <div id="circle-large"></div>
          <div id="circle-xlarge"></div>
          <div id="circle-xxlarge"></div>
        </div>
        <div className="container p-0">
          <div className="row no-gutters">
            <div className="col-md-6 text-center pt-5">
              <div className="sign-in-detail text-white">
                <a className="sign-in-logo mb-5" href="#">
                  <img
                    src="../assets/images/logo-full.png"
                    className="img-fluid"
                    alt="logo"
                  />
                </a>
                <div className="sign-slider overflow-hidden ">
                  <ul className="swiper-wrapper list-inline m-0 p-0 ">
                    <li className="swiper-slide">
                      <img
                        src="../assets/images/login/1.png"
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">Find new friends</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </li>
                    <li className="swiper-slide">
                      <img
                        src="../assets/images/login/2.png"
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">
                        Connect with the world
                      </h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </li>
                    <li className="swiper-slide">
                      <img
                        src="../assets/images/login/3.png"
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">Create new events</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 bg-white pt-5 pt-5 pb-lg-0 pb-5">
              <div className="sign-in-from">
                <h1 className="mb-0">Sign in</h1>
                <p>Enter your phone number and password to access home page.</p>
                <form className="mt-4" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Phone number</label>
                    <input
                      type="phone"
                      name="phone"
                      className="form-control mb-0"
                      placeholder="Enter phone number"
                      value={account.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>

                    <input
                      type="password"
                      name="password"
                      className="form-control mb-0"
                      placeholder="Password"
                      value={account.password}
                      onChange={handleChange}
                    />
                    <a href="#" className="float-end">
                      Forgot password?
                    </a>
                  </div>
                  <div className="d-inline-block w-100">
                    <div className="form-check d-inline-block mt-2 pt-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customCheck11"
                      />
                      <label className="form-check-label" for="customCheck11">
                        Remember Me
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary float-end">
                      Sign in
                    </button>
                  </div>
                  <div className="sign-info">
                    <span className="dark-color d-inline-block line-height-2">
                      Don't have an account? <Link to="/register">Sign up</Link>
                    </span>
                    <ul className="iq-social-media">
                      <li>
                        <a href="#">
                          <i className="ri-facebook-box-line"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ri-twitter-line"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ri-instagram-line"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
