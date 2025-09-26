import React, { useEffect, useState, useContext, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import LikeService from "../../services/LikeService";
import CommentService from "../../services/CommentService";
import { vi } from "date-fns/locale";
import { jwtDecode } from "jwt-decode";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { imageDb } from "../../firebase/config";
import "./ListPost.css";
import SavedService from "../../services/SavedService";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { tippy } from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Tippy from "@tippyjs/react";
import ToolTipUser from "../ToolTipUser/ToolTipUser";
import "tippy.js/themes/light.css";
import { FaSave } from "react-icons/fa";
import { Center, Flex } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
export default function ListPost({ post, handleLoad }) {
  const token = localStorage.getItem("accessToken");
  const context = useContext(UserContext);
  const [countlike, setcountlike] = useState("");
  const [comment, setcomment] = useState({
    content: "",
    imageUrl: "",
    postId: 0,
  });
  const [countcomment, setcountcomment] = useState("");
  const [commentlist, setcommentlist] = useState([]);
  const [imgUrls, setimgUrls] = useState([]);
  const [checkSavePost, setcheckSavePost] = useState([]);
  const [load, setload] = useState(false);
  const PostTime = formatDistanceToNow(
    post.postTime,
    { locale: vi },
    {
      addSuffix: true,
    }
  );
  const toast = useToast();
  const toastIdRef = React.useRef();

  const addToast = (text) => {
    toastIdRef.current = toast({
      title: text,
      status: 'success',
      variant:'top-accent',
    });
  };

  const formatPostTime = PostTime.replace(" giây", "s")
    .replace(" phút", "m")
    .replace(" giờ", "h")
    .replace(" ngày", "d")
    .replace(" tháng", "mo")
    .replace(" năm", "y")
    .replace("dưới", "")
    .replace("khoảng", "")
    .replace(" ", "");
  const [showcomment, setshowcomment] = useState(false);

  const handleCommentToggle = () => {
    CommentService.getAllCommentForPost(post.id, token)
    .then((res) => {
      setcommentlist(res.data);
    })
    .catch((error) => {
      console.error("Error comment list", error);
    });
    setshowcomment(!showcomment);
  };

  const formatDate = (time) => {
    const defaultTime = formatDistanceToNow(time, {
      locale: vi,
      addSuffix: true,
    });
    return defaultTime
      .replace(" giây", "s")
      .replace(" phút", "m")
      .replace(" giờ", "h")
      .replace(" ngày", "d")
      .replace(" tháng", "mo")
      .replace(" năm", "y")
      .replace("khoảng", "")
      .replace("trước", "")
      .replace("dưới", "")
      .replace(" ", "");
  };

  const checkLike = () => {
    // return userlikePost.some((item) => {
    //   return item.phone === context.user.phone;
    // });
  };
  const checkSaved = () => {
    // return checkSavePost.some((item) => {
    //   return item.id === post.id;
    // });
  };
  const handleSavePost = (e) => {
    e.preventDefault();
    const isSaved = checkSaved();
    if (isSaved) {
      addToast('UnSaved');
    } else {
      addToast('Saved');
    }
    SavedService.CreateSavedPost(post.id, token)
      .then((res) => {
        setload(!load);
        handleLoad();
      })
      .catch((error) => {
        console.error("Error Save Post", error);
      });
  };
  const handleChange = (e) => {
    setcomment({
      ...comment,
      [e.target.name]: e.target.value,
      postId: post.id,
    });
  };
  const handleSubmitComment = (e) => {
    e.preventDefault();
    CommentService.createComment(comment, token)
      .then((res) => {
        setcomment({ content: "", imageUrl: "", postId: 0 });
        setload(!load);
      })
      .catch((error) => {
        console.error("Error Comment Like", error);
        console.log(comment);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    LikeService.addLike(post.id, token)
      .then((res) => {
        setload(!load);
      })
      .catch((error) => {
        console.error("Error Add Like", error);
      });
  };
  useEffect(() => {
    LikeService.CountAllLikeForPost(post.id)
      .then((res) => {
        setcountlike(res.data);
      })
      .catch((error) => {
        console.error("Error Like list:", error);
      });

    CommentService.CountAllCommentForPost(post.id)
      .then((res) => {
        setcountcomment(res.data);
      })
      .catch((error) => {
        console.error("Error count comment", error);
      });

    // CommentService.getAllCommentForPost(post.id, token)
    //   .then((res) => {
    //     setcommentlist(res.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error comment list", error);
    //   });
    // SavedService.LoadSavePost(token)
    //   .then((res) => {
    //     setcheckSavePost(res.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching posts:", error);
    //   });
    // listAll(ref(imageDb, `dataImage/${post.imageUrl}`)).then((imgs) => {
    //   const promises = imgs.items.map((val) => getDownloadURL(val));
    //   Promise.all(promises).then((urls) => {
    //     setimgUrls(urls);
    //   });
    // });
  }, [load]);
  return (
    <div className="col-sm-12">
      <div className="card">
        <div className="card-body">
          <div className="post-item">
            <div className="user-post-data pb-1">
              <div className="d-flex justify-content-between">
                <div className="me-2">
                  <img
                    className="rounded-circle avatar-40"
                    src={post.user?.avatar}
                    alt=""
                  />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between flex-wrap">
                    <div className="">
                      <Tippy
                        content={<ToolTipUser post={post} />}
                        placement="bottom"
                        interactive="true"
                        theme="light"
                      >
                        <h5 className="mb-0 d-inline-block avatarToolTip">
                          <Link
                            to={`/user/${post.user?.usname}`}
                            className=""
                            style={{ fontSize: "15px" }}
                          >
                            {post.user?.displayname}
                          </Link>
                        </h5>
                      </Tippy>
                      <p className="ms-1 mb-0 d-inline-block">
                        {formatPostTime}
                      </p>
                    </div>
                    <div className="card-post-toolbar">
                      <div className="dropdown">
                        <span
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          role="button"
                        >
                          <i className="ri-more-fill"></i>
                        </span>
                        <div className="dropdown-menu m-0 p-0">
                          {checkSaved() ? (
                            <Center
                              className="dropdown-item p-1"
                              href=""
                              onClick={handleSavePost}
                            >
                              <Flex
                                justifyContent="center"
                                flexDir="row"
                                alignItems="center"
                              >
                                <h6>UnSaved</h6>
                                <FaSave
                                  style={{
                                    marginLeft: "50px",
                                    fontSize: "20px",
                                  }}
                                />
                              </Flex>
                            </Center>
                          ) : (
                            <Center
                              className="dropdown-item p-2"
                              href=""
                              onClick={handleSavePost}
                            >
                              <Flex
                                justifyContent="center"
                                flexDir="row"
                                alignItems="center"
                              >
                                <h6>Save</h6>
                                <FaSave
                                  style={{
                                    marginLeft: "50px",
                                    fontSize: "20px",
                                  }}
                                />
                              </Flex>
                            </Center>
                          )}
                          {/* <a className="dropdown-item p-3" href="#">
                            <div className="d-flex align-items-top">
                              <i className="ri-close-circle-line h4"></i>
                              <div className="data ms-2">
                                <h6>Hide</h6>
                              </div>
                            </div>
                          </a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div>{post.content}</div>
            </div>
            <div className="image-container">
              {imgUrls.length > 0
                ? imgUrls.map((url, index) => (
                    <img
                      src={url}
                      alt={`post-image-${index}`}
                      className="img-fluid"
                    />
                  ))
                : null}
            </div>
            <div className="comment-area mt-1">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="like-block position-relative d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="like-data">
                      <div className="dropdown">
                        <span>
                          {checkLike() ? (
                            <a href="" onClick={handleSubmit}>
                              <i
                                className="fas fa-heart"
                                style={{ color: "#ff0000" }}
                              ></i>
                            </a>
                          ) : (
                            <a href="" onClick={handleSubmit}>
                              <i
                                className="far fa-heart"
                                aria-hidden="true"
                              ></i>
                            </a>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="total-like-block ms-2 me-3">
                      <div className="dropdown">
                        <span>{countlike}</span>
                        {/* <div className="dropdown-menu">
                          {userlikePost.map((userlikePost) => (
                            <a className="dropdown-item" href="#">
                              {userlikePost.displayname}
                            </a>
                          ))}
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="total-comment-block">
                    <div className="dropdown">
                      <span
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        role="button"
                      >
                        <i class="fa fa-comment"></i>
                        {countcomment}
                      </span>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">
                          Max Emum
                        </a>
                        <a className="dropdown-item" href="#">
                          Bill Yerds
                        </a>
                        <a className="dropdown-item" href="#">
                          Hap E. Birthday
                        </a>
                        <a className="dropdown-item" href="#">
                          Tara Misu
                        </a>
                        <a className="dropdown-item" href="#">
                          Midge Itz
                        </a>
                        <a className="dropdown-item" href="#">
                          Sal Vidge
                        </a>
                        <a className="dropdown-item" href="#">
                          Other
                        </a>
                      </div>
                    </div>
                  </div> */}
                  <div className="d-flex align-items-center">
                    <div className="like-data">
                      <div className="dropdown">
                        <span onClick={() => handleCommentToggle(post.id)}>
                          <i class="far fa-comment"></i>
                        </span>
                      </div>
                    </div>
                    <div className="total-like-block ms-2 me-3">
                      <div className="dropdown">
                        <span>{countcomment}</span>
                        {/* <div className="dropdown-menu">
                          {userlikePost.map((userlikePost) => (
                            <a className="dropdown-item" href="#">
                              {userlikePost.displayname}
                            </a>
                          ))}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showcomment ? (
                <div>
                  <hr />
                  {commentlist.map((cmtList) => (
                    <ul className="post-comments p-0 m-0">
                      <li className="mb-2">
                        <div className="d-flex flex-wrap">
                          <div className="user-img">
                            <img
                              src={cmtList.userAvatar}
                              alt="userimg"
                              className="avatar-35 rounded-circle img-fluid"
                            />
                          </div>
                          <div className="comment-data-block ms-3">
                            <div className="">
                              <h6 className="mb-0 d-inline-block">
                                <a
                                  href="#"
                                  className=""
                                  style={{ fontSize: "15px" }}
                                >
                                  {cmtList.userDisplayname}
                                </a>
                              </h6>
                              <p className="ms-1 mb-0 d-inline-block">
                                {formatDate(cmtList.commentTime)}{" "}
                              </p>
                            </div>
                            <p className="mb-0">{cmtList.content}</p>
                            <div className="d-flex flex-wrap align-items-center comment-activity">
                              <a href="#">
                                <i
                                  className="far fa-heart"
                                  aria-hidden="true"
                                ></i>
                              </a>
                              <a href="#">
                                <i class="far fa-comment"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  ))}
                  <form className="comment-text d-flex align-items-center mt-3">
                    <input
                      type="text"
                      className="form-control rounded"
                      placeholder="Enter Your Comment"
                      name="content"
                      value={comment.content}
                      onChange={handleChange}
                    />
                    {/* <input
                      id="inputfileimage"
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      name="image"
                      value={comment.imageUrl}
                      onChange={handleChange}
                */}
                    <div className="comment-attagement d-flex">
                      <a href="#">
                        {/* <i
                          className="ri-camera-line me-3"
                          onClick={handleFileSelect}
                        ></i> */}
                        <i
                          onClick={handleSubmitComment}
                          className="fa fa-paper-plane me-3"
                        ></i>
                      </a>
                    </div>
                  </form>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
