import React, { useState } from "react";

const DragAndDrop = ({ onImageDrop }) => {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
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
    </div>
  );
};

export default DragAndDrop;
