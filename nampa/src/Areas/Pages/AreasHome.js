import React from "react";
import { Box, Text, Button, Container, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Areas from "../Components/Areas";

const AreasHome = () => {
    return (
        <Container
            minWidth={"70rem"}
            maxWidth={"90rem"}
            display="flex"
            flexDirection="column"
        >

            <Box py={3}>
                <Flex justify="space-between" >
                    <Text textAlign="center" fontSize="3xl" fontWeight="bold">
                        Mis áreas
                    </Text>
                    <Link to="newarea">
                        <Button colorScheme="green">Agregar área</Button>
                    </Link>
                </Flex>
            </Box>
            <Areas />
        </Container>
    );
};

export default AreasHome;
