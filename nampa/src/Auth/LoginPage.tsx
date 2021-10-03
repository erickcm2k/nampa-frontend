import { Button } from "@chakra-ui/button";
import { Container, Input, Text, VStack, Box } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UI02 from "../assets/UI02.jpeg";
import Swal from "sweetalert2";

import { AuthContext } from "./AuthContext";

export const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
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

    const { username, password } = form;

    // const ok = await login(username, password);
    console.log(await login(username, password));
    
    // if (!ok) {
    //   Swal.fire(
    //     "Error",
    //     "Ha ocurrido un error, revise los campos e intente de nuevo.",
    //     "error"
    //   );
    // }
  };

  const completeFields = () => {
    return form.username.length > 0 && form.password.length > 0 ? true : false;
  };

  return (
    <Box backgroundImage={UI02} backgroundSize="100vw" height="100vh">
      <Container p="5">
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

            <Button variant="link" colorScheme="blue">
              <Link to="/auth/register">No tengo cuenta</Link>
            </Button>

            <Button
              type="submit"
              colorScheme="green"
              disabled={!completeFields()}
            >
              Ingresar
            </Button>
          </VStack>
        </form>
      </Container>
    </Box>
  );
};
