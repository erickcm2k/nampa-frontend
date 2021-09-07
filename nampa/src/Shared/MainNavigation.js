import React from "react";
import { AuthContext } from "../Auth/AuthContext";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";

import logo from "../assets/Logo.png";

const MainNavigation = () => {
  const loginDetails = React.useContext(AuthContext);
  console.log(loginDetails);
  return (
    <Flex
      w="100%"
      h="75px"
      align="center"
      justify="space-between"
      backgroundColor="green.500"
    >
      
        <Image src={logo} width='200px' ></Image>
     

      <Box display={{ base: "none", md: "block" }}>
        {loginDetails.isLoggedIn && (
          <>
            <Button ml="5" variant="ghost" onClick={() => loginDetails.logout}>
              Nombre del perfil
            </Button>
            <Button ml="5" variant="ghost" onClick={() => loginDetails.logout}>
              Cerrar sesión
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default MainNavigation;
