import React from "react";

const ImageComponent = ({ imageString }) => {
  return (
    <center>
      <img
        src={imageString}
        alt="Imagen"
        style={{ width: "75px", height: "75px" }}
      />
    </center>
  );
};

export default ImageComponent;
