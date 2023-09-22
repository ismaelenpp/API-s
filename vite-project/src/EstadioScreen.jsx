import React from "react";
import miImagen from "./images/campo_futbol.png";

const EstadioScreen = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ajusta el ancho del div según sea necesario
    height: "50%", // Ajusta la altura del div según sea necesario
  };

  const imgStyle = {
    width: "70%", // La imagen ocupará todo el ancho del div
    height: "100%", // La   altura se ajustará automáticamente para mantener la relación de aspecto
  };

  return (
    <div className="estadio-screen" style={containerStyle}>
      <img src={miImagen} alt="Campo de fútbol" style={imgStyle} />
    </div>
  );
};

export default EstadioScreen;
