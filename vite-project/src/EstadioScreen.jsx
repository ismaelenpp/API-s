import React from "react";
import miImagen from "./images/campo_futbol.png";

const EstadioScreen = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Ajusta la altura para ocupar toda la altura de la pantalla
  };
  const containerStyle2 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Ajusta la altura para ocupar toda la altura de la pantalla
    backgroundImage: `url(${miImagen})`, // Agregar la imagen de fondo
    backgroundSize: "cover", // Ajusta el tamaño de la imagen de fondo
    backgroundRepeat: "no-repeat", // Evita que la imagen de fondo se repita
  };

  const imgStyle = {
    maxWidth: "100%", // La imagen se ajustará automáticamente al ancho del contenedor
    maxHeight: "100%", // La imagen se ajustará automáticamente a la altura del contenedor
  };

  return (
    <div className="estadio-screen" style={containerStyle2}>
      <img src={miImagen} alt="Campo de fútbol" style={imgStyle} />
    </div>
  );
};

export default EstadioScreen;
