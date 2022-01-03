import { Button } from "@chakra-ui/button";
import { Box, Grid, Stack, Text, Heading, Spacer, Flex } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Image } from "@chakra-ui/image";

import 'font-awesome/css/font-awesome.min.css';

import newPlant from "../../assets/new_plant.svg";


const Areas = () => {
    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const getData = async () => {
        setisLoading(true);
        const url = "http://localhost:3001/api/areas/list";
        const token = localStorage.getItem("token") || "";
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .post(url, {}, config)
            .then((response) => {
                setData(response.data.areas);
            })
            .catch((error) => {
                console.log(error);
                if (error) {
                    Swal.fire(
                        "Error",
                        "Ha ocurrido un error. Inténtelo nuevamente más tarde",
                        "error"
                    );
                }
            });
        setisLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {data !== null && (
                <>
                    {data.length !== 0 && (
                        <Grid
                            templateColumns={[
                                "repeat(1, 1fr)",
                                "repeat(2, 1fr)",
                                "repeat(2, 1fr)",
                                "repeat(3, 1fr)",
                            ]}
                            gap={6}
                        >
                            {data.length !== 0 ? (
                                data.map((area) => {
                                    return (
                                        <Box w="100%" backgroundColor={'rgb(255,255,255)'} key={area.plant_id} p={"15px"} borderRadius="15px" border='1px' borderColor='gray.500'>
                                            <Flex justify="space-between">
                                                <Heading as='h4' size='lg'>
                                                    {area.nombre} - {area.tipo}
                                                </Heading>
                                                <Box>
                                                    <Link to="editArea" mr="3px">
                                                        <Button colorScheme="green" borderRadius="15px" mr="3px"><i className="fa fa-edit"></i></Button>
                                                    </Link>
                                                    <Link to="deleteArea">
                                                        <Button colorScheme="red" borderRadius="15px"><i class="fa fa-trash"></i></Button>
                                                    </Link>
                                                </Box>
                                            </Flex>
                                            <Spacer />
                                            {area.dimension} m<sup>2</sup>
                                            <Spacer />
                                            {area.descripcion}
                                        </Box>
                                    );
                                })
                            ) : (
                                <>
                                    <Box w="100%"></Box>
                                    <Stack w="100%" spacing={6}>
                                        <Text fontSize="xl">
                                            Aún no tienes ninguna planta registrada.
                                        </Text>
                                        <Image src={newPlant}></Image>
                                        <Link to="newplant">
                                            <Button colorScheme="green">
                                                Agregar mi primer planta
                                            </Button>
                                        </Link>
                                    </Stack>
                                    <Box w="100%"></Box>
                                </>
                            )}
                        </Grid>
                    )}
                </>
            )}
        </>
    );
};

export default Areas;
