import React from "react";
import { IconButton } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
const HelpButton = () => {
  return (
    <div>
      <button
        onClick={() => alert("Descargando PDF")}
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          color: "rgb(255,249,230)",
          backgroundColor: "rgb(92,201,193)",
          width: "4rem",
          height: "4rem",
          borderRadius: "50%",
        }}
      >
        <i class="fas fa-question" style={{ fontSize: "2rem" }}></i>
      </button>
    </div>
  );
};

export default HelpButton;

{
  /* <IconButton
colorScheme="blue"
aria-label="Search database"
icon={<InfoIcon />} */
}
