import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "@chakra-ui/button";
import { Flex, Box, Container, Input, Text, VStack } from "@chakra-ui/react";

import { AuthContext } from "../Auth/AuthContext";

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
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

    const { username, password, name } = form;
    const msg = await register(name, username, password);

    if (msg !== true) {
      Swal.fire("Error", msg, "error");
    }
  };

  const completeFields = () => {
    return form.username.length > 0 &&
      form.password.length > 0 &&
      form.name.length > 0
      ? true
      : false;
  };

  return (
    <Container mt="5" p="5">
      <form onSubmit={onSubmit}>
        <VStack spacing={3}>
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Registro
          </Text>

          <Input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={onChange}
          />

          <Input
            type="username"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={onChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={onChange}
          />

          <Button variant="ghost">
            <Link to="/auth/login">¿Ya tienes cuenta?</Link>
          </Button>

          <Button type="submit" disabled={!completeFields()}>
            Crear cuenta
          </Button>
        </VStack>
      </form>
    </Container>
  );
};
