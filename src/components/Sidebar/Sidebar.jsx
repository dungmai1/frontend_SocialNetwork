import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Button,
  Divider,
  Icon,
  useColorModeValue,
  Badge,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import {
  FiHome,
  FiUser,
  FiUsers,
  FiBookmark,
  FiTrendingUp,
  FiCalendar,
  FiShoppingBag,
  FiVideo,
  FiSettings,
  FiHelpCircle,
  FiChevronDown,
  FiStar,
  FiHeart,
} from "react-icons/fi";
import { FaHome, FaSearch, FaUser } from "react-icons/fa";
import { TbCameraSearch } from "react-icons/tb";

const Sidebar = () => {
  const context = useContext(UserContext);
  const location = useLocation();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const username = localStorage.getItem("username");

  const SidebarItem = ({ icon, label, to, badge = null, isActive = false }) => (
    <Button
      as={Link}
      to={to}
      variant="ghost"
      w="100%"
      justifyContent="flex-start"
      p={4}
      h="auto"
      bg={isActive ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "transparent"}
      color={isActive ? "white" : "gray.700"}
      _hover={{
        bgGradient: "linear(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
        color: "purple.600",
        transform: "translateX(8px) scale(1.02)",
        boxShadow: "lg",
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      position="relative"
      borderRadius="xl"
      border="2px solid transparent"
      bgClip={isActive ? "border-box" : "padding-box"}
      _before={isActive ? {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "xl",
        padding: "2px",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "exclude",
        zIndex: -1,
      } : {}}
    >
      <HStack spacing={3} w="100%">
        <Icon as={icon} fontSize="20px" />
        <Text fontSize="sm" fontWeight="medium">
          {label}
        </Text>
        <Spacer />
        {badge && (
          <Badge colorScheme="red" borderRadius="full" fontSize="xs">
            {badge}
          </Badge>
        )}
      </HStack>
    </Button>
  );

  const sidebarItems = [
    {
      icon: FaHome,
      label: "News Feed",
      to: "/",
      isActive: location.pathname === "/",
    },
    {
      icon: FaUser,
      label: "My Profile",
      to: `/user/${username}`,
      isActive: location.pathname.includes("/user/"),
    },
    {
      icon: FiUsers,
      label: "Friends",
      to: "/friends",
      badge: 12,
    },
    {
      icon: FiBookmark,
      label: "Saved Posts",
      to: "/saved",
      isActive: location.pathname === "/saved",
    },
    {
      icon: TbCameraSearch,
      label: "Search Posts",
      to: "/search",
      isActive: location.pathname === "/search",
    },
    {
      icon: FaSearch,
      label: "Search Users",
      to: "/searchUser",
      isActive: location.pathname === "/searchUser",
    },
    {
      icon: FiHeart,
      label: "Following",
      to: "/postfollowing",
      isActive: location.pathname === "/postfollowing",
    },
  ];

  const exploreItems = [
    {
      icon: FiVideo,
      label: "Videos",
      to: "/videos",
    },
    {
      icon: FiCalendar,
      label: "Events",
      to: "/events",
      badge: 3,
    },
    {
      icon: FiShoppingBag,
      label: "Marketplace",
      to: "/marketplace",
    },
  ];

  const shortcuts = [
    { name: "Photography Group", avatar: "/api/placeholder/32/32", members: "12.5K" },
    { name: "Tech Enthusiasts", avatar: "/api/placeholder/32/32", members: "8.2K" },
    { name: "Travel Buddies", avatar: "/api/placeholder/32/32", members: "5.1K" },
  ];

  return (
    <Box
      position="fixed"
      left={0}
      top={16}
      h="calc(100vh - 64px)"
      w="300px"
      bgGradient="linear(to-br, white, blue.50, purple.50)"
      borderRight="3px solid"
      borderImage="linear-gradient(45deg, #667eea 0%, #764ba2 100%) 1"
      borderColor="transparent"
      overflowY="auto"
      p={6}
      display={{ base: "none", lg: "block" }}
      boxShadow="xl"
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          borderRadius: '24px',
        },
      }}
    >
      <VStack spacing={4} align="stretch">
        {/* User Profile Section */}
        <Box
          p={4}
          bg="gradient-to-r from-blue-50 to-purple-50"
          borderRadius="xl"
          border="1px"
          borderColor="blue.100"
        >
          <HStack spacing={3}>
            <Avatar
              src={context.user?.avatar}
              name={context.user?.displayname}
              size="md"
              border="2px solid"
              borderColor="blue.300"
            />
            <VStack align="start" spacing={0}>
              <Text fontWeight="semibold" fontSize="md" color="gray.800">
                {context.user?.displayname || "User"}
              </Text>
              <Text fontSize="sm" color="gray.600">
                @{context.user?.usname || username}
              </Text>
            </VStack>
          </HStack>
        </Box>

        {/* Main Navigation */}
        <VStack spacing={2} align="stretch">
          <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" px={3}>
            Main
          </Text>
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </VStack>

        <Divider />

        {/* Explore Section */}
        <VStack spacing={2} align="stretch">
          <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" px={3}>
            Explore
          </Text>
          {exploreItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </VStack>

        <Divider />

        {/* Your Shortcuts */}
        <VStack spacing={2} align="stretch">
          <HStack justify="space-between" px={3}>
            <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase">
              Your Shortcuts
            </Text>
            <Icon as={FiChevronDown} color="gray.400" fontSize="sm" />
          </HStack>
          
          {shortcuts.map((shortcut, index) => (
            <Button
              key={index}
              variant="ghost"
              w="100%"
              justifyContent="flex-start"
              p={3}
              h="auto"
              _hover={{ bg: "gray.50" }}
              borderRadius="lg"
            >
              <HStack spacing={3} w="100%">
                <Avatar src={shortcut.avatar} size="xs" />
                <VStack align="start" spacing={0} flex={1}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">
                    {shortcut.name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {shortcut.members} members
                  </Text>
                </VStack>
              </HStack>
            </Button>
          ))}
        </VStack>

        <Divider />

        {/* Settings */}
        <VStack spacing={2} align="stretch">
          <SidebarItem icon={FiSettings} label="Settings" to="/settings" />
          <SidebarItem icon={FiHelpCircle} label="Help & Support" to="/help" />
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
