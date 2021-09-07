import { Button } from "@chakra-ui/button";
import { Flex, Box, Container, Input, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import { AuthContext } from "./AuthContext";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
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

    const { username, password } = form;
    const ok = await login(username, password);

    if (!ok) {
      Swal.fire(
        "Error",
        "Ha ocurrido un error, revise los campos e intente de nuevo.",
        "error"
      );
    }
  };

  const completeFields = () => {
    return form.username.length > 0 && form.password.length > 0 ? true : false;
  };

  return (
    <Container mt="5" p="5">
      <form onSubmit={onSubmit}>
        <VStack spacing={3}>
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Inicia sesión en Nampa
          </Text>

          <Input
            type="text"
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

          <Button variant="ghost" colorScheme='Blue.50'>
            <Link to="/auth/register">¿Nueva cuenta?</Link>
          </Button>

          <Button type="submit"  disabled={!completeFields()}>
            Ingresar
          </Button>
        </VStack>
      </form>
    </Container>
  );
};
