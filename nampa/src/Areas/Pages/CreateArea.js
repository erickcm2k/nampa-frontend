import React, { useState } from "react";
import { Container, Text, Button, Stack, Flex } from "@chakra-ui/react";
import axios from "axios";
import { Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";


const CreateArea = () => {
    let history = useHistory();
    const [isLoading, setisLoading] = useState(false);
    const [form, setForm] = useState({
        nombre: "",
        tipo: "",
        dimension: "",
        insolacion_id: "",
        descripcion: ""
    });

    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const onSubmit = async (ev) => {
        setisLoading(true);
        ev.preventDefault();
        const myform = document.forms["myForm"];
        console.log(myform);
        const fd = new FormData(myform);
        const url = "http://localhost:3001/api/areas/add";
        const token = localStorage.getItem("token") || "";
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        console.log(fd);
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
        <Container
            minWidth={"70rem"}
            maxWidth={"80rem"}
            display="flex"
            flexDirection="column"
        >
            <Flex justify="space-around" mt="10px" mb="15px">
                
                <Text textAlign="center" fontWeight="bold" fontSize="2xl">
                    Ingresa los datos de la nueva área
                </Text>
                <Button colorScheme="red">
                    <Link to="/areas">Volver</Link>
                </Button>
            </Flex>

            <form name="myForm" onSubmit={onSubmit}>
                <Stack spacing={3}>
                    <Text fontWeight="bold">Nombre</Text>
                    <Input
                        type="text"
                        name="nombre"
                        value={form.nombre}
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
                    <Text fontWeight="bold">Dimensiones (m2)</Text>
                    <Input
                        type="text"
                        name="dimension"
                        value={form.dimension}
                        onChange={onChange}
                        required={true}
                    />
                    <Text fontWeight="bold">Insolación</Text>
                    <Select name="insolacion_id" value={form.insolacion_id} onChange={onChange}>
                        <option value="1">Sol</option>
                        <option value="1">Sombra</option>
                        <option value="1">Resolana</option>
                    </Select>
                    <Text fontWeight="bold">Descripción</Text>
                    <Input
                        type="text"
                        name="descripcion"
                        value={form.descripcion}
                        onChange={onChange}
                        required={true}
                    />
                   
                                   
                    {isLoading ? (
                        <Button
                            isLoading
                            loadingText="Agregando área..."
                            colorScheme="teal"
                            variant="outline"
                        ></Button>
                    ) : (
                        <Button type="submit" colorScheme="green">
                            Agregar área
                        </Button>
                    )}
                </Stack>
            </form>
        </Container>
    );
};

export default CreateArea;