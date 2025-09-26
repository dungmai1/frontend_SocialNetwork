import React, { useEffect, useState, useRef } from "react";
import PostService from "../../services/PostService";
import ListPost from "../../components/ListPost/ListPost";
import CreatePost from "../../components/CreatePost/CreatePost";
import Layout from "../../components/Layout/Layout";
import { LoadingFeed } from "../../components/Loading/LoadingComponents";
import { Box, Container, VStack, Text, Center } from "@chakra-ui/react";

export default function NewsFeed({ user }) {
  const [load, setload] = useState(false);
  const [listPost, setListPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  
  const handleLoad = () => {
    setload(!load);
  };

  useEffect(() => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [load]);

  return (
    <Layout>
      <Container maxW="container.md" py={4}>
        <VStack spacing={6} align="stretch">
          <Box>
            <CreatePost handleLoad={handleLoad} user={user} />
          </Box>
          
          {loading ? (
            <LoadingFeed count={5} />
          ) : listPost.length > 0 ? (
            <>
              {listPost.map((post) => (
                <ListPost key={post.id} post={post} handleLoad={handleLoad} />
              ))}
            </>
          ) : (
            <Center py={20}>
              <Text color="gray.500" fontSize="lg">
                No posts yet. Be the first to share something!
              </Text>
            </Center>
          )}
        </VStack>
      </Container>
    </Layout>
  );
}
