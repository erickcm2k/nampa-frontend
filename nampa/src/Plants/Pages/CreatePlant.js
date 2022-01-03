import React, { useState, useEffect } from "react";
import { Container, Text, Button, Stack } from "@chakra-ui/react";
import axios from "axios";
import { Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";

const CreatePlant = () => {
  const [especies, setespecies] = useState([]);
  const [areas, setareas] = useState([]);

  let history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    especie_id: "",
    tipo: "Herbácea",
    fecha_plantacion: "",
    area_id: "Jardín",
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

  useEffect(() => {
    const getEspecies = async () => {
      const token = localStorage.getItem("token") || "";
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .post("http://localhost:3001/api/especies/list", {}, config)
        .then((response) => {
          console.log(response.data.especies);
          setespecies(response.data.especies);
        })

        .catch((error) => {
          console.log(error);
          if (error) {
            Swal.fire(
              "Error",
              "Ha ocurrido un error del servidor. Favor de reportarlo al administrador del sistema.",
              "error"
            );
          }
        });
    };

    const getAreas = async () => {
      const token = localStorage.getItem("token") || "";
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios
        .post("http://localhost:3001/api/areas/list", {}, config)
        .then((response) => {
          console.log(response.data.areas);
          setareas(response.data.areas);
        })

        .catch((error) => {
          console.log(error);
          if (error) {
            Swal.fire(
              "Error",
              "Ha ocurrido un error del servidor. Favor de reportarlo al administrador del sistema.",
              "error"
            );
          }
        });
    };

    getEspecies();
    getAreas();
  }, []);

  const onSubmit = async (ev) => {
    setisLoading(true);
    ev.preventDefault();
    const myform = document.forms["myForm"];
    const fd = new FormData(myform);
    // fd.append("nombre", form.nombre);
    // fd.append("especie", form.especie);
    // fd.append("tipo", form.tipo);
    // fd.append("fecha_plantacion", form.fecha_plantacion);
    // fd.append("area_id", form.area_id);
    // fd.append("alto", form.alto);
    // fd.append("ancho", form.ancho);
    // fd.append("frecuencia_riego", form.frecuencia_riego);
    // fd.append("comentario", form.comentario);
    for (var key of fd.keys()) {
      console.log(key);
   }
    for (var value of fd.values()) {
      console.log(value);
   }
    const url = "http://localhost:3001/api/plantas/add";
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
    setisLoading(false);
  };

  return (
    <Container mt="3">
      <Text textAlign="center" fontWeight="bold" fontSize="2xl">
        Ingresa los datos de tu nueva planta
      </Text>
      <Button>
        <Link to="/plantas">Volver</Link>
      </Button>
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
          <Text fontWeight="bold">Descripción</Text>
          <Input
            type="text"
            name="descripcion"
            value={form.descripcion}
            onChange={onChange}
            required={true}
          />
          <Text fontWeight="bold">Especie</Text>
          <Select name="especie_id" value={form.especie_id} onChange={onChange}>
            {especies.map((e) => {
              return (
                <option key={e.especie_id} value={e.especie_id}>
                  {e.especie}
                </option>
              );
            })}
          </Select>
          <Text fontWeight="bold">Área</Text>
          <Select name="area_id" value={form.area_id} onChange={onChange}>
            {areas.map((e) => {
              return (
                <option key={e.area_id} value={e.area_id}>
                  {e.nombre}
                </option>
              );
            })}
          </Select>
          <Text fontWeight="bold">Sustrato</Text>
          <Input
            type="text"
            name="sustrato"
            value={form.sustrato}
            onChange={onChange}
            required={true}
          />
          <Text fontWeight="bold">Fecha de plantación</Text>
          <input
            type="date"
            name="fecha_plantacion"
            value={form.fecha_plantacion}
            onChange={onChange}
            required={true}
          />
          <Text fontWeight="bold">Fecha último cambio de maceta</Text>
          <input
            type="date"
            name="fecha_ultimo_cambio_mac"
            value={form.fecha_ultimo_cambio_mac}
            onChange={onChange}
            required={true}
          />

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
          <Text fontWeight="bold">Comentario</Text>
          <Input
            type="text"
            name="comentario"
            value={form.comentario}
            onChange={onChange}
            required={true}
          />
          {isLoading ? (
            <Button
              isLoading
              loadingText="Agregando planta..."
              colorScheme="teal"
              variant="outline"
            ></Button>
          ) : (
            <Button type="submit" colorScheme="green">
              Agregar planta
            </Button>
          )}
        </Stack>
      </form>
    </Container>
  );
};

export default CreatePlant;
