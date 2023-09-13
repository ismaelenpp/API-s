import { useState, useEffect } from "react";

import DragAndDrop from "./drag_and_drop"; // Import the DragAndDrop component

import cloudinary from "cloudinary-core";
//import { response } from "express";

//import { response } from "express";

const cl = new cloudinary.Cloudinary({
  cloud_name: "dajnd6hfe",

  api_key: "643243133882548",

  api_secret: "Hqac499b90mUnZApKhIHUgpLCzc",
});

// eslint-disable-next-line react/prop-types

// eslint-disable-next-line react/prop-types
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sube la imagen a Cloudinary y obtén la URL
    const imageUrl = await uploadImageToCloudinary(imageFile);

    // Verifica que la URL de la imagen se haya obtenido correctamente
    console.log("URL de la imagen:", imageUrl);
    //Subir los datos a la base de datos
    onSubmit(equipo, liga, pais, descripcion, imageUrl);
    // Luego puedes reiniciar los campos del formulario si lo deseas
    setEquipo("");
    setLiga("");
    setPais("");
    setDescripcion("");
    setImageFile(null);
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

    console.log(imageFile);

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
        // Puedes realizar cualquier acción adicional después de cargar la imagen aquí
      } else {
        // Manejo de errores si la respuesta no es exitosa

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

        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Añadir Equipo
        </button>
      </form>
    </div>
  );
};

export default Formulario;
