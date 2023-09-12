//import cloudinary from "cloudinary-core";

import { useState, useRef } from "react"; // Agrega useRef a las importaciones
import PropTypes from "prop-types";


const DragAndDrop = ({ onImageDrop }) => {
  const [dragging, setDragging] = useState(false);
  const [selectedImage] = useState(null);

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    onImageDrop(file);
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
