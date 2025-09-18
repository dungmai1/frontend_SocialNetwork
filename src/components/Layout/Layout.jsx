import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../Topbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import RightSidebar from "../RightSidebar/RightSidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <Box bg="gray.50" minH="100vh">
      {/* Navbar */}
      <Navbar />
      
      <Flex>
        {/* Left Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <Box
          flex={1}
          ml={{ base: 0, lg: "280px" }}
          mr={{ base: 0, xl: "300px" }}
          pt={4}
          minH="calc(100vh - 64px)"
        >
          {children}
        </Box>
        
        {/* Right Sidebar */}
        <RightSidebar />
      </Flex>
    </Box>
  );
};

export default Layout;
