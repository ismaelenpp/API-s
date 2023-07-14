import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Formulario from "./Formulario";
import BtnPut from "./BtnPut";
import BtnDelete from "./Button";
import TableComponent from "./Tablecomp";

function App() {
  const [tableHtml, setTableHtml] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleGet = () => {
    fetch("http://localhost:3000/futbol")
      .then((response) => response.text())
      .then((data) => {
        setTableHtml(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    handleGet();
  }, []);

  const handlePost = (equipo, liga, pais, descripcion, imagen) => {
    if (equipo && liga && pais && descripcion && imagen) {
      const newTeam = {
        nombre: equipo,
        liga: liga,
        pais: pais,
        descripcion: descripcion,
        imagen: imagen,
      };

      fetch("http://localhost:3000/meterEquipo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeam),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("POST response:", data);
          handleGet(); // Refresh the table data after successful POST
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <center>
      <h1>EQUIPOS DE FUTBOL</h1>
      <div className="App" style={{ padding: "30px" }}>
        <Button
          variant="outline-primary"
          onClick={handleShowModal}
          style={{ marginBottom: "30px" }}
        >
          Añadir Equipo
        </Button>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Añadir Equipo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formulario onSubmit={handlePost} />
          </Modal.Body>
        </Modal>
        <TableComponent />
      </div>
    </center>
  );
}

export default App;
