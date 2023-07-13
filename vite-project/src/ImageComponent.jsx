import React from "react";

const ImageComponent = ({ imageString }) => {
  return (
    <center>
      <img
        src={imageString}
        alt="Imagen"
        style={{ width: "40px", height: "40px" }}
      />
    </center>
  );
};

export default ImageComponent;
