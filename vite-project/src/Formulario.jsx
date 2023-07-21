import React, { useState } from "react";

const Formulario = ({ onSubmit }) => {
  const [equipo, setEquipo] = useState("");
  const [liga, setLiga] = useState("");
  const [pais, setPais] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  const handleSubmit = (e) => {
    console.log(equipo.valueOf.toString);
    e.preventDefault();
    // Pasamos los valores de los campos al onSubmit uwu
    onSubmit(equipo, liga, pais, descripcion, imagen);
    // Luego puedes reiniciar los campos del formulario si lo deseas
    setEquipo("");
    setLiga("");
    setPais("");
    setDescripcion("");
    setImagen("");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="equipo" className="form-label">
            Nombre del Equipo
          </label>
          <input
            type="text"
            className="form-control"
            id="equipo"
            value={equipo}
            onChange={(e) => setEquipo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="liga" className="form-label">
            Liga
          </label>
          <input
            type="text"
            className="form-control"
            id="liga"
            value={liga}
            onChange={(e) => setLiga(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pais" className="form-label">
            País
          </label>
          <input
            type="text"
            className="form-control"
            id="pais"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">
            Link de la Imagen
          </label>
          <input
            type="text"
            className="form-control"
            id="imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => window.location.reload(false)}
        >
          Añadir Equipo
        </button>
      </form>
    </div>
  );
};

export default Formulario;