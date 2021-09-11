import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import Plants from "../Components/Plants";

const PlantsHome = () => {
  return (
    <Box maxWidth="1300px" width="70%" margin="0 auto" mb="5">
      <Text textAlign="center" fontSize="3xl" fontWeight="bold" py="3">
        Mis plantas
      </Text>
      <Plants />
    </Box>
  );
};

export default PlantsHome;
