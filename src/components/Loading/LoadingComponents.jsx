import React from "react";
import { Box, Skeleton, SkeletonCircle, SkeletonText, VStack, HStack } from "@chakra-ui/react";

const LoadingPost = () => (
  <Box
    bg="white"
    borderRadius="xl"
    boxShadow="sm"
    border="1px"
    borderColor="gray.100"
    p={6}
    mb={4}
  >
    <HStack spacing={3} mb={4}>
      <SkeletonCircle size="12" />
      <VStack align="start" spacing={1}>
        <Skeleton height="16px" width="120px" />
        <Skeleton height="12px" width="80px" />
      </VStack>
    </HStack>
    <SkeletonText mt="4" noOfLines={3} spacing="4" />
    <Skeleton height="200px" width="100%" mt={4} borderRadius="lg" />
    <HStack spacing={6} mt={4}>
      <Skeleton height="24px" width="60px" />
      <Skeleton height="24px" width="80px" />
    </HStack>
  </Box>
);

const LoadingFeed = ({ count = 3 }) => (
  <VStack spacing={6} align="stretch">
    {[...Array(count)].map((_, i) => (
      <LoadingPost key={i} />
    ))}
  </VStack>
);

export { LoadingPost, LoadingFeed };
