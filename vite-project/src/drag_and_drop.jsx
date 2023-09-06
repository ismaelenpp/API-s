/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import cloudinary from 'cloudinary-core';
import React, { useState } from 'react';
import PropTypes from "prop-types";

const cl = new cloudinary.Cloudinary({
  cloud_name: 'dwodczt0e', 
  api_key: '246222394918621', 
  api_secret: '7R2jwsxRXL9VZrU5CH1YlgGGVxc' 
});

const DragAndDrop = ({ onImageDrop }) => {
  const [dragging, setDragging] = useState(false);

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
  
    if (file) {
      try {
        // Crear un objeto FormData para la carga
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'images'); // Reemplaza con tu upload preset

        const response = await fetch(cl.url('https://api.cloudinary.com/v1_1/dwodczt0e/image/upload', {
          secure: true,
          upload_preset: 'images',
          cloud_name: 'dwodczt0e',
          api_key: '246222394918621',
          api_secret: '7R2jwsxRXL9VZrU5CH1YlgGGVxc'
        }), {
          method: 'POST',
          body: formData,
        });
        
        console.log(response);

        if (response.ok) {
          const data = await response.json();
          console.log('Imagen subida exitosamente:', data.secure_url);
        } else {
          // Manejo de errores si la respuesta no es exitosa
          const errorData = await response.json();
          console.error('Error al subir la imagen:', errorData.message);
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    } else {
      console.error('No se seleccionó ningún archivo.');
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
      <p>
        {dragging
          ? "Suelta la imagen aquí"
          : "Arrastra y suelta la imagen aquí o haz clic para seleccionarla"}
      </p>

      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          onImageDrop(file);
        }}
      />
      <button
        onClick={() => {
          const fileInput = document.querySelector("input[type='file']");
          fileInput.click();
        }}
      >
        Seleccionar imagen
      </button>
    </div>
  );
};

DragAndDrop.propTypes = {
  onImageDrop: PropTypes.func.isRequired,
};

export default DragAndDrop;
