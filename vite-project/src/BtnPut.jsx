import React from "react";

const Button = ({ text, onClick, className }) => {
  // const [equipo, setEquipo] = useState("");
  // const [liga, setLiga] = useState("");
  // const [pais, setPais] = useState("");
  // const [descripcion, setDescripcion] = useState("");
  // const [imagen, setImagen] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Pasamos los valores de los campos al onSubmit
  //   onSubmit(equipo, liga, pais, descripcion, imagen);
  //   // Luego puedes reiniciar los campos del formulario si lo deseas
  //   setEquipo("");
  //   setLiga("");
  //   setPais("");
  //   setDescripcion("");
  //   setImagen("");
  // };
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
