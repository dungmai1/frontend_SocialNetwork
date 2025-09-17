import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import PostService from "../../services/PostService";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { imageDb } from "../../firebase/config";
import { UserContext } from "../../context/UserContext";
import Yolov8 from "../../services/Yolov8";
import { Avatar } from "@chakra-ui/react";

export default function CreatePost({ handleLoad }) {
  const token = localStorage.getItem("accessToken");
  const [Img, setImg] = useState([]);
  const [createPost, setcreatePost] = useState({
    content: "",
    imageUrl: "",
  });
  const [extract_vector, setextract_vector] = useState({
    image_path: "",
  });
  const context = useContext(UserContext);
  const handleChange = (e) => {
    setcreatePost({ ...createPost, [e.target.name]: e.target.value });
  };
  const handleButtonClick = async (e) => {
    e.preventDefault();
    const folderId = v4();
    const uploadPromises = Img.map((file) => {
      const uniqueFileName = `${folderId}/${file.name}`;
      const imgRef = ref(imageDb, `dataImage/${uniqueFileName}`);
      return uploadBytes(imgRef, file).then(() => {
        console.log(`Uploaded ${file.name} to folder ${folderId}`);
        setextract_vector({ image_path: folderId });
      });
    });
    try {
      await Promise.all(uploadPromises);
      setcreatePost((prevState) => ({
        ...prevState,
        imageUrl: folderId,
      }));
      const updatedPost = {
        ...createPost,
        imageUrl: folderId,
      };
      const update_extractvector ={
        ...extract_vector,
        image_path:folderId,
      };
      await Yolov8.ExtractVector(update_extractvector);
      await PostService.createPost(updatedPost, token);
      alert("Success");
      setcreatePost({ imageUrl: "", content: "" });
      const imageContainer = document.querySelector(".imageContainer");
      imageContainer.innerHTML = ""; // Clear any existing images
      document.getElementById("button_exit").click();
      handleLoad();
    } catch (error) {
      console.error("Error Create Post", error);
      console.log(createPost);
    }
  };

  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const handleFileSelect = () => {
    fileInputRef.current.click();
  };
  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    setImg(files);
    // setcreatePost({ ...createPost, imageUrl: files.map(file => file.name) });
    const imageContainer = document.querySelector(".imageContainer");
    imageContainer.innerHTML = ""; // Clear any existing images

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "img-wrapper";
        imgWrapper.style.position = "relative";
        imgWrapper.style.display = "inline-block";
        imgWrapper.style.margin = "10px";

        const img = document.createElement("img");
        img.src = reader.result;
        img.alt = "post-image";
        img.className = "img-fluid";
        img.style.width = "200px";

        const clearButton = document.createElement("button");
        clearButton.className = "clear-button";
        clearButton.style.position = "absolute";
        clearButton.style.top = "10px";
        clearButton.style.right = "10px";
        clearButton.style.background = "rgba(255, 255, 255, 0.7)";
        clearButton.style.border = "none";
        clearButton.style.cursor = "pointer";
        clearButton.innerHTML = '<i className="ri-close-fill"></i>';

        clearButton.addEventListener("click", () => {
          imgWrapper.remove();
          const updatedFiles = Array.from(event.target.files).filter(
            (_, i) => i !== index
          );
          const updatedFileList = new DataTransfer();
          updatedFiles.forEach((file) => updatedFileList.items.add(file));
          event.target.files = updatedFileList.files;
          setImg(updatedFiles);
        });
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(clearButton);
        imageContainer.appendChild(imgWrapper);
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <div id="post-modal-data" className="card">
      {/* <div className="card-header d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Create Post</h4>
          </div>
        </div> */}
      <div className="card-body">
        <div className="d-flex align-items-center">
            <Avatar
              src={context.user ? context.user.avatar : ""}
              alt="userimg"
            />
          <form
            className="post-text ms-3 w-100"
            data-bs-toggle="modal"
            data-bs-target="#post-modal"
            action="#"
          >
            <input
              type="text"
              className="form-control rounded"
              placeholder="Write something here..."
              style={{ border: "none" }}
            />
          </form>
        </div>
      </div>
      <div
        className="modal fade"
        id="post-modal"
        tabindex="-1"
        aria-labelledby="post-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="post-modalLabel">
                Create Post
              </h5>
              <button
                id="button_exit"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                <i className="ri-close-fill"></i>
              </button>
            </div>
            <div
              className="modal-body overflow-scroll"
              style={{ maxHeight: "500px" }}
            >
              <div className="d-flex align-items-center">
                  <Avatar
                    src={context.user ? context.user.avatar : ""}
                    alt="userimg"
                  />
                <form ref={formRef} className="post-text ms-3 w-100">
                  <input
                    type="text"
                    name="content"
                    className="form-control rounded"
                    placeholder="Write something here..."
                    style={{ border: "none" }}
                    value={createPost.content}
                    onChange={handleChange}
                  />
                </form>
              </div>
              <hr />
              <div className="imageContainer"></div>
              <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
                <li className="col-md-6 mb-3">
                  <div
                    className="bg-soft-primary rounded p-2 pointer me-3"
                    onClick={handleFileSelect}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      accept="image/*"
                      name="image"
                      value={createPost.image}
                      onChange={handleFileInputChange}
                      multiple
                    />
                    <img
                      src="../assets/images/small/07.png"
                      alt="icon"
                      className="img-fluid"
                    />
                    Photo/Video
                  </div>
                </li>
              </ul>
              <hr />
              <button
                type="button"
                className="btn btn-primary d-block w-100 mt-3"
                onClick={handleButtonClick}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
