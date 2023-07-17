import React, { useState } from "react";

const Formulario2 = ({ equipoSeleccionado, onEdit }) => {
  const [equipo, setEquipo] = useState(equipoSeleccionado.nombre);
  const [liga, setLiga] = useState(equipoSeleccionado.liga);
  const [pais, setPais] = useState(equipoSeleccionado.pais);
  const [descripcion, setDescripcion] = useState(
    equipoSeleccionado.descripcion
  );
  const [imagen, setImagen] = useState(equipoSeleccionado.imagen);

  const handleSubmit = (e) => {
    e.preventDefault();

    const equipoEditado = {
      ...equipoSeleccionado,
      nombre: equipo,
      liga: liga,
      pais: pais,
      descripcion: descripcion,
      imagen: imagen,
    };

    onEdit(equipoEditado);

    // Restablecer los campos del formulario
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
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default Formulario2;
