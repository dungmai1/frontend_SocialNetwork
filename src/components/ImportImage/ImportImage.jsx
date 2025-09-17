import React from "react";
import { useState, useEffect } from "react";

import { FileUploader } from "react-drag-drop-files";
import ListPost from "../ListPost/ListPost";
import Yolov8 from "../../services/Yolov8";
import PostService from "../../services/PostService";
import "./ImportImage.css";

const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

export default function ImportImage() {
  const [listPost, setListPost] = useState([]);
  const token = localStorage.getItem("accessToken");
  const [imagedetect, setimagedetect] = useState([]);
  const [listPath, setlistPath] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setfileName] = useState(null);
  const [load, setload] = useState(false);
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (listPath && listPath.length > 0) {
      LoadImageRetrieval();
    }
  }, [listPath]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fileName) {
          await Yolov8.predict(fileName).then((res) => {
            console.log("1");
            setimagedetect(null);
            console.log("2");
            const updateImageDetect = res.data;
            console.log("imeg", res.data);
            setimagedetect(updateImageDetect);
          });
          await image_retrieval();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [load]);

  const image_retrieval = async (id) => {
    setLoading(true)
    await Yolov8.imageRetrieval(id)
      .then((res) => {
        setlistPath(res.data);
        console.log("Data", res.data);
      })
      .catch((err) => {
        console.error("Error image retrieval", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const LoadImageRetrieval = async () => {
    try {
      const res = await PostService.getAllPostsByImagePaths(listPath, token);
      setListPost(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setload(!load);
    setLoading(true);
  };

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setfileName(e.target.files[0]);
    setListPost([]);
    setimagedetect(null);
  };
  return (
    <div id="content-page" className="content-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Import Image</h4>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-10">
                    <div className="event-post position-relative">
                      <input type="file" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <a href="" onClick={handleSubmit}>
                      Search
                    </a>
                  </div>
                  {file ? (
                    <img
                      src={file}
                      alt="gallary-image"
                      className="img-fluid rounded"
                      style={{ border: "2px dashed #000" }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Filter</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-10" style={{ display: "flex" }}>
                    {imagedetect ? (
                      imagedetect.map((img, index) => (
                        <>
                          <img
                            key={index}
                            src={"http://127.0.0.1:6868/" + img.path}
                            className="img-thumbnail"
                            alt="Responsive image"
                            style={{ width: "15%" }}
                            onClick={() => image_retrieval(index)}
                          />
                          <div>{img.label_name}</div>
                        </>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <>
              {loading ? (
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : listPost && listPost.length > 0 ? (
                listPost.map((post) => <ListPost key={post.id} post={post} />)
              ) : (
                <p>No posts found.</p>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
