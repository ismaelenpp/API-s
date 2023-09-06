import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import BtnDelete from "./Button";
import BtnPut from "./BtnPut";
import ImageComponent from "./ImageComponent";
import Formulario2 from "./Formulario2";

const TableComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    fetch(`http://localhost:3000/eliminarEquipo/${nombreEquipo}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DELETE response:", data);
        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    window.location.reload(false);
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};

export default TableComponent;
