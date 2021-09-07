import React, { useRef, useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import { Button } from "@chakra-ui/react";

const Plants = () => {
  const loginDetails = React.useContext(AuthContext);
  const imagePickerRef = useRef();
  const imagePickerHandler = () => {
    imagePickerRef.current.click();
  };

  return (
    <div>
      <input type="file" accept=".jpg,.png,.jpeg" ref={imagePickerRef} />

      <img src="" alt="plant-preview" />
      <Button onClick={imagePickerHandler} />
    </div>
  );
};

export default Plants;
