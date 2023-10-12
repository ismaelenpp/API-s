/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import DragAndDrop from "./drag_and_drop";
import * as filestack from 'filestack-js';
//import CryptoJS from "crypto-js";

const client = filestack.init('AZOIMYcHQJq6ZI7YPI0BEz');

const Formulario2 = ({ equipoSeleccionado, onEdit }) => {
  const [equipo, setEquipo] = useState(equipoSeleccionado.nombre);
  const [liga, setLiga] = useState(equipoSeleccionado.liga);
  const [pais, setPais] = useState(equipoSeleccionado.pais);
  const [descripcion, setDescripcion] = useState(
    equipoSeleccionado.descripcion
  );
  const [showTeamList, setShowTeamList] = useState(false);
  const [videoLink, setVideoLink] = useState(equipoSeleccionado.videoLink);
  const [imagen, setImagen] = useState(equipoSeleccionado.imagen);
  const [imageFile, setImageFile] = useState(null);
  const [teams, setTeams] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(
      "https://res.cloudinary.com/dajnd6hfe/raw/upload/v1695192766/countries_bth2oy.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.countries.map((country) => country.name);
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const fetchTeams = async (value) => {
    if (value.length < 3) {
      setTeams([]);
      return;
    }

    try {
      const response = await fetch(
        `https://sofascore.p.rapidapi.com/teams/search?name=${value}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "1205ddc5c6msh8eb9343686ded57p16c1d5jsn30de52dc2253",
            "X-RapidAPI-Host": "sofascore.p.rapidapi.com",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        const footballTeams = data.teams.filter(
          (team) => team.sport.name === "Football"
        );

        const uniqueTeams = Array.from(
          new Set(footballTeams.map((team) => team.name))
        );

        setTeams(uniqueTeams);
      } else {
        console.error("Error al buscar equipos");
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleTeamSelect = (selectedTeam) => {
    setEquipo(selectedTeam);
    setTeams([]);
    setShowTeamList(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const equipoEditado = {
      ...equipoSeleccionado,
      nombre: equipo,
      liga: liga,
      pais: pais,
      descripcion: descripcion,
      videoLink: videoLink,
      imagen: imagen,
    };

    console.log("datos de imagen", imagen);

    console.log("Intento1", imagen.split("/")[3]);

    var imagenborrar = imagen.split("/")[3];

    await handleEliminarImagen(imagenborrar);
    onEdit(equipoEditado);
    setEquipo("");
    setLiga("");
    setPais("");
    setDescripcion("");
    setVideoLink("");
    setImageFile(null);
  };

  const handleImageDrop = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFile(reader.result);
      setImagen(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImageFile(null);
    setImagen(null);
  };

  const handleEliminarImagen = async (eliminate) => {
    // Promesa a localhost:3000 para eliminar la imagen
    const response = await fetch(`http://localhost:3000/eliminarimagen/${eliminate}`, {
        method: "DELETE",
    });
    if (response.ok) {
        console.log("Imagen eliminada con éxito");
    } else {
        console.error("Error al eliminar la imagen:", response.status, response.statusText);
    }
  }
  // const handleEliminarImagen = async (eliminate) => {
  //   const API_KEY = "AZOIMYcHQJq6ZI7YPI0BEz";
  //   const secretKey = "T5EHAT5TXZH6HJHUVBJRH5N6TE";
  //   const policyObject = {
  //     "call": ["remove"],
  //     "expiry": 1634503200,
  //     "handle": eliminate,
  //   };
  //
  //   const base64Policy = btoa(JSON.stringify(policyObject));
  //   const policyAndKey = base64Policy + secretKey;
  //   const signature = sha256(policyAndKey);
  //
  //   try {
  //     const response = await fetch(
  //         `https://www.filestackapi.com/api/file/${eliminate}?key=${API_KEY}&policy=${base64Policy}&signature=${signature}`,
  //         {
  //           method: "DELETE",
  //         }
  //     );
  //
  //     if (response.ok) {
  //       console.log("Imagen eliminada con éxito");
  //     } else {
  //       console.error("Error al eliminar la imagen:", response.status, response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error al eliminar la imagen:", error);
  //   }
  // };
  //
  // const sha256 = (message) => {
  //   const hash = CryptoJS.SHA256(message);
  //   return hash.toString(CryptoJS.enc.Hex);
  // };
  //

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="equipo" className="form-label">
            Nombre del Equipo
          </label>

          <div className="input-group">
            <input
              type="text"
              id="equipo"
              className="form-control"
              placeholder="Buscar equipo..."
              value={equipo}
              onChange={(e) => {
                setEquipo(e.target.value);
                fetchTeams(e.target.value);
                setShowTeamList(true);
              }}
              required
            />

            {showTeamList && teams.length > 0 && (
              <ul className="list-group dropdown-list">
                {teams.map((team, index) => (
                  <li
                    key={index}
                    className="list-group-item"
                    onClick={() => handleTeamSelect(team)}
                  >
                    {team}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
          <label htmlFor="videoLink" className="form-label">
            Enlace del Video
          </label>
          <input
            type="text"
            className="form-control"
            id="videoLink"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
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
