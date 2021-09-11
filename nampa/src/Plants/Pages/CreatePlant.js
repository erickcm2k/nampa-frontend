import React, { useState } from "react";
import { Container, Text, Button, Stack } from "@chakra-ui/react";
import axios from "axios";
import { Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const CreatePlant = () => {
  let history = useHistory();

  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    tipo: "Herbácea",
    fecha_adquisicion: "",
    ubicacion: "Jardín",
    alto: 0,
    ancho: 0,
    frecuencia_riego: 0,
    luz_requerida: "Sol",
    comentario: "",
  });

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
    // fd.append("nombre", form.nombre);
    // fd.append("especie", form.especie);
    // fd.append("tipo", form.tipo);
    // fd.append("fecha_adquisicion", form.fecha_adquisicion);
    // fd.append("ubicacion", form.ubicacion);
    // fd.append("alto", form.alto);
    // fd.append("ancho", form.ancho);
    // fd.append("frecuencia_riego", form.frecuencia_riego);
    // fd.append("comentario", form.comentario);
    const url = "http://localhost:3001/api/plants/add";
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
        Swal.fire("Todo bien", "Planta creada correctamente", "success");
        history.goBack();
      })

      .catch((error) => {
        console.log(error);
        if (error) {
          Swal.fire(
            "Error",
            "Ha ocurrido un error al crear la planta, inténtelo nuevamente más tarde.",
            "error"
          );
        }
      });
  };

  return (
    <Container mt="3">
      <Text textAlign="center" fontWeight="bold" fontSize="2xl">
        Ingresa los datos de tu nueva planta
      </Text>
      <form name="myForm" onSubmit={onSubmit} encType="multipart/form-data">
        <Stack spacing={3}>
          <Text>Imagen de tu planta</Text>
          <Input type="file" name="image" />
          <Text>Nombre</Text>
          <Input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            required={true}
          />
          <Text>Especie</Text>
          <Input
            type="text"
            name="especie"
            value={form.especie}
            onChange={onChange}
            required={true}
          />
          <Text>Tipo</Text>
          <Select name="tipo" value={form.tipo} onChange={onChange}>
            <option value="Herbácea">Herbácea</option>
            <option value="Mata">Mata</option>
            <option value="Arbusto">Arbusto</option>
            <option value="Árbol">Árbol</option>
            <option value="Cactácea">Cactácea</option>
          </Select>
          <Text>Fecha de adquisición</Text>
          <input
            type="date"
            name="fecha_adquisicion"
            value={form.fecha_adquisicion}
            onChange={onChange}
            required={true}
          />
          <Text>Ubicación en casa</Text>
          <Select name="ubicacion" value={form.ubicacion} onChange={onChange}>
            <option value="Jardín">Jardín</option>
            <option value="Maceta">Maceta</option>
            <option value="Pecera">Pecera</option>
          </Select>
          <Text>Altura en centímetros</Text>
          <Input
            type="number"
            name="alto"
            value={form.alto}
            onChange={onChange}
            required={true}
          />
          <Text>Ancho en centímetros</Text>
          <Input
            type="number"
            name="ancho"
            value={form.ancho}
            onChange={onChange}
            required={true}
          />
          <Text>Frecuencia de riego en días</Text>
          <Input
            type="number"
            name="frecuencia_riego"
            value={form.frecuencia_riego}
            onChange={onChange}
            required={true}
          />
          <Text>Luz requerida</Text>
          <Select
            name="luz_requerida"
            value={form.luz_requerida}
            onChange={onChange}
          >
            <option value="Sol">Sol</option>
            <option value="Sombra">Sombra</option>
            <option value="Resolana">Resolana</option>
          </Select>
          <Text>Comentario</Text>
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

export default CreatePlant;
