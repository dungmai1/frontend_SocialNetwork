import React, { useContext, useEffect, useState } from "react";
import RelationshipService from "../../services/RelationshipService";
import { Link } from "react-router-dom";
import { Avatar, Card } from "@chakra-ui/react";

export default function ListUser({ user,load,setload }) {
  const [checkfollow, setcheckfollow] = useState();
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");

  // const [load, setload] = useState(false);

  const handleHideFollow = (user, username) => {
    return user?.usname ? user.usname === username : false;
  };

  const handleFollow = (e) => {
    e.preventDefault();
    RelationshipService.AddFollow(token, user.usname)
      .then((res) => {
        setload(!load);
      })
      .catch((error) => {
        setload(!load);
        console.error("Error Follow", error);
      });
  };
  useEffect(() => {
    RelationshipService.CheckFollow(token, user.usname)
      .then((res) => {
        setcheckfollow(res.data);
      })
      .catch((error) => {
        console.error("Error check follow", error);
      });
    console.log("Follow", handleHideFollow);
  }, [load]);

  return (
    <Card>
    <div class="card-body p-2">
      <ul class="todo-task-lists m-0 p-0">
        <Link
          to={`/user/${user.usname}`}
          className="d-flex align-items-center p-1"
        >
          <div className="user-img img-fluid">
            <Avatar
              src={user.avatar}
              alt="story-img"
            />
          </div>
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="ms-3">
              <h6 className="d-inline-block">{user.usname}</h6>
              <p className="mb-0">{user.displayname}</p>
            </div>
            <div className="card-header-toolbar d-flex align-items-center">
              {handleHideFollow(user, username) ? (
                <></>
              ) : (
                <button
                  type="button"
                  className="btn mb-1 btn-primary"
                  onClick={handleFollow}
                >
                  {checkfollow ? "Follow" : "Following"}
                </button>
              )}
            </div>
          </div>
        </Link>
      </ul>
    </div>
    </Card>
  );
}
