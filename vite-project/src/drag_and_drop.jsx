import cloudinary from "cloudinary-core";

import React, { useState, useRef } from "react"; // Agrega useRef a las importaciones
import PropTypes from "prop-types";

const cl = new cloudinary.Cloudinary({
  cloud_name: "dajnd6hfe",

  api_key: "643243133882548",

  api_secret: "Hqac499b90mUnZApKhIHUgpLCzc",
});
const DragAndDrop = ({ onImageDrop }) => {
  const [dragging, setDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    onImageDrop(file);
    if (file) {
      try {
        // Crear un objeto FormData para la carga

        const formData = new FormData();

        formData.append("file", file);

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
          setSelectedImage(data.secure_url); // Actualiza el estado con la URL de la imagen
        } else {
          // Manejo de errores si la respuesta no es exitosa

          const errorData = await response.json();

          console.error("Error al subir la imagen:", errorData.message);
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    } else {
      console.error("No se seleccionó ningún archivo.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };
  const imageInputRef = useRef(null);
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        width: "300px",
        height: "200px",
        border: dragging ? "2px dashed #999" : "2px dashed #ccc",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <p>{dragging ? "Suelta la imagen aquí." : "Arrastra la imagen aquí."}</p>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];

          onImageDrop(file);
        }}
      />
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Vista previa de la imagen" />
        </div>
      )}
      <input
        ref={imageInputRef}
        type="hidden"
        name="imagen" // Nombre del campo en el formulario
        value={selectedImage || ""} // Valor del campo
      />
    </div>
  );
};
DragAndDrop.propTypes = {
  onImageDrop: PropTypes.func.isRequired,
};
export default DragAndDrop;
