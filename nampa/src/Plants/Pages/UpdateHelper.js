import React, { useState } from "react";
import { Container, Text, Button, Stack } from "@chakra-ui/react";
import axios from "axios";
import { Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

import { dateFormatter } from "../../utils/dateConversion";

const UpdateHelper = (props) => {
  const formattedDate = dateFormatter(props.oldData.fecha_adquisicion);
  const initialState = { ...props.oldData, fecha_adquisicion: formattedDate };
  const [form, setForm] = useState(initialState);
  console.log(form);

  let history = useHistory();

  const onChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const myform = document.forms["myForm"];
    const fd = new FormData(myform);
    const url = `http://localhost:3001/api/plants/update/${form.plant_id}`;
    const token = localStorage.getItem("token") || "";
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(url, fd, config)
      .then((response) => {
        console.log(response);
        Swal.fire("Todo bien", "Planta actualizada correctamente", "success");
        history.goBack();
      })

      .catch((error) => {
        console.log(error);
        if (error) {
          Swal.fire(
            "Error",
            "Ha ocurrido un error al cambiar los datos de la planta, inténtelo nuevamente más tarde.",
            "error"
          );
        }
      });
  };

  return (
    <Container mt="3">
      <Text textAlign="center" fontWeight="bold" fontSize="2xl">
        Editar planta
      </Text>
      <Text textAlign="center" fontWeight="bold" fontSize="lg">
        Ingresa los nuevos datos planta
      </Text>
      <form name="myForm" onSubmit={onSubmit} encType="multipart/form-data">
        <Stack spacing={3}>
          <Text fontWeight="bold">Imagen de tu planta</Text>
          <Input type="file" name="image" />
          <Text fontWeight="bold">Nombre</Text>
          <Input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            required={true}
          />
          <Text fontWeight="bold">Especie</Text>
          <Input
            type="text"
            name="especie"
            value={form.especie}
            onChange={onChange}
            required={true}
          />
          <Text fontWeight="bold">Tipo</Text>
          <Select name="tipo" value={form.tipo} onChange={onChange}>
            <option value="Herbácea">Herbácea</option>
            <option value="Mata">Mata</option>
            <option value="Arbusto">Arbusto</option>
            <option value="Árbol">Árbol</option>
            <option value="Cactácea">Cactácea</option>
          </Select>
          <Text fontWeight="bold">Fecha de adquisición</Text>
          <input
            type="date"
            name="fecha_adquisicion"
            value={form.fecha_adquisicion}
            onChange={onChange}
            required={true}
          />
          <Text fontWeight="bold">Ubicación en casa</Text>
          <Select name="ubicacion" value={form.ubicacion} onChange={onChange}>
            <option value="Jardín">Jardín</option>
            <option value="Maceta">Maceta</option>
            <option value="Pecera">Pecera</option>
          </Select>
          <Text fontWeight="bold">Altura en centímetros</Text>
          <Input
            type="number"
            name="alto"
            value={form.alto}
            onChange={onChange}
            required={true}
          />
          <Text fontWeight="bold">Ancho en centímetros</Text>
          <Input
            type="number"
            name="ancho"
            value={form.ancho}
            onChange={onChange}
            required={true}
          />
          <Text fontWeight="bold">Frecuencia de riego en días</Text>
          <Input
            type="number"
            name="frecuencia_riego"
            value={form.frecuencia_riego}
            onChange={onChange}
            required={true}
          />
          <Text fontWeight="bold">Luz requerida</Text>
          <Select
            name="luz_requerida"
            value={form.luz_requerida}
            onChange={onChange}
          >
            <option value="Sol">Sol</option>
            <option value="Sombra">Sombra</option>
            <option value="Resolana">Resolana</option>
          </Select>
          <Text fontWeight="bold">Comentario</Text>
          <Input
            type="text"
            name="comentario"
            value={form.comentario}
            onChange={onChange}
            required={true}
          />
          <Button type="submit" colorScheme="green">
            Crear
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default UpdateHelper;
