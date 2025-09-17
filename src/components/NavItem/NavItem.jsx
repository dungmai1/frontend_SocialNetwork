import React from "react";
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { NavLink, Navigate } from "react-router-dom";

export default function NavItem({ icon, to, active }) {
  return (
    <NavLink to={to}>
      <Flex
        mt={30}
        flexDir="column"
        w="100%"
      >
        <Menu placement="right">
          <Flex
            backgroundColor={active && "#AEC8CA"}
            p={3}
            borderRadius={8}
            _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          >
            <MenuButton w="100%">
              <Flex>
                <Icon
                  as={icon}
                  fontSize="xl"
                  color={active ? "#82AAAD" : "gray.500"}
                />
              </Flex>
            </MenuButton>
          </Flex>
          <MenuList py={0} border="none" w={200} h={200} ml={5}></MenuList>
        </Menu>
      </Flex>
    </NavLink>
  );
}
