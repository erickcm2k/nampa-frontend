import React from "react";
import { Box, Text, Button, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Plants from "../Components/Plants";

const PlantsHome = () => {
  return (
    <Container
      minWidth={"70rem"}
      maxWidth={"70rem"}
      display="flex"
      flexDirection="column"
    >
      <Text textAlign="center" fontSize="3xl" fontWeight="bold" py="3">
        Mis plantas
      </Text>
      <Box alignSelf="flex-end" py={3}>
        <Link to="newplant">
          <Button colorScheme="green">Agregar planta</Button>
        </Link>
      </Box>
      <Plants />
    </Container>
  );
};

export default PlantsHome;
