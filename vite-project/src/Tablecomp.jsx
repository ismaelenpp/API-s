import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import BtnDelete from "./ButtonDelete";
import BtnPut from "./BtnPut";
import BtnVideo from "./BtnVideo";
import ImageComponent from "./ImageComponent";
import Formulario2 from "./Formulario2";
import BtnEstadio from "./BtnEstadio";
import EstadioScreen from "./EstadioScreen";

const TableComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState("");
  const [showEstadio, setShowEstadio] = useState(false); // Ocultar Estadio al principio

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3000/futbol")
      .then((response) => response.json())
      .then((data) => {
        setTableData(data.equipos);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (nombreEquipo) => {
    setDeleteConfirmation(true);
    setTeamToDelete(nombreEquipo);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:3000/eliminarEquipo/${teamToDelete}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DELETE response:", data);
        fetchData();
        setDeleteConfirmation(false); // Cerrar el modal de confirmación aquí
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const cancelDelete = () => {
    setDeleteConfirmation(false);
    setTeamToDelete("");
  };

  const handlePut = (equipo) => {
    setEquipoSeleccionado(equipo);
    setShowModal(true);
  };

  const handleEdit = (equipoEditado) => {
    const nombreEquipoAnterior = equipoSeleccionado.nombre;

    fetch(`http://localhost:3000/actualizarEquipo/${nombreEquipoAnterior}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(equipoEditado),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("PUT response:", data);
        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setEquipoSeleccionado(null);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setEquipoSeleccionado(null);
    setShowModal(false);
  };

  return (
    <div className="table-responsive">
      <Row>
        {showEstadio ? (
          <React.Fragment>
            <Col md={7}>
              <Row>
                <Col md={12}>
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Liga</th>
                        <th>País</th>
                        <th>Descripción</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((equipo) => (
                        <tr key={equipo.id}>
                          <td>{equipo.id}</td>
                          <td>{equipo.nombre}</td>
                          <td>{equipo.liga}</td>
                          <td>{equipo.pais}</td>
                          <td>{equipo.descripcion}</td>
                          <td>
                            <ImageComponent imageString={equipo.imagen} />
                          </td>
                          <td>
                            <BtnDelete
                              text={"🗑️"}
                              onClick={() => handleDelete(equipo.nombre)}
                              className={
                                "btn btn-outline-danger button-separation"
                              }
                            />
                            <BtnPut
                              text={"✏️"}
                              onClick={() => handlePut(equipo)}
                              className={"btn btn-outline-warning"}
                            />
                            <BtnEstadio
                              text={"🏟"}
                              onClick={() => setShowEstadio(false)}
                              className={
                                "btn btn-outline-success button-separation"
                              }
                            />
                            <BtnVideo
                              text={"🎥"}
                              className={
                                "btn btn-outline-info button-separation"
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </Col>
            <Col md={5}>
              <EstadioScreen />
            </Col>
          </React.Fragment>
        ) : (
          <Col md={12}>
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Liga</th>
                  <th>País</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((equipo) => (
                  <tr key={equipo.id}>
                    <td>{equipo.id}</td>
                    <td>{equipo.nombre}</td>
                    <td>{equipo.liga}</td>
                    <td>{equipo.pais}</td>
                    <td>{equipo.descripcion}</td>
                    <td>
                      <ImageComponent imageString={equipo.imagen} />
                    </td>
                    <td>
                      <BtnDelete
                        text={"🗑️"}
                        onClick={() => handleDelete(equipo.nombre)}
                        className={"btn btn-outline-danger button-separation"}
                      />
                      <BtnPut
                        text={"✏️"}
                        onClick={() => handlePut(equipo)}
                        className={"btn btn-outline-warning"}
                      />
                      <BtnEstadio
                        text={"🏟"}
                        onClick={() => setShowEstadio(true)}
                        className={"btn btn-outline-success button-separation"}
                      />
                      <BtnVideo
                        text={"🎥"}
                        className={"btn btn-outline-info button-separation"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        )}
      </Row>

      {equipoSeleccionado && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Equipo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formulario2
              equipoSeleccionado={equipoSeleccionado}
              onEdit={handleEdit}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {deleteConfirmation && (
        <Modal show={deleteConfirmation} onHide={cancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Quieres eliminar el equipo <strong>{teamToDelete}</strong>?
            <br />
            Clique dos veces en <strong>BORRAR</strong> para eliminarlo
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Borrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};
export default TableComponent;
