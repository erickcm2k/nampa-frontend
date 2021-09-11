import React from "react";
import {
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";

const Plant = (props) => {
  const {
    plant_id: plantId,
    especie: specie,
    tipo: kind,
    fecha_adquisicion: birthday,
    ubicacion: location,
    nombre: name,
    alto: height,
    ancho: width,
    frecuencia_riego: irrigationFreq,
    luz_requerida: requiredLight,
    comentario: comment,
    imagen_url: img,
  } = props.plantData;

  const deletePlant = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Eliminar",
      text: "¿Realmente quieres eliminar esta planta?",
      icon: "warning",
      confirmButtonColor: "red",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Sí",
    }).then((option) => {
      if (option.isConfirmed) {
        const url = `http://localhost:3001/api/plants/delete/${plantId}`;
        const token = localStorage.getItem("token") || "";
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(url, {}, config)
          .then((response) => {
            if (response.data.ok) {
              Swal.fire(
                "Eliminada",
                "La planta se eliminó correctamente",
                "success"
              );
              props.getData();
            }
          })
          .catch((error) => {
            console.log(error);
            if (error) {
              Swal.fire(
                "Error",
                "Ha ocurrido un error. Inténtelo nuevamente más tarde",
                "error"
              );
            }
          });
      } else {
        console.log("la pregunta no se eliminó");
      }
    });
  };

  return (
    <Box
      p="5"
      m="2"
      backgroundColor="gray.50"
      borderRadius="10px"
      boxShadow="0 3px 10px rgb(0 0 0 / 0.5)"
    >
      <Text
        textAlign="center"
        textTransform="capitalize"
        fontSize="2xl"
        fontWeight="bold"
        color="teal"
      >
        {name}
      </Text>
      <Flex flexDirection="column" pt="3">
        <Box
          width="15rem"
          height="15rem"
          borderRadius="50%"
          overflow="hidden"
          margin="0 auto"
          backgroundImage={`url("${img}")`}
          backgroundPosition="center"
          backgroundSize="cover"
        ></Box>
        <Flex height="100%" flexDirection="column" py="3" fontSize="md">
          <Table variant="striped" colorScheme="teal" size="sm">
            <Tbody>
              <Tr>
                <Td>
                  <Text fontWeight="bold">Especie</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{specie}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">Tipo</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{kind}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">Fecha de adquisición</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{birthday}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">Ubicación en casa</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{location}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">{`Altura (cm)`}</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{height}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">{`Ancho (cm)`}</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{width}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">{`Frecuencia de riego (días)`}</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{irrigationFreq}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">Luz requerida</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{requiredLight}</Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </Flex>
      <Box py="3" borderTop="1px solid black">
        <Text textAlign="center" fontWeight="bold">
          Comentario
        </Text>
        <Text textAlign="center">{comment}</Text>
      </Box>
      <Flex width="100%" flexDirection="row" justifyContent="space-evenly">
        <Link to={`/editplant/${plantId}`}>
          <Button variant="ghost" colorScheme="blue">
            Editar
          </Button>
        </Link>
        <Button colorScheme="red" onClick={deletePlant}>
          Eliminar
        </Button>
      </Flex>
    </Box>
  );
};

export default Plant;
