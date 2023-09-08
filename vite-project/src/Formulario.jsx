import React, { useState, useEffect } from "react";

import DragAndDrop from "./drag_and_drop";
const Formulario = ({ onSubmit }) => {
  const [equipo, setEquipo] = useState("");
  const [liga, setLiga] = useState("");
  const [pais, setPais] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [countries, setCountries] = useState([]); // Agregamos el estado para countries

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

    // Pasamos los valores de los campos al onSubmit

    onSubmit(equipo, liga, pais, descripcion, imageFile);

    // Luego puedes reiniciar los campos del formulario si lo deseas

    setEquipo("");

    setLiga("");

    setPais("");

    setDescripcion("");

    setImageFile(null);
    window.location.reload();
  };

  const handleImageDrop = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageFile(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImageFile(null);
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

          <br />

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
            Imagen del Equipo
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
          Añadir Equipo
        </button>
      </form>
    </div>
  );
};

export default Formulario;
