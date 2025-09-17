import React, { useEffect, useState } from "react";
import "./ToolTipUser.css";
import RelationshipService from "../../services/RelationshipService";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { IoChatbox } from "react-icons/io5";

export default function ToolTipUser({ post }) {
  const [checkfollow, setcheckfollow] = useState();
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");

  const [load, setload] = useState(false);

  const handleHideFollow = (post, username) => {
    return post.user?.usname ? post.user.usname === username : false;
  };

  const handleFollow = (e) => {
    e.preventDefault();
    RelationshipService.AddFollow(token, post.user.usname)
      .then((res) => {
        setload(!load);
      })
      .catch((error) => {
        setload(!load);
        console.error("Error Follow", error);
      });
  };

  useEffect(() => {
    RelationshipService.CheckFollow(token, post.user.usname)
      .then((res) => {
        setcheckfollow(res.data);
      })
      .catch((error) => {
        console.error("Error check follow", error);
      });
  }, [load]);

  return (
    <div className="TooltipUser">
      <li class="d-flex mb-2 align-items-center">
        <div class="user-img img-fluid">
          <img
            src={post.user.avatar}
            alt="story-img"
            class="rounded-circle avatar-40"
          />
        </div>
        <div class="d-flex align-items-center justify-content-between w-100">
          <div class="ms-3">
            <h6>{post.user.usname}</h6>
            <p class="mb-0">{post.user.displayname}</p>
          </div>
          <div class="card-header-toolbar d-flex align-items-center"></div>
        </div>
      </li>
      {handleHideFollow(post, username) ? (
        <></>
      ) : (
        <>
          <ul class="list-group list-group-horizontal">
            <li className="text-center pe-3">
              <Button colorScheme="blue" onClick={handleFollow}>
                {checkfollow ? "Follow" : "Following"}
              </Button>
            </li>
            <li className="text-center pe-3">
              <Link to={`/message/${post.user.usname}`}>
                <Button leftIcon={<IoChatbox />}>Chat</Button>
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
