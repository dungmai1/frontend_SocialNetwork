import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import PostService from "../../services/PostService";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { imageDb } from "../../firebase/config";
import { UserContext } from "../../context/UserContext";
import Yolov8 from "../../services/Yolov8";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
  SimpleGrid,
  Image,
  CloseButton,
  Divider
} from "@chakra-ui/react";
import { FiCamera, FiImage, FiX } from "react-icons/fi";
import { BiSend } from "react-icons/bi";

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
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  
  const context = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setcreatePost({ ...createPost, [e.target.name]: e.target.value });
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
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
      
      const update_extractvector = {
        ...extract_vector,
        image_path: folderId,
      };
      
      await Yolov8.ExtractVector(update_extractvector);
      await PostService.createPost(updatedPost, token);
      
      toast({
        title: "Post created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      setcreatePost({ imageUrl: "", content: "" });
      setImg([]);
      setImagePreview([]);
      onClose();
      handleLoad();
    } catch (error) {
      console.error("Error Create Post", error);
      toast({
        title: "Error creating post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    setImg(files);
    
    // Create preview URLs
    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setImagePreview(previews);
  };

  const removeImage = (index) => {
    const updatedImages = Img.filter((_, i) => i !== index);
    const updatedPreviews = imagePreview.filter((_, i) => i !== index);
    
    setImg(updatedImages);
    setImagePreview(updatedPreviews);
  };

  return (
    <>
      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="sm"
        border="1px"
        borderColor="gray.100"
        p={6}
        _hover={{ boxShadow: "md" }}
        transition="all 0.2s"
      >
        <Flex align="center" gap={3}>
          <Avatar
            src={context.user ? context.user.avatar : ""}
            alt="userimg"
            size="md"
          />
          <Input
            placeholder="What's on your mind?"
            bg="gray.50"
            border="none"
            borderRadius="full"
            py={3}
            px={4}
            fontSize="md"
            cursor="pointer"
            onClick={onOpen}
            _hover={{ bg: "gray.100" }}
            _focus={{ bg: "gray.100" }}
            readOnly
          />
        </Flex>
        
        <Divider my={4} />
        
        <HStack justify="space-around">
          <Button
            variant="ghost"
            leftIcon={<Icon as={FiCamera} />}
            colorScheme="blue"
            onClick={onOpen}
            size="sm"
          >
            Photo/Video
          </Button>
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Flex align="center" gap={3}>
                <Avatar
                  src={context.user ? context.user.avatar : ""}
                  alt="userimg"
                  size="md"
                />
                <Text fontWeight="semibold">
                  {context.user ? context.user.displayname : "User"}
                </Text>
              </Flex>
              
              <Textarea
                placeholder="What's on your mind?"
                name="content"
                value={createPost.content}
                onChange={handleChange}
                border="none"
                resize="none"
                fontSize="lg"
                minH="100px"
                _focus={{ border: "none", boxShadow: "none" }}
              />
              
              {imagePreview.length > 0 && (
                <Box>
                  <SimpleGrid columns={2} spacing={4}>
                    {imagePreview.map((image, index) => (
                      <Box key={index} position="relative">
                        <Image
                          src={image.url}
                          alt={`preview-${index}`}
                          borderRadius="lg"
                          objectFit="cover"
                          height="200px"
                          width="100%"
                        />
                        <CloseButton
                          position="absolute"
                          top="2"
                          right="2"
                          bg="white"
                          size="sm"
                          onClick={() => removeImage(index)}
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              )}
              
              <Box
                border="2px dashed"
                borderColor="gray.200"
                borderRadius="lg"
                p={6}
                textAlign="center"
                cursor="pointer"
                onClick={handleFileSelect}
                _hover={{ borderColor: "blue.400", bg: "blue.50" }}
                transition="all 0.2s"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileInputChange}
                  multiple
                />
                <VStack spacing={2}>
                  <Icon as={FiImage} fontSize="2xl" color="gray.400" />
                  <Text color="gray.500">Click to add photos</Text>
                </VStack>
              </Box>
              
              <Button
                colorScheme="blue"
                size="lg"
                leftIcon={<BiSend />}
                onClick={handleButtonClick}
                isLoading={isLoading}
                loadingText="Posting..."
                disabled={!createPost.content.trim() && Img.length === 0}
              >
                Post
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
