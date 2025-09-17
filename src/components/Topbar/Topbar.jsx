import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Topbar.css";
import UserService from "../../services/UserService";
import { UserContext } from "../../context/UserContext";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";
import { IoExit } from "react-icons/io5";

import logo from "../../logo.png"
import { Avatar, Center, Select } from "@chakra-ui/react";

export default function Topbar() {
  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    CometChatUIKit.logout();
    console.log("FFFFF");
    window.location.replace("http://localhost:3000/");
  };

  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const username = localStorage.getItem("username");
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "saved") {
      navigate("/saved");
    } else if (selectedValue === "following") {
      navigate("/postfollowing");
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    if (location.pathname === "/saved") {
      setSelectedValue("saved");
    } else if (location.pathname === "/postfollowing") {
      setSelectedValue("following");
    } else {
      setSelectedValue("foryou");
    }
  }, [location.pathname]);
  return (
    <div className="iq-top-navbar">
      <div className="iq-navbar-custom">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <div className="iq-navbar-logo d-flex justify-content-between">
            <Link to="/">
              <img
                src={logo}
                className="img-fluid"
                alt=""
              />
              <span>NewSocial</span>
            </Link>
          </div>
          <Center>
            <div className="text-center">
              <Select
                w="120px"
                h="25px"
                name="selectOptions"
                value={selectedValue}
                onChange={handleSelectChange}
              >
                <option value="foryou">For You</option>
                <option value="following">Following</option>
                <option value="saved">Saved</option>
              </Select>
            </div>
          </Center>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
          >
            <i className="ri-menu-3-line"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  ms-auto navbar-list">
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="search-toggle   dropdown-toggle"
                  id="notification-drop"
                  data-bs-toggle="dropdown"
                >
                  <i
                    className="ri-notification-4-line position-relative"
                    style={{ fontSize: "23px" }}
                  >
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification-badge">
                      <span className="visually-hidden">Unread message</span>
                    </span>
                  </i>
                </a>
                <div
                  className="sub-drop dropdown-menu"
                  aria-labelledby="notification-drop"
                >
                  <div className="card shadow-none m-0">
                    <div className="card-header d-flex justify-content-between bg-primary">
                      <div className="header-title bg-primary">
                        <h5 className="mb-0 text-white">All Notifications</h5>
                      </div>
                      <small className="badge  bg-light text-dark">4</small>
                    </div>
                    <div className="card-body p-0">
                      <a href="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <img
                              className="avatar-40 rounded"
                              src="../assets/images/user/01.jpg"
                              alt=""
                            />
                          </div>
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">Emma Watson Bni</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">95 MB</p>
                              <small className="float-right font-size-12">
                                Just Now
                              </small>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <img
                              className="avatar-40 rounded"
                              src="../assets/images/user/02.jpg"
                              alt=""
                            />
                          </div>
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">New customer is join</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                5 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <img
                              className="avatar-40 rounded"
                              src="../assets/images/user/03.jpg"
                              alt=""
                            />
                          </div>
                          <div className="ms-3 w-100">
                            <h6 className="mb-0 ">Two customer is left</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                2 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="iq-sub-card">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <img
                              className="avatar-40 rounded"
                              src="../assets/images/user/04.jpg"
                              alt=""
                            />
                          </div>
                          <div className="w-100 ms-3">
                            <h6 className="mb-0 ">New Mail from Fenny</h6>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Cyst Bni</p>
                              <small className="float-right font-size-12">
                                3 days ago
                              </small>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="/message/"
                  id="mail-drop"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i
                    className="ri-mail-line position-relative"
                    style={{ fontSize: "23px" }}
                  >
                    {context.unreadCount > 0 ? (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification-badge">
                        <span className="visually-hidden">Unread message</span>
                      </span>
                    ) : null}
                  </i>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  to={`/user/${username}`}
                  className="d-flex align-items-center dropdown-toggle"
                >
                  <Avatar
                    src={context.user ? context.user.avatar : ""}
                    // className="img-fluid rounded-circle me-3"
                    alt="user"
                    marginRight="15px"
                  />
                  <div className="caption">
                    <h6 className="mb-0 line-height">
                      {context.user ? context.user.displayname : ""}
                    </h6>
                  </div>
                </NavLink>
              </li>
              <Center>
                <a className="">
                  <div onClick={handleSignOut}>
                    <IoExit
                      size={"40px"}
                      style={{
                        width: "40px",
                        color: "#333",
                      }}
                    />
                  </div>
                </a>
              </Center>
            </ul>
            
          </div>
        </nav>
      </div>
    </div>
  );
}
