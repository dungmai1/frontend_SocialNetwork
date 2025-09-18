import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Button,
  Divider,
  useColorModeValue,
  Badge,
  Flex,
  Spacer,
  Icon,
  SimpleGrid,
  Image,
  Circle,
} from "@chakra-ui/react";
import {
  FiUsers,
  FiTrendingUp,
  FiCalendar,
  FiMoreHorizontal,
  FiDot,
} from "react-icons/fi";

const RightSidebar = () => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Sample data - replace with real API calls
  const [onlineFriends, setOnlineFriends] = useState([
    { id: 1, name: "Anna Sthesia", avatar: "../assets/images/user/01.jpg", isOnline: true },
    { id: 2, name: "Paul Molive", avatar: "../assets/images/user/02.jpg", isOnline: true },
    { id: 3, name: "Anna Mull", avatar: "../assets/images/user/03.jpg", isOnline: true },
    { id: 4, name: "Paige Turner", avatar: "../assets/images/user/04.jpg", isOnline: false },
    { id: 5, name: "Bob Frapples", avatar: "../assets/images/user/11.jpg", isOnline: true },
    { id: 6, name: "Barb Ackue", avatar: "../assets/images/user/02.jpg", isOnline: true },
    { id: 7, name: "Greta Life", avatar: "../assets/images/user/03.jpg", isOnline: true },
    { id: 8, name: "Ira Membrit", avatar: "../assets/images/user/12.jpg", isOnline: false },
    { id: 9, name: "Pete Sariya", avatar: "../assets/images/user/01.jpg", isOnline: false },
    { id: 10, name: "Monty Carlo", avatar: "../assets/images/user/02.jpg", isOnline: false },
  ]);

  const [trendingTopics, setTrendingTopics] = useState([
    { id: 1, title: "#ReactJS", posts: "12.5k posts", trend: "up" },
    { id: 2, title: "#WebDevelopment", posts: "8.2k posts", trend: "up" },
    { id: 3, title: "#JavaScript", posts: "15.1k posts", trend: "up" },
    { id: 4, title: "#NodeJS", posts: "6.8k posts", trend: "down" },
    { id: 5, title: "#TypeScript", posts: "4.2k posts", trend: "up" },
  ]);

  const [suggestedFriends, setSuggestedFriends] = useState([
    { id: 1, name: "Emily Davis", avatar: "../assets/images/user/05.jpg", mutualFriends: 12 },
    { id: 2, name: "Chris Lee", avatar: "../assets/images/user/06.jpg", mutualFriends: 8 },
    { id: 3, name: "Anna Taylor", avatar: "../assets/images/user/07.jpg", mutualFriends: 15 },
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "Tech Meetup 2024",
      date: "Dec 15",
      time: "7:00 PM",
      attendees: 45,
      image: "../assets/images/page-img/01.jpg"
    },
    {
      id: 2,
      title: "Photography Workshop",
      date: "Dec 18",
      time: "2:00 PM",
      attendees: 28,
      image: "../assets/images/page-img/02.jpg"
    },
  ]);

  const FriendItem = ({ friend }) => (
    <Button
      variant="ghost"
      w="100%"
      justifyContent="flex-start"
      p={2}
      h="auto"
      _hover={{ bg: "gray.50" }}
      borderRadius="lg"
    >
      <HStack spacing={3} w="100%">
        <Box position="relative">
          <Avatar src={friend.avatar} size="sm" />
          {friend.isOnline && (
            <Circle
              size="12px"
              bg="green.400"
              border="2px solid white"
              position="absolute"
              bottom="0"
              right="0"
            />
          )}
        </Box>
        <VStack align="start" spacing={0} flex={1}>
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            {friend.name}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {friend.isOnline ? "Online now" : "Offline"}
          </Text>
        </VStack>
      </HStack>
    </Button>
  );

  const TrendingItem = ({ trend }) => (
    <HStack justify="space-between" w="100%" p={2}>
      <VStack align="start" spacing={0}>
        <Text fontSize="sm" fontWeight="semibold" color="blue.600">
          {trend.title}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {trend.posts}
        </Text>
      </VStack>
      <Icon
        as={FiTrendingUp}
        color={trend.trend === "up" ? "green.500" : "red.500"}
        fontSize="16px"
      />
    </HStack>
  );

  const SuggestedFriendItem = ({ friend }) => (
    <Box
      p={3}
      bg="gray.50"
      borderRadius="lg"
      _hover={{ bg: "gray.100" }}
      transition="all 0.2s"
    >
      <VStack spacing={2}>
        <Avatar src={friend.avatar} size="md" />
        <Text fontSize="sm" fontWeight="semibold" textAlign="center">
          {friend.name}
        </Text>
        <Text fontSize="xs" color="gray.500" textAlign="center">
          {friend.mutualFriends} mutual friends
        </Text>
        <HStack spacing={2} w="100%">
          <Button size="xs" colorScheme="blue" flex={1}>
            Add
          </Button>
          <Button size="xs" variant="ghost" flex={1}>
            Remove
          </Button>
        </HStack>
      </VStack>
    </Box>
  );

  const EventItem = ({ event }) => (
    <HStack spacing={3} p={2} _hover={{ bg: "gray.50" }} borderRadius="lg" cursor="pointer">
      <Image
        src={event.image}
        alt={event.title}
        boxSize="50px"
        borderRadius="lg"
        objectFit="cover"
      />
      <VStack align="start" spacing={0} flex={1}>
        <Text fontSize="sm" fontWeight="semibold" noOfLines={1}>
          {event.title}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {event.date} at {event.time}
        </Text>
        <Text fontSize="xs" color="blue.500">
          {event.attendees} going
        </Text>
      </VStack>
    </HStack>
  );

  return (
    <Box
      position="fixed"
      right={0}
      top={16}
      h="calc(100vh - 64px)"
      w="300px"
      bg={bg}
      borderLeft="1px"
      borderColor={borderColor}
      overflowY="auto"
      p={4}
      display={{ base: "none", xl: "block" }}
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#CBD5E0',
          borderRadius: '24px',
        },
      }}
    >
      <VStack spacing={6} align="stretch">
        {/* Online Friends */}
        <Box>
          <HStack justify="space-between" mb={3}>
            <Text fontSize="md" fontWeight="bold" color="gray.700">
              Online Friends
            </Text>
            <Badge colorScheme="green" borderRadius="full">
              {onlineFriends.filter(f => f.isOnline).length}
            </Badge>
          </HStack>
          <VStack spacing={1} align="stretch" maxH="200px" overflowY="auto">
            {onlineFriends.slice(0, 6).map((friend) => (
              <FriendItem key={friend.id} friend={friend} />
            ))}
          </VStack>
        </Box>

        <Divider />

        {/* Trending Topics */}
        <Box>
          <HStack justify="space-between" mb={3}>
            <Text fontSize="md" fontWeight="bold" color="gray.700">
              Trending
            </Text>
            <Icon as={FiMoreHorizontal} color="gray.400" cursor="pointer" />
          </HStack>
          <VStack spacing={1} align="stretch">
            {trendingTopics.slice(0, 5).map((trend) => (
              <TrendingItem key={trend.id} trend={trend} />
            ))}
          </VStack>
        </Box>

        <Divider />

        {/* Suggested Friends */}
        <Box>
          <HStack justify="space-between" mb={3}>
            <Text fontSize="md" fontWeight="bold" color="gray.700">
              People You May Know
            </Text>
            <Text fontSize="xs" color="blue.500" cursor="pointer">
              See all
            </Text>
          </HStack>
          <SimpleGrid columns={1} spacing={3}>
            {suggestedFriends.slice(0, 2).map((friend) => (
              <SuggestedFriendItem key={friend.id} friend={friend} />
            ))}
          </SimpleGrid>
        </Box>

        <Divider />

        {/* Upcoming Events */}
        <Box>
          <HStack justify="space-between" mb={3}>
            <Text fontSize="md" fontWeight="bold" color="gray.700">
              Upcoming Events
            </Text>
            <Icon as={FiCalendar} color="gray.400" />
          </HStack>
          <VStack spacing={2} align="stretch">
            {upcomingEvents.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </VStack>
          <Button variant="ghost" size="sm" w="100%" mt={2}>
            View all events
          </Button>
        </Box>

        <Divider />

        {/* Quick Links */}
        <Box>
          <Text fontSize="md" fontWeight="bold" color="gray.700" mb={3}>
            Quick Links
          </Text>
          <VStack spacing={2} align="stretch">
            <Button variant="ghost" justifyContent="flex-start" size="sm">
              Privacy Policy
            </Button>
            <Button variant="ghost" justifyContent="flex-start" size="sm">
              Terms of Service
            </Button>
            <Button variant="ghost" justifyContent="flex-start" size="sm">
              Help Center
            </Button>
            <Button variant="ghost" justifyContent="flex-start" size="sm">
              Report a Problem
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default RightSidebar;
