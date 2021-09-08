import React from "react";
import { Box, Flex, Spacer, Text, VStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Button } from "@chakra-ui/button";
const Plant = ({
  specie,
  kind,
  birthday,
  location,
  name,
  height,
  width,
  irrigationFreq,
  requiredLight,
  comment,
  img,
  userId,
}) => {
  return (
    <Box
      width="500px"
      height="500px"
      p="5"
      m="2"
      backgroundColor="gray.100"
      borderRadius="10px"
    >
      <Text
        textAlign="center"
        textTransform="capitalize"
        fontSize="xl"
        fontWeight="bold"
      >
        {name}
      </Text>
      <Flex alignItems="center" border="1px solid pink">
        <Flex flexDirection="column" border="1px solid black">
          <Text>{`Especie: ${specie}`}</Text>
          <Text>{`Tipo: ${kind}`}</Text>
          <Text>{`Fecha de nacimiento: ${birthday}`}</Text>
          <Text>{`Ubicación: ${location}`}</Text>
          <Text>{`Alto: ${height} cm`}</Text>
          <Text>{`Ancho: ${width} cm`}</Text>
          <Text>{`Frecuencia de riego: Cada ${irrigationFreq} días`}</Text>
          <Text>{`Luz requerida: ${requiredLight}`}</Text>
          <Text>{`Comentario: ${comment}`}</Text>
        </Flex>
        <Box
          width="80%"
          border="1px solid blue"
          backgroundImage={img}
          backgroundPosition="center"
          height="300px"
        ></Box>
      </Flex>
      <Flex width="100%" flexDirection="row" justifyContent="space-evenly">
        <Button variant="ghost" colorScheme="blue">
          Editar
        </Button>
        <Button colorScheme="red">Eliminar</Button>
      </Flex>
    </Box>
  );
};

export default Plant;
