import React from "react";
import { AuthContext } from "../Auth/AuthContext";
import { HStack, Button, Flex, Text, Image, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import logo from "../assets/Logo.png";

const MainNavigation = () => {
  const loginDetails = React.useContext(AuthContext);

  return (
    <Flex
      w="100%"
      h="70px"
      align="center"
      justify="space-between"
      backgroundColor="green.50"
      boxShadow="md"
    >
      <Image src={logo} width="180px"></Image>

      {loginDetails.auth.logged && (
        <HStack mr="4">
          <Text fontSize="md" fontWeight="bold">
            {loginDetails.auth.name}
          </Text>
          <Button ml="5" variant="ghost" onClick={loginDetails.logout}>
            Cerrar sesión
          </Button>
        </HStack>
      )}
    </Flex>
  );
};

export default MainNavigation;
