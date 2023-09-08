import React, { useState, useEffect } from "react";
import DragAndDrop from "./drag_and_drop";

const Formulario2 = ({ equipoSeleccionado, onEdit }) => {
  const [equipo, setEquipo] = useState(equipoSeleccionado.nombre);
  const [liga, setLiga] = useState(equipoSeleccionado.liga);
  const [pais, setPais] = useState(equipoSeleccionado.pais);
  const [descripcion, setDescripcion] = useState(
    equipoSeleccionado.descripcion
  );
  const [imagen, setImagen] = useState(equipoSeleccionado.imagen); // Actualizamos la imagen en el estado
  const [imageFile, setImageFile] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch lista de países desde la API
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        // Mapea los nombres de los países
        const countryNames = data.map((country) => country.name);
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const equipoEditado = {
      ...equipoSeleccionado,
      nombre: equipo,
      liga: liga,
      pais: pais,
      descripcion: descripcion,
      imagen: imagen, // Actualizamos la imagen con el valor del estado
    };

    // Llama a la función onEdit para guardar los cambios
    onEdit(equipoEditado);

    // No recargues la página aquí, en su lugar, actualiza el estado o realiza redirecciones

    // Restablecer los campos del formulario
    setEquipo("");
    setLiga("");
    setPais("");
    setDescripcion("");
    setImageFile(null);
  };

  const handleImageDrop = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageFile(reader.result); // Actualiza el archivo de imagen
      setImagen(reader.result); // Actualiza la imagen en el estado
    };

    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImageFile(null);
    setImagen(null); // Borra la imagen en el estado
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
          <select
            id="pais"
            className="form-control"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecciona un país
            </option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
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

          {imageFile ? (
            <div>
              <img
                src={imageFile}
                alt="Uploaded"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />

              <br />

              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClearImage}
              >
                Eliminar Imagen
              </button>
            </div>
          ) : (
            <DragAndDrop onImageDrop={handleImageDrop} />
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default Formulario2;
