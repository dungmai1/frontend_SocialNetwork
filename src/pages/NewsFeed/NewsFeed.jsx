import React, { useEffect, useState, useRef } from "react";
import PostService from "../../services/PostService";
import ListPost from "../../components/ListPost/ListPost";
import CreatePost from "../../components/CreatePost/CreatePost";
import { listAll, ref } from "firebase/storage";
import { imageDb } from "../../firebase/config";

export default function NewsFeed({ user }) {
  const [load, setload] = useState(false);
  const [listPost, setListPost] = useState([]);
  const token = localStorage.getItem("accessToken");
  const handleLoad = () => {
    setload(!load);
  };
  useEffect(() => {
    PostService.getAllPost(token)
      .then((res) => {
        const sortedPosts = res.data.sort((a, b) => {
          return new Date(b.postTime) - new Date(a.postTime);
        });
        setListPost(sortedPosts);
        console.log("Arr", sortedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
    console.log(listPost);
  }, [load]);
  return (
    <div id="content-page" className="content-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto row m-0 p-0">
            <div className="col-sm-12">
              <CreatePost handleLoad={handleLoad} user={user} />
            </div>
            {listPost.map((post) => (
              <ListPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
