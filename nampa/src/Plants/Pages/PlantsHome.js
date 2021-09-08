import React from "react";
import { Box, Text, Container, Flex } from "@chakra-ui/layout";
import Plants from "../Components/Plants";
import UI05 from '../../assets/UI04.jpg'
const PlantsHome = () => {
  return (
    <Box maxWidth='1600px' backgroundImage={UI05} backgroundSize='cover'>
      <Text textAlign="center" fontSize="2xl" fontWeight="bold">
        Mis plantas
      </Text>
      <Plants />
    </Box>
  );
};

export default PlantsHome;
