import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "@chakra-ui/button";
import { Container, Input, Text, VStack, Box } from "@chakra-ui/react";
import UI02 from "../assets/UI02.jpeg";
import { AuthContext } from "./AuthContext";

export const RegisterPage: React.FC = () => {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, password, name } = form;
    const ok = await register(name, username, password);

    if (!ok) {
      Swal.fire("Error", 'msg', "error");
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
    <Box backgroundImage={UI02} backgroundSize="100vw" height="100vh">
      <Container p="5">
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

            <Button variant="link" colorScheme='blue'>
              <Link to="/auth/login">Ya tengo una cuenta</Link>
            </Button>

            <Button type="submit" colorScheme='green' disabled={!completeFields()}>
              Crear cuenta
            </Button>
          </VStack>
        </form>
      </Container>
    </Box>
  );
};
