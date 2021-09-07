import React from "react";
import { AuthContext } from "../Auth/AuthContext";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

const MainNavigation = () => {
  const loginDetails = React.useContext(AuthContext);
  console.log(loginDetails);
  return (
    <Flex
      w="100%"
      h="75px"
      align="center"
      justify="space-between"
      backgroundColor="teal.500"
    >
      <Text ml="10px" fontWeight="bold" fontSize="1.8rem">
        Nampa
      </Text>

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
