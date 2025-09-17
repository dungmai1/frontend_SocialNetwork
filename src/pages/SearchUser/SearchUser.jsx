import React, { useContext, useEffect, useState } from "react";
import UserService from "../../services/UserService";
import "./SearchUser.css";
import RelationshipService from "../../services/RelationshipService";
import { Link } from "react-router-dom";
import ListUser from "../../components/ListUser/ListUser";
export default function SearchUser() {
  const [textSearch, settextSearch] = useState({ Search: "" });
  const [listUser, setlistUser] = useState([]);
  const token = localStorage.getItem("accessToken");
  const handleChange = (e) => {
    settextSearch({ ...textSearch, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    UserService.getAllUser(token)
      .then((res) => {
        setlistUser(res.data);
      })
      .catch((err) => {
        console.error("get all user", err);
      });
    const fetchUsers = async () => {
      try {
        setlistUser([]);
        const res = await UserService.getUserbySearch(token, textSearch.Search);
        setlistUser(res.data);
        console.log("E", res.data);
      } catch (err) {
        console.error("Error get user by search", err);
      }
    };

    if (textSearch.Search.trim()) {
      const delayDebounceFn = setTimeout(() => {
        fetchUsers();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setlistUser([]);
    }
  }, [textSearch]);
  return (
    <>
      <div id="content-page" className="content-page">
        <div className="container">
          <div class="card">
            <div className="card-body p-0">
              <div className="iq-search-bar device-search d-flex justify-content-center p-2">
                <form action="#" className="searchbox">
                  <a className="search-link" href="#">
                    <i className="ri-search-line"></i>
                  </a>
                  <input
                    type="text"
                    className="text search-input center-input"
                    placeholder="Search here..."
                    name="Search"
                    value={textSearch?.Search || ""}
                    onChange={handleChange}
                  />
                </form>
              </div>
            </div>
            {listUser.map((user) => (
              <ListUser key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
