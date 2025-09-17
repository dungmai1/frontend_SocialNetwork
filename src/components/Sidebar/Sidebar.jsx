import React, { useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
} from "react-icons/fi";
import { IoPawOutline } from "react-icons/io5";
import NavItem from "../NavItem/NavItem";
import { FaHome, FaSearch, FaUser } from "react-icons/fa";
import { TbCameraSearch } from "react-icons/tb";

export default function Sidebar() {
  const username = localStorage.getItem("username");
  return (
    <Flex
      pos="sticky"
      left="0"
      h="90vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius="15px"
      w="75px"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Flex p="5%" flexDir="column" w="100%" as="nav" alignItems="center">
        <NavItem navSize="small" icon={FaHome} to="/" />
        <NavItem navSize="small" icon={FaUser} to={`/user/${username}`} />
        <NavItem navSize="small" icon={TbCameraSearch} to="/search" />
        <NavItem navSize="small" icon={FaSearch} to="/searchUser" />
      </Flex>
    </Flex>
  );
}
