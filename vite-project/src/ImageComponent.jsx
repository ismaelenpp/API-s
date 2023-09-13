/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const ImageComponent = ({ imageString }) => {
  // Sacamos el estado de la imagen del componente padre
  return (
    <center>
      <img
        src={imageString}
        alt="Imagen"
        style={{ width: "69px", height: "69px" }}
      />
    </center>
  );
};

export default ImageComponent;
