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
import { dateFormatter } from "../../utils/dateConversion";
const Plant = (props) => {
  const birthday = dateFormatter(props.plantData.fecha_adquisicion);
  const {
    planta_id,
    nombre,
    descripcion,
    fecha_plantacion,
    fecha_ultimo_cambio_mac,

    area_id,
    alto,
    ancho,

    sustrato,

    usuario_id,
    comentario,
    imagen,
    especie_id,
  } = props.plantData;

  /**
 * 
 *       "planta_id": 3,
      "nombre": "Gardenia",
      "descripcion": "Una nueva planta",
      "fecha_plantacion": "2021-09-06T05:00:00.000Z",
      "fecha_ultimo_cambio_mac": "2021-09-06T05:00:00.000Z",
      "edad": null,
      "area_id": 4,
      "alto": 120,
      "ancho": 100,
      "frecuencia_riego": null,
      "sustrato": "Sustrato 1",
      "salud": null,
      "usuario_id": 4,
      "comentario": "Esta es mi nueva planta",
      "imagen": "https://firebasestorage.googleapis.com/v0/b/nampa-a8d60.appspot.com/o/41641183281610rose.jpeg?alt=media&token=d9c6a074-bd66-425c-8bfc-f30032bcd804",
      "especie_id": 3
    },
 * 
 */

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
        const url = `http://localhost:3001/api/plantas/delete/${planta_id}`;
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
    <Box p={3} backgroundColor="gray.50" borderRadius="1rem" boxShadow="lg">
      <Text
        textAlign="center"
        textTransform="capitalize"
        fontSize="2xl"
        fontWeight="bold"
        color="teal"
      >
        {nombre}
      </Text>
      <Flex flexDirection="column" pt="3">
        <Box
          width="15rem"
          height="15rem"
          borderRadius="50%"
          overflow="hidden"
          margin="0 auto"
          backgroundImage={`url("${imagen}")`}
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
                  <Text textTransform="capitalize">{especie_id}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">Descripción</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{descripcion}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">Fecha de plantación</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">
                    {dateFormatter(fecha_plantacion)}
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">Fecha de último cambio maceta</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">
                    {dateFormatter(fecha_ultimo_cambio_mac)}
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">Área</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{area_id}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">{`Altura (cm)`}</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{alto}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">{`Ancho (cm)`}</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{ancho}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">{`Sustrato`}</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{sustrato}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="bold">Comentario</Text>
                </Td>
                <Td>
                  <Text textTransform="capitalize">{comentario}</Text>
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
        <Text textAlign="center">{comentario}</Text>
      </Box>
      <Flex width="100%" flexDirection="row" justifyContent="space-evenly">
        <Link to={`/editplant/${planta_id}`}>
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
