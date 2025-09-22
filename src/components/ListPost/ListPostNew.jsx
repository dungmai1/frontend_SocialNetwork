import React, { useEffect, useState, useContext, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import LikeService from "../../services/LikeService";
import CommentService from "../../services/CommentService";
import { vi } from "date-fns/locale";
import { jwtDecode } from "jwt-decode";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { imageDb } from "../../firebase/config";
import SavedService from "../../services/SavedService";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react";
import ToolTipUser from "../ToolTipUser/ToolTipUser";
import "tippy.js/themes/light.css";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
  useColorModeValue,
  useToast,
  Badge,
  Skeleton,
} from "@chakra-ui/react";
import {
  FiHeart,
  FiMessageCircle,
  FiBookmark,
  FiMoreHorizontal,
  FiSend,
} from "react-icons/fi";
import { FaHeart, FaBookmark } from "react-icons/fa";

export default function ListPost({ post, handleLoad }) {
  const token = localStorage.getItem("accessToken");
  const context = useContext(UserContext);
  const [countlike, setcountlike] = useState(0);
  const [comment, setcomment] = useState({
    content_cmt: "",
    imageUrl: "",
    postId: 0,
  });
  const [countcomment, setcountcomment] = useState(0);
  const [userlikePost, setuserlikePost] = useState([]);
  const [commentlist, setcommentlist] = useState([]);
  const [imgUrls, setimgUrls] = useState([]);
  const [checkSavePost, setcheckSavePost] = useState([]);
  const [load, setload] = useState(false);
  const [showcomment, setshowcomment] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  const PostTime = formatDistanceToNow(
    post.postTime,
    { locale: vi },
    { addSuffix: true }
  );

  const formatPostTime = PostTime.replace(" giây", "s")
    .replace(" phút", "m")
    .replace(" giờ", "h")
    .replace(" ngày", "d")
    .replace(" tháng", "mo")
    .replace(" năm", "y")
    .replace("dưới", "")
    .replace("khoảng", "")
    .replace(" ", "");

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
    return userlikePost.some((item) => {
      return item.phone === context.user.phone;
    });
  };

  const checkSaved = () => {
    // return checkSavePost.some((item) => {
    //   return item.id === post.id;
    // });
  };

  const handleSavePost = (e) => {
    e.preventDefault();
    const isSaved = checkSaved();
    
    toast({
      title: isSaved ? "Post unsaved" : "Post saved",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    SavedService.CreateSavedPost(post.id, token)
      .then((res) => {
        setload(!load);
        if (handleLoad) handleLoad();
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
    if (!comment.content_cmt.trim()) return;

    CommentService.createComment(comment, token)
      .then((res) => {
        setcomment({ content_cmt: "", imageUrl: "", postId: 0 });
        setload(!load);
        toast({
          title: "Comment posted",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error Comment Like", error);
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

  const handleCommentToggle = () => {
    setshowcomment(!showcomment);
  };

  useEffect(() => {
    // Load likes
    LikeService.AllUserLikePost(post.id)
      .then((res) => {
        setuserlikePost(res.data);
      })
      .catch((error) => {
        console.error("Error All User Like Post", error);
      });

    LikeService.CountAllLikeForPost(post.id)
      .then((res) => {
        setcountlike(res.data);
      })
      .catch((error) => {
        console.error("Error Like list:", error);
      });

    // Load comments
    CommentService.CountAllCommentForPost(post.id)
      .then((res) => {
        setcountcomment(res.data);
      })
      .catch((error) => {
        console.error("Error count comment", error);
      });

    CommentService.getAllCommentForPost(post.id, token)
      .then((res) => {
        setcommentlist(res.data);
      })
      .catch((error) => {
        console.error("Error comment list", error);
      });

    // Load saved posts
    SavedService.LoadSavePost(token)
      .then((res) => {
        setcheckSavePost(res.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    // Load images
    if (post.imageUrl) {
      setImgLoading(true);
      listAll(ref(imageDb, `dataImage/${post.imageUrl}`))
        .then((imgs) => {
          const promises = imgs.items.map((val) => getDownloadURL(val));
          Promise.all(promises).then((urls) => {
            setimgUrls(urls);
            setImgLoading(false);
          });
        })
        .catch(() => {
          setImgLoading(false);
        });
    }
  }, [load, post.id, post.imageUrl, token]);

  return (
    <Box
      bg={bg}
      borderRadius="xl"
      boxShadow="sm"
      border="1px"
      borderColor={borderColor}
      overflow="hidden"
      _hover={{ boxShadow: "md" }}
      transition="all 0.2s"
    >
      {/* Post Header */}
      <Flex p={4} align="center">
        <Avatar
          src={post.user?.avatar}
          size="md"
          mr={3}
        />
        <VStack align="start" spacing={0}>
          <Tippy
            content={<ToolTipUser post={post} />}
            placement="bottom"
            interactive="true"
            theme="light"
          >
            <Text fontWeight="semibold" fontSize="md">
              <Link
                to={`/user/${post.user?.usname}`}
                style={{ textDecoration: "none" }}
              >
                {post.user?.displayname}
              </Link>
            </Text>
          </Tippy>
          <Text fontSize="sm" color="gray.500">
            {formatPostTime}
          </Text>
        </VStack>
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<Icon as={FiMoreHorizontal} />}
            variant="ghost"
            size="sm"
          />
          <MenuList>
            <MenuItem
              icon={checkSaved() ? <FaBookmark /> : <FiBookmark />}
              onClick={handleSavePost}
            >
              {checkSaved() ? "Unsave" : "Save"}
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Post Content */}
      {post.content && (
        <Box px={4} pb={3}>
          <Text fontSize="md" lineHeight="tall">
            {post.content}
          </Text>
        </Box>
      )}

      {/* Post Images */}
      {imgUrls.length > 0 && (
        <Box>
          {imgLoading ? (
            <Skeleton height="300px" />
          ) : (
            <SimpleGrid
              columns={imgUrls.length === 1 ? 1 : 2}
              spacing={1}
              maxH="500px"
            >
              {imgUrls.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`post-image-${index}`}
                  objectFit="cover"
                  w="100%"
                  h={imgUrls.length === 1 ? "auto" : "250px"}
                  maxH="500px"
                />
              ))}
            </SimpleGrid>
          )}
        </Box>
      )}

      {/* Post Actions */}
      <Box p={4}>
        <HStack justify="space-between" mb={3}>
          <HStack spacing={4}>
            <Button
              variant="ghost"
              leftIcon={
                checkLike() ? (
                  <Icon as={FaHeart} color="red.500" />
                ) : (
                  <Icon as={FiHeart} />
                )
              }
              onClick={handleSubmit}
              size="sm"
            >
              {countlike}
            </Button>
            <Button
              variant="ghost"
              leftIcon={<Icon as={FiMessageCircle} />}
              onClick={handleCommentToggle}
              size="sm"
            >
              {countcomment}
            </Button>
          </HStack>
        </HStack>

        {/* Comments Section */}
        <Collapse in={showcomment}>
          <Divider mb={4} />
          <VStack spacing={3} align="stretch">
            {/* Comment Input */}
            <InputGroup>
              <Input
                placeholder="Write a comment..."
                name="content_cmt"
                value={comment.content_cmt}
                onChange={handleChange}
                borderRadius="full"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitComment(e);
                  }
                }}
              />
              <InputRightElement>
                <IconButton
                  icon={<Icon as={FiSend} />}
                  size="sm"
                  variant="ghost"
                  onClick={handleSubmitComment}
                  colorScheme="blue"
                />
              </InputRightElement>
            </InputGroup>

            {/* Comments List */}
            {commentlist.map((cmtList) => (
              <Flex key={cmtList.id} gap={3}>
                <Avatar
                  src={cmtList.user?.avatar}
                  size="sm"
                />
                <Box
                  bg="gray.50"
                  borderRadius="lg"
                  px={3}
                  py={2}
                  flex="1"
                >
                  <HStack spacing={2} align="baseline">
                    <Text fontWeight="semibold" fontSize="sm">
                      {cmtList.user?.displayname}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {formatDate(cmtList.commentTime)}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" mt={1}>
                    {cmtList.content_cmt}
                  </Text>
                </Box>
              </Flex>
            ))}
          </VStack>
        </Collapse>
      </Box>
    </Box>
  );
}
