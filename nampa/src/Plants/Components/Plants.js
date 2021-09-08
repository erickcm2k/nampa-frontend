import { Flex } from "@chakra-ui/layout";
import React from "react";
import Plant from "./Plant";

const DUMMY_DATA = [
  {
    plant_id: "1",
    especie: "orquidea",
    tipo: "tipo1",
    fecha_adquisicion: "20/05/2021",
    ubicacion: "maceta",
    nombre: "orky",
    alto: "20",
    ancho: "10",
    frecuencia_riego: "3",
    luz_requerida: "mucha",
    comentario: "Es una orquidea muy bonita y resistente",
    imagen_url:
      "https://images.unsplash.com/photo-1605996370592-b6f7a81e382e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    user_id: "12345",
  },
  {
    plant_id: "2",
    especie: "nenufar",
    tipo: "acuatica",
    fecha_adquisicion: "20/05/2021",
    ubicacion: "cubeta",
    nombre: "neny",
    alto: "5",
    ancho: "15",
    frecuencia_riego: "acuatica",
    luz_requerida: "mucha",
    comentario: "Una planta que requiere mucho mantenimiento",
    imagen_url:
      "https://images.unsplash.com/photo-1524667502507-2a6a970815b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80",
    user_id: "12345",
  },
];

const Plants = () => {
  return DUMMY_DATA.map((plant) => {
    return (
      <Plant
        key={plant.plant_id}
        specie={plant.especie}
        kind={plant.tipo}
        birthday={plant.fecha_adquisicion}
        location={plant.ubicacion}
        name={plant.nombre}
        height={plant.alto}
        width={plant.alto}
        irrigationFreq={plant.frecuencia_riego}
        requiredLight={plant.luz_requerida}
        comment={plant.comentario}
        img={plant.imagen_url}
        userId={plant.user_id}
      ></Plant>
    );
  });
};

export default Plants;
