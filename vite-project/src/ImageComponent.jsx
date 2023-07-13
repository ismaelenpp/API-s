import React from "react";

const ImageComponent = ({ imageString }) => {
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
