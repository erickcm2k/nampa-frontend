import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import UpdateHelper from "./UpdateHelper";

const UpdatePlant = () => {
  let { plantId } = useParams();
  const [form, setForm] = useState(null);

  const getData = async () => {
    const url = "http://localhost:3001/api/plants/list";
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
        console.log(response);
        const plant = response.data.plants.filter((p) => p.plant_id == plantId);
        setForm({ ...plant });
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
  };

  useEffect(() => {
    getData();
  }, []);

  return <>{form !== null && <UpdateHelper oldData={form[0]} />}</>;
};

export default UpdatePlant;
