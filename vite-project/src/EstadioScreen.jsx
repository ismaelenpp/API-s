import React from "react";
import miImagen from "./images/campo_futbol.png";

const EstadioScreen = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Ajusta la altura para ocupar toda la altura de la pantalla
  };

  const imgStyle = {
    width: "100%", // Cambia maxWidth a width para que la imagen ocupe todo el ancho del contenedor
    height: "100vh", // Ajusta la altura para ocupar toda la altura de la pantalla
    objectFit: "cover", // Mantiene la proporción de la imagen y la ajusta para cubrir el contenedor
  };

  return (
    <div className="estadio-screen" style={containerStyle}>
      <img src={miImagen} alt="Campo de fútbol" style={imgStyle} />
    </div>
  );
};

export default EstadioScreen;
