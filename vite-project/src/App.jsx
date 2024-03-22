/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Formulario from "./Formulario";
import TableComponent from "./Tablecomp";
import gif1 from "./images/futbol_gif.gif";
import gif2 from "./images/futbol_gif.gif";
import { useLocation } from "react-router-dom";
function App() {
  const [tableHtml, setTableHtml] = useState("");
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const { email2 } = location.state || {};
  const handleGet = () => {
    fetch("http://localhost:3000/futbol")
      .then((response) => response.text())
      .then((data) => {
        console.log(email2);
        console.log(email2);
        console.log(email2);
        console.log(email2);
        setTableHtml(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    handleGet();
  });

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
          handleGet();
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

  const [hovered, setHovered] = useState(false);

  return (
    <center>
      <div
        style={{
          background: "linear-gradient(#c4c4c4, #fff)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={gif1}
            alt="GIF 1"
            style={{ width: "50px", marginRight: "10px" }}
          />
          <h1
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "48px",
              fontWeight: "bold",
              color: hovered ? "#03a99a" : "#03a99a",
              textShadow: "2px 2px #000",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {hovered ? "¡INETFUT!" : "EQUIPOS DE FÚTBOL"}
          </h1>
          <img
            src={gif2}
            alt="GIF 2"
            style={{ width: "50px", marginLeft: "10px" }}
          />
        </div>
      </div>
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
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
        <TableComponent />
      </div>
    </center>
  );
}

export default App;
