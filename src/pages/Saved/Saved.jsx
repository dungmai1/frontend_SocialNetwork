import React, { useState, useEffect } from "react";
import ListPost from "../../components/ListPost/ListPost";
import SavedService from "../../services/SavedService";
export default function Saved() {
  const [listPost, setListPost] = useState([]);
  const [load, setload] = useState(false);
  const token = localStorage.getItem("accessToken");
  const handleLoad = () => {
    setload(!load);
  };
  useEffect(() => {
    SavedService.LoadSavePost(token)
      .then((res) => {
        setListPost(res.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
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
