import { Button } from "@chakra-ui/button";
import { Box, Grid, Stack, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Plant from "./Plant";
import axios from "axios";
import Swal from "sweetalert2";
import { Image } from "@chakra-ui/image";

import newPlant from "../../assets/new_plant.svg";

// const data = [
//   {
//     plant_id: "1",
//     especie: "orquidea",
//     tipo: "tipo1",
//     fecha_adquisicion: "20/05/2021",
//     ubicacion: "maceta",
//     nombre: "Una orquídea",
//     alto: "20",
//     ancho: "10",
//     frecuencia_riego: "3",
//     luz_requerida: "mucha",
//     comentario: "Es una orquidea muy bonita y resistente",
//     imagen_url:
//       "https://images.unsplash.com/photo-1605996370592-b6f7a81e382e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
//     user_id: "12345",
//   },
//   {
//     plant_id: "2",
//     especie: "nenufar",
//     tipo: "acuatica",
//     fecha_adquisicion: "20/05/2021",
//     ubicacion: "cubeta",
//     nombre: "Nenufara",
//     alto: "5",
//     ancho: "15",
//     frecuencia_riego: "acuatica",
//     luz_requerida: "mucha",
//     comentario: "Una planta que requiere mucho mantenimiento",
//     imagen_url:
//       "https://images.unsplash.com/photo-1524667502507-2a6a970815b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80",
//     user_id: "12345",
//   },
//   {
//     plant_id: "3",
//     especie: "orquidea",
//     tipo: "tipo1",
//     fecha_adquisicion: "20/05/2021",
//     ubicacion: "maceta",
//     nombre: "Planta x",
//     alto: "20",
//     ancho: "10",
//     frecuencia_riego: "3",
//     luz_requerida: "mucha",
//     comentario: "Es una orquidea muy bonita y resistente",
//     imagen_url:
//       "https://images.unsplash.com/photo-1605996370592-b6f7a81e382e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
//     user_id: "12345",
//   },
//   {
//     plant_id: "4",
//     especie: "nenufar",
//     tipo: "acuatica",
//     fecha_adquisicion: "20/05/2021",
//     ubicacion: "cubeta",
//     nombre: "Marlo",
//     alto: "5",
//     ancho: "15",
//     frecuencia_riego: "acuatica",
//     luz_requerida: "mucha",
//     comentario: "Una planta que requiere mucho mantenimiento",
//     imagen_url:
//       "https://images.unsplash.com/photo-1524667502507-2a6a970815b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80",
//     user_id: "12345",
//   },
// ];

const Plants = () => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const getData = async () => {
    setisLoading(true);
    const url = "http://localhost:3001/api/plants/list";
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
        setData(response.data.plants);
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
    setisLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data !== null && (
        <>
          {data.length !== 0 && (
            <Grid
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(2, 1fr)",
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
              ]}
              gap={6}
            >
              {data.length !== 0 ? (
                data.map((plant) => {
                  return (
                    <Box w="100%" key={plant.plant_id}>
                      <Plant getData={getData} plantData={{ ...plant }}></Plant>
                    </Box>
                  );
                })
              ) : (
                <>
                  <Box w="100%"></Box>
                  <Stack w="100%" spacing={6}>
                    <Text fontSize="xl">
                      Aún no tienes ninguna planta registrada.
                    </Text>
                    <Image src={newPlant}></Image>
                    <Link to="newplant">
                      <Button colorScheme="green">
                        Agregar mi primer planta
                      </Button>
                    </Link>
                  </Stack>
                  <Box w="100%"></Box>
                </>
              )}
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default Plants;
