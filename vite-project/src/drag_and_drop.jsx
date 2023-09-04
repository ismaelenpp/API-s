import React, { useState } from "react";
////////
import axios from "axios";

const DragAndDrop = async ({ onImageDrop }) => {
  const [dragging, setDragging] = useState(false);

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    onImageDrop(file);
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const cloudName = "dajnd6hfe";
        const apiKey = "643243133882548";
        const apiSecret = "Hqac499b90mUnZApKhIHUgpLCzc";

        const timestamp = Date.now() / 1000;
        const signature = await generateSignature(cloudName, apiKey, apiSecret, timestamp
        );

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, 
          formData, { 
            headers: { "X-Requested-With": "XMLHttpRequest", }, 
            params: { timestamp, signature, }, 
          });
        
          console.log("Imagen subida a Cloudinary:", response.data);  
        
        } catch (error) { console.error("Error al subir la imagen:", error); } }
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
              const fileInput = document.querySelector("input[type='file']"); fileInput.click();
            }} > Seleccionar imagen </button>

        </div>
      );
    };

    export default DragAndDrop;
