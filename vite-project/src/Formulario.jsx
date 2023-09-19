import React, { useState, useEffect } from "react";
import "./Formulario.css";
import DragAndDrop from "./drag_and_drop"; // Importa el componente DragAndDrop
import cloudinary from "cloudinary-core";

const cl = new cloudinary.Cloudinary({
  cloud_name: "dajnd6hfe",
  api_key: "643243133882548",
  api_secret: "Hqac499b90mUnZApKhIHUgpLCzc",
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
              "85a44f5c53msh03d010cb82f7866p15c3b5jsn93a02268b61f",
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (equipo) {
      fetchTeams(equipo);
    }
  }, [equipo]);

  const handleTeamSelect = (selectedTeam) => {
    setEquipo(selectedTeam);
    setTeams([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImageToCloudinary(imageFile);
    onSubmit(equipo, liga, pais, descripcion, imageUrl);
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

  const uploadImageToCloudinary = async (imageFile) => {
    console.log("Subiendo imagen a Cloudinary...");

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "images"); // Reemplaza con tu upload preset
      const response = await fetch(
        cl.url("https://api.cloudinary.com/v1_1/dajnd6hfe/image/upload", {
          secure: true,
          upload_preset: "images",
          cloud_name: "dajnd6hfe",
          api_key: "643243133882548",
          api_secret: "Hqac499b90mUnZApKhIHUgpLCzc",
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

  useEffect(() => {
    // Fetch lista de países desde la API
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name);
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="equipo" className="form-label">
            Nombre del Equipo
          </label>
          <div className="custom-dropdown">
            <input
              type="text"
              id="equipo"
              className="form-control"
              placeholder="Buscar equipo..."
              value={equipo}
              onChange={(e) => setEquipo(e.target.value)}
            />
            {teams.length > 0 && (
              <ul className="dropdown-list">
                {teams.map((team, index) => (
                  <li
                    key={index}
                    className="dropdown-item"
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
