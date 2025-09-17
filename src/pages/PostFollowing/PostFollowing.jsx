import React, { useState, useEffect } from "react";
import ListPost from "../../components/ListPost/ListPost";
import PostService from "../../services/PostService";
export default function PostFollowing() {
  const [listPost, setListPost] = useState([]);
  const [load, setload] = useState(false);
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const handleLoad = () => {
    setload(!load);
  };
  useEffect(() => {
    PostService.GetAllPostByFollowing(token,username)
      .then((res) => {
        setListPost(res.data);
      })
      .catch((error) => {
        console.error("Error get all post following:", error);
      });
  }, [load,token])
  return (
    <div id="content-page" className="content-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto row m-0 p-0">
            {listPost.map((post) => (
              <ListPost key={post.id} post={post} handleLoad={handleLoad}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
