import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  useColorModeValue,
  Container,
  Text,
  Spacer,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiHome,
  FiUsers,
  FiMessageCircle,
  FiBell,
  FiSettings,
  FiLogOut,
  FiUser,
  FiBookmark,
  FiMenu,
} from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";

const Navbar = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const NavButton = ({ icon, label, to, badge = null, onClick, isActive = false }) => (
    <Button
      as={to ? Link : "button"}
      to={to}
      onClick={onClick}
      variant="ghost"
      size="md"
      position="relative"
      bg={isActive ? "blue.50" : "transparent"}
      color={isActive ? "blue.600" : "gray.600"}
      _hover={{
        bg: "blue.50",
        color: "blue.600",
        transform: "translateY(-1px)",
      }}
      leftIcon={icon}
      iconSpacing={0}
      px={4}
      transition="all 0.2s"
    >
      {badge && (
        <Badge
          position="absolute"
          top="-1"
          right="-1"
          colorScheme="red"
          borderRadius="full"
          fontSize="xs"
          minW="20px"
          h="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {badge}
        </Badge>
      )}
      <Box display={{ base: "none", md: "block" }} ml={2}>
        {label}
      </Box>
    </Button>
  );

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={1000}
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      shadow="sm"
    >
      <Container maxW="container.xl" px={4}>
        <Flex h={16} alignItems="center" justify="space-between">
          {/* Logo */}
          <HStack spacing={4}>
            <Link to="/">
              <HStack spacing={2}>
                <Box
                  p={2}
                  bg="blue.500"
                  borderRadius="lg"
                  color="white"
                  fontSize="xl"
                >
                  <FaFacebook />
                </Box>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color="blue.600"
                  display={{ base: "none", sm: "block" }}
                >
                  SocialNet
                </Text>
              </HStack>
            </Link>
          </HStack>

          {/* Search Bar */}
          <Box flex={1} maxW="400px" mx={8} display={{ base: "none", md: "block" }}>
            <form onSubmit={handleSearch}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search for friends, posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg="gray.50"
                  border="none"
                  borderRadius="full"
                  _hover={{ bg: "gray.100" }}
                  _focus={{
                    bg: "white",
                    border: "2px solid",
                    borderColor: "blue.400",
                    boxShadow: "lg",
                  }}
                />
              </InputGroup>
            </form>
          </Box>

          {/* Navigation Icons */}
          <HStack spacing={2}>
            <NavButton
              icon={<FiHome />}
              label="Home"
              to="/"
              isActive={window.location.pathname === "/"}
            />
            <NavButton
              icon={<FiUsers />}
              label="Friends"
              to="/friends"
            />
            <NavButton
              icon={<FiMessageCircle />}
              label="Messages"
              to="/message"
              badge={3}
            />
            <NavButton
              icon={<FiBell />}
              label="Notifications"
              badge={5}
            />

            {/* User Menu */}
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                p={1}
                borderRadius="full"
                _hover={{ bg: "gray.100" }}
                _active={{ bg: "gray.200" }}
              >
                <Avatar
                  size="sm"
                  src={context.user?.avatar}
                  name={context.user?.displayname}
                />
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FiUser />} as={Link} to={`/user/${context.user?.usname}`}>
                  Profile
                </MenuItem>
                <MenuItem icon={<FiBookmark />} as={Link} to="/saved">
                  Saved Posts
                </MenuItem>
                <MenuItem icon={<FiSettings />}>
                  Settings
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>

            {/* Mobile Menu */}
            <IconButton
              icon={<FiMenu />}
              variant="ghost"
              display={{ base: "block", md: "none" }}
            />
          </HStack>
        </Flex>

        {/* Mobile Search */}
        <Box pb={4} display={{ base: "block", md: "none" }}>
          <form onSubmit={handleSearch}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search for friends, posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg="gray.50"
                border="none"
                borderRadius="full"
              />
            </InputGroup>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
