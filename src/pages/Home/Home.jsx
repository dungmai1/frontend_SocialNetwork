import React from "react";
import Topbar from "../../components/Topbar/Topbar.jsx";
import SideBar from "../../components/Sidebar/Sidebar.jsx";
import RightSidebar from "../../components/RightSidebar/RightSidebar.jsx";
import { Outlet } from "react-router-dom";
import { Center, Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex w="100%">
      <Flex w="5%">
        <SideBar />
      </Flex>
      <Flex direction="column" w="95%">
        <Topbar />
        <Flex justify="center" w="95%">
          <div className="contents" style={{ marginTop: "75px",width:"65  %"}}>
            <Outlet />
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}
