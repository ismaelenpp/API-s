/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import DragAndDrop from "./drag_and_drop";

import cloudinary from "cloudinary-core";

import "bootstrap/dist/css/bootstrap.min.css";

const cl = new cloudinary.Cloudinary({
  cloud_name: "dwodczt0e",

  api_key: "246222394918621",

  api_secret: "7R2jwsxRXL9VZrU5CH1YlgGGVxc",
});

const Formulario = ({ onSubmit }) => {
  const [equipo, setEquipo] = useState("");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [liga, setLiga] = useState("");
  const [pais, setPais] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [showTeamList, setShowTeamList] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [videoLink, setVideoLink] = useState(""); // Nuevo estado para el enlace de video de YouTube

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

    setLoading(true);

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

        setShowTeamList(true);
      } else {
        console.error("Error al buscar equipos");
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSelect = (selectedTeam) => {
    setEquipo(selectedTeam);

    setTeams([]);

    setShowTeamList(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!equipo || !imageFile) {
      setShowWarning(true);

      setWarningMessage(
        "Tienes que adjuntar una imagen antes de añadir el equipo."
      );

      return;
    }

    const imageUrl = await uploadImageToCloudinary(imageFile);

    onSubmit(equipo, liga, pais, descripcion, imageUrl);

    setEquipo("");

    setLiga("");

    setPais("");

    setDescripcion("");

    setImageFile(null);

    setShowWarning(false);

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

  const uploadImageToCloudinary = async (imageFile) => {
    console.log("Subiendo imagen a Cloudinary...");

    try {
      const formData = new FormData();

      formData.append("file", imageFile);

      formData.append("upload_preset", "images");

      const response = await fetch(
        cl.url("https://api.cloudinary.com/v1_1/dwodczt0e/image/upload", {
          secure: true,
          upload_preset: "images",
          cloud_name: "dwodczt0e",
          api_key: "246222394918621",
          api_secret: "7R2jwsxRXL9VZrU5CH1YlgGGVxc",
        }),
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();

        console.log("Imagen cargada exitosamente:", data.secure_url);

        return data.secure_url;
      } else {
        const errorData = await response.json();

        console.error("Error al subir la imagen:", errorData.message);

        return errorData.message;
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);

      return error;
    }
  };

  return (
    <div className="container mt-0">
      <h1>Añadir equipo</h1>

      <form onSubmit={handleSubmit}>
        {showWarning && (
          <div className="alert alert-danger" role="alert">
            {warningMessage}
          </div>
        )}

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

                setShowTeamList(false);

                fetchTeams(e.target.value);
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

          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="liga"
              value={liga}
              onChange={(e) => setLiga(e.target.value)}
              required
            />
          </div>
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

        {/* Nuevo campo de entrada de enlace de video */}
        <div className="mb-3">
          <label htmlFor="videoLink" className="form-label">
            Enlace del Video (YouTube)
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
                className="btn btn-danger mt-2"
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
