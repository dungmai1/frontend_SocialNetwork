import React, { useEffect, useState, useRef, useContext } from "react";
import PostService from "../../services/PostService";
import ListPost from "../../components/ListPost/ListPost";
import CreatePost from "../../components/CreatePost/CreatePost";
import UserService from "../../services/UserService";
import { useParams } from "react-router-dom";
import RelationshipService from "../../services/RelationshipService";
import { UserContext } from "../../context/UserContext";
import ListUser from "../../components/ListUser/ListUser";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Flex,
  Image,
  useToast,
} from "@chakra-ui/react";
import "./Profile.css";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { imageDb } from "../../firebase/config";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";

function Profile() {
  const [listPost, setListPost] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const token = localStorage.getItem("accessToken");
  const [account, setaccount] = useState("");
  const [listFollowing, setlistFollowing] = useState([]);
  const [listFollowers, setlistFollowers] = useState([]);
  const { username } = useParams();
  const [checkfollow, setcheckfollow] = useState();
  const [imageSrc, setImageSrc] = useState(null);
  const [updateProfile, setupdateProfile] = useState({
    avatar: "",
    displayname: "",
  });
  const toast = useToast();
  const toastIdRef = React.useRef();


  const addToast = (text) => {
    toastIdRef.current = toast({
      title: text,
      success:'success',
      position: "top-right",
      variant: "top-accent",
      isClosable: true,
    });
  };
  const context = useContext(UserContext);
  const handleHideFollow = () => {
    return context.user ? context.user.usname === username : false;
  };

  const [load, setload] = useState(false);

  const handleFollow = (e) => {
    e.preventDefault();
    RelationshipService.AddFollow(token, username)
      .then((res) => {
        setload(!load);
      })
      .catch((error) => {
        setload(!load);
        console.error("Error Follow", error);
      });
  };
  const handleUploadImage = () => {
    document.getElementById("upload_image").click();
  };
  const handleSaveChange = async (e) => {
    e.preventDefault();
    const imgRef = ref(imageDb, `avatar/${v4()}`);
    await uploadBytesResumable(imgRef, updateProfile.avatar);
    const downloadURL = await getDownloadURL(imgRef);
    console.log(downloadURL);
    UserService.updateUser(token, downloadURL)
      .then((res) => {
        window.location.reload();
        addToast("Change Avatar Success");
      })
      .catch((err) => {
        console.error("error update user", err);
      });
  };
  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    setupdateProfile({ avatar: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await setImageSrc(reader.result);
        console.log("file", file);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChangeProfile = (e) => {
    setupdateProfile({ ...updateProfile, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    PostService.GetAllPostByUsername(username)
      .then((res) => {
        const sortedPosts = res.data.sort((a, b) => {
          return new Date(b.postTime) - new Date(a.postTime);
        });
        setListPost(sortedPosts);
        setPostCount(res.data.length);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
    UserService.getUserByUserName(username)
      .then((res) => {
        setaccount(res.data);
      })
      .catch((error) => {
        console.error("Error get User", error);
      });

    RelationshipService.Following(username)
      .then((res) => {
        setlistFollowing(res.data);
      })
      .catch((error) => {
        console.error("Error Follow of user", error);
      });

    RelationshipService.Followers(username)
      .then((res) => {
        setlistFollowers(res.data);
      })
      .catch((error) => {
        console.error("Error Follow of user", error);
      });
    RelationshipService.CheckFollow(token, username)
      .then((res) => {
        setcheckfollow(res.data);
      })
      .catch((error) => {
        console.error("Error check follow", error);
      });
  }, [username, load]);
  return (
    <div id="content-page" className="content-page">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body profile-page p-0">
                <div className="profile-header">
                  <div className="position-relative">
                    <img
                      src="../assets/images/page-img/profile-bg1.jpg"
                      alt="profile-bg"
                      className="rounded img-fluid"
                    />
                  </div>
                  <div className="user-detail text-center mb-3 profile-user">
                    <Box>
                      <Flex direction="column" align="center">
                        <Box>
                          <Avatar src={account.avatar} size="2xl" />
                        </Box>
                      </Flex>
                    </Box>
                    <div className="profile-detail">
                      <h3 className="">{account.displayname}</h3>
                    </div>
                  </div>
                  <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
                    <div className="social-info">
                      <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                        <li className="text-center ps-3">
                          <h6>Posts</h6>
                          <p className="mb-0">{postCount}</p>
                        </li>
                        <a
                          href=""
                          data-bs-toggle="modal"
                          data-bs-target="#followersmodal"
                        >
                          <li className="text-center ps-3">
                            <h6>Followers</h6>
                            <p className="mb-0" style={{ color: "#777D74" }}>
                              {listFollowers.length}
                            </p>
                          </li>
                        </a>
                        <div
                          class="modal fade"
                          id="followersmodal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                  Followers
                                </h5>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <form>
                                {listFollowers.map((user) => (
                                  <ListUser
                                    key={user.id}
                                    user={user}
                                    load={load}
                                    setload={setload}
                                  />
                                ))}{" "}
                              </form>
                            </div>
                          </div>
                        </div>
                        <a
                          href=""
                          data-bs-toggle="modal"
                          data-bs-target="#followinggmodal"
                        >
                          <li className="text-center ps-3">
                            <h6>Following</h6>
                            <p className="mb-0" style={{ color: "#777D74" }}>
                              {listFollowing.length}
                            </p>
                          </li>
                        </a>
                        <div
                          class="modal fade"
                          id="followinggmodal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                  Following
                                </h5>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <form>
                                {listFollowing.map((user) => (
                                  <ListUser
                                    key={user.id}
                                    user={user}
                                    load={load}
                                    setload={setload}
                                  />
                                ))}{" "}
                              </form>
                            </div>
                          </div>
                        </div>
                      </ul>
                    </div>
                    <div class="social-links">
                      <ul class="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                        {handleHideFollow() ? (
                          <>
                            <li className="text-center ms-auto">
                              <a
                                href=""
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                <i class="fa fa-cog" aria-hidden="true"></i>
                              </a>
                            </li>
                            <div
                              class="modal fade"
                              id="exampleModal"
                              tabindex="-1"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5
                                      class="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Edit Profile
                                    </h5>
                                    <button
                                      id="buttonExitUpdateAvatar"
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <form>
                                    <div class="modal-body p-2">
                                      <div class="form-group">
                                        <label class="form-label">
                                          DisplayName:
                                        </label>
                                        <input
                                          disabled
                                          type="displayname"
                                          class="form-control"
                                          name="displayname"
                                          placeholder="Display Name"
                                          value={account.displayname}
                                          // onChange={handleChangeProfile}
                                        />
                                        <Center p={4}>
                                          <Box>
                                            <Flex
                                              direction="column"
                                              align="center"
                                            >
                                              <Box
                                                border="2px"
                                                borderColor="gray.200"
                                              >
                                                <Avatar
                                                  src={
                                                    imageSrc
                                                      ? imageSrc
                                                      : account.avatar
                                                  }
                                                  size="2xl"
                                                />
                                              </Box>
                                              <input
                                                type="file"
                                                id="upload_image"
                                                style={{ display: "none" }}
                                                accept="image/*"
                                                name="image"
                                                onChange={handleChangeImage}
                                              />
                                              <Button
                                                colorScheme="blue"
                                                size="xs"
                                                mt={2}
                                                onClick={handleUploadImage}
                                              >
                                                Change Avatar
                                              </Button>
                                            </Flex>
                                          </Box>
                                        </Center>
                                      </div>
                                    </div>
                                  </form>
                                  <div class="modal-footer">
                                    <Button
                                      colorScheme="teal"
                                      variant="outline"
                                    >
                                      Close
                                    </Button>
                                    <Button
                                      colorScheme="teal"
                                      onClick={handleSaveChange}
                                    >
                                      Save changes
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <li className="text-center pe-3">
                              {checkfollow ? (
                                <button
                                  type="button"
                                  className="btn mb-1 btn-primary"
                                  onClick={handleFollow}
                                >
                                  <i className="fas fa-user-plus me-1"></i>
                                  Follow
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn mb-1 btn-primary"
                                  onClick={handleFollow}
                                >
                                  Following
                                </button>
                              )}
                            </li>
                            <li className="text-center pe-3">
                              <button
                                type="button"
                                className="btn mb-1 btn-secondary"
                              >
                                <i className="fa fa-envelope me-1"></i>Chat
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="timeline"
                role="tabpanel"
              >
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-8 mx-auto">
                      {handleHideFollow() ? <CreatePost /> : <></>}

                      {listPost.map((post) => (
                        <ListPost key={post.id} post={post} />
                      ))}
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-sm-12 text-center">
            <img
              src="../assets/images/page-img/page-load-loader.gif"
              alt="loader"
              style={{ height: "100px" }}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default Profile;
