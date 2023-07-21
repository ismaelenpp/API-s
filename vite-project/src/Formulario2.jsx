import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import "./formulario2.css"; // Importar el archivo CSS creado
import "bootstrap/dist/css/bootstrap.min.css"; // Importar estilos de Bootstrap

const Formulario2 = ({ equipoSeleccionado, onEdit }) => {
  const [paises, setPaises] = useState([]);
  const [ligas, setLigas] = useState([]);
  const [equipo, setEquipo] = useState(equipoSeleccionado.nombre);
  const [selectedPais, setSelectedPais] = useState(equipoSeleccionado.pais);
  const [selectedLiga, setSelectedLiga] = useState(equipoSeleccionado.liga);
  const [descripcion, setDescripcion] = useState(
    equipoSeleccionado.descripcion
  );
  const [imagen, setImagen] = useState(equipoSeleccionado.imagen);

  useEffect(() => {
    // Obtener la lista de países desde la API "Rest Countries"
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countries = response.data
          .map((country) => country.name.common)
          .sort();
        setPaises(countries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });

    // Obtener todas las ligas de fútbol desde la API "TheSportsDB"
    axios
      .get(
        "https://apiclient.besoccerapps.com/scripts/api/api.php?key=9ce951e467376ca62e905f6b88a4e6de&tz=Europe/Madrid&req=categories&filter=my_leagues&format=json"
      )
      .then((response) => {
        const leagues = response.data.category;
        setLigas(leagues);
      })
      .catch((error) => {
        console.error("Error fetching leagues:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const equipoEditado = {
      ...equipoSeleccionado,
      nombre: equipo,
      liga: selectedLiga,
      pais: selectedPais,
      descripcion: descripcion,
      imagen: imagen,
    };

    onEdit(equipoEditado);

    // Restablecer los campos del formulario
    setEquipo("");
    setSelectedPais("");
    setSelectedLiga("");
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
          <label htmlFor="pais" className="form-label">
            País
          </label>
          <select
            className="form-select"
            id="pais"
            value={selectedPais}
            onChange={(e) => setSelectedPais(e.target.value)}
            required
          >
            <option value="" disabled>
              Seleccionar País
            </option>
            {paises.map((pais) => (
              <option key={pais} value={pais}>
                {pais}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="liga" className="form-label">
            Liga
          </label>
          <select
            className="form-select"
            id="liga"
            value={selectedLiga}
            onChange={(e) => setSelectedLiga(e.target.value)}
            required
          >
            <option value="" disabled>
              Seleccionar Liga
            </option>
            {ligas.map((liga) => (
              <option key={liga.id} value={liga.shortName}>
                {liga.shortName}
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
