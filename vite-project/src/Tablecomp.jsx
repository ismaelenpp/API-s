import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import BtnDelete from "./ButtonDelete";
import BtnPut from "./BtnPut";
import BtnVideo from "./BtnVideo";
import ImageComponent from "./ImageComponent";
import Formulario2 from "./Formulario2";
import BtnEstadio from "./BtnEstadio";
import EstadioScreen from "./EstadioScreen";
import DataTable from "react-data-table-component"; // Importa el componente DataTable
import { Background } from "@cloudinary/url-gen/qualifiers";

const TableComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState("");
  const [showEstadio, setShowEstadio] = useState(false);
  const [filterText, setFilterText] = useState(""); // Estado para el texto de filtrado

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
        setDeleteConfirmation(false);
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

  // Función para filtrar la tabla
  const filteredData = tableData.filter((equipo) =>
    equipo.nombre.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      {showEstadio ? (
        <React.Fragment>
          <div className="container row">
            <div className="col-sm-12 col-md-8 col-xl-8">
              {/* Agrega el campo de entrada para filtrar la tabla */}
              <input
                type="text"
                placeholder="Filtrar por nombre"
                onChange={(e) => setFilterText(e.target.value)}
                value={filterText}
              />
              <DataTable
                columns={[
                  {
                    name: "Nombre",
                    selector: "nombre",
                    sortable: true,
                  },
                  {
                    name: "Liga",
                    selector: "liga",
                    sortable: true,
                  },
                  {
                    name: "País",
                    selector: "pais",
                    sortable: true,
                  },
                  {
                    name: "Descripción",
                    selector: "descripcion",
                    sortable: true,
                  },
                  {
                    name: "Imagen",
                    cell: (row) => <ImageComponent imageString={row.imagen} />,
                  },
                  {
                    name: "Acciones",
                    cell: (row) => (
                      <div className="d-flex flex-wrap">
                        <div className="row">
                          <div className="col-md-6 mb-2">
                            <BtnDelete
                              text={"🗑️"}
                              onClick={() => handleDelete(row.nombre)}
                              className={
                                "btn btn-outline-danger btn-sm btn-block"
                              }
                            />
                          </div>
                          <div className="col-md-6 mb-2">
                            <BtnPut
                              text={"✏️"}
                              onClick={() => handlePut(row)}
                              className={
                                "btn btn-outline-warning btn-sm btn-block"
                              }
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-2">
                            <BtnEstadio
                              text={"🏟"}
                              onClick={() => setShowEstadio(false)}
                              className={
                                "btn btn-outline-success btn-sm btn-block"
                              }
                            />
                          </div>
                          <div className="col-md-6 mb-2">
                            <BtnVideo
                              text={"🎥"}
                              className={
                                "btn btn-outline-info btn-sm btn-block"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ),
                  },
                ]}
                data={filteredData} // Usar los datos filtrados
                pagination
              />
            </div>
            <div className="col-sm-12 col-md-4 col-xl-4">
              <EstadioScreen />
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="container row" class="w-100s p-3">
          <input
            type="text"
            placeholder="Filtrar por nombre"
            onChange={(e) => setFilterText(e.target.value)}
            value={filterText}
          />

          <DataTable
            columns={[
              {
                name: "Nombre",
                selector: "nombre",
                sortable: true,
                minWidth: "150px", // Ajusta el ancho mínimo de la columna
              },
              {
                name: "Liga",
                selector: "liga",
                sortable: true,
                minWidth: "150px", // Ajusta el ancho mínimo de la columna
              },
              {
                name: "País",
                selector: "pais",
                sortable: true,
                minWidth: "150px", // Ajusta el ancho mínimo de la columna
              },
              {
                name: "Descripción",
                selector: "descripcion",
                sortable: true,
                minWidth: "200px", // Ajusta el ancho mínimo de la columna
              },
              {
                name: "Imagen",
                cell: (row) => <ImageComponent imageString={row.imagen} />,
                minWidth: "100px", // Ajusta el ancho mínimo de la columna
              },
              {
                name: "Acciones",
                cell: (row) => (
                  <div className="d-flex justify-content-center align-items-center">
                    <BtnDelete
                      text={"🗑️"}
                      onClick={() => handleDelete(row.nombre)}
                      className={
                        "btn btn-outline-danger button-separation me-2"
                      }
                    />
                    <BtnPut
                      text={"✏️"}
                      onClick={() => handlePut(row)}
                      className={
                        "btn btn-outline-warning button-separation me-2"
                      }
                    />
                    <BtnEstadio
                      text={"🏟"}
                      onClick={() => setShowEstadio(true)}
                      className={
                        "btn btn-outline-success button-separation me-2"
                      }
                    />
                    <BtnVideo text={"🎥"} className={"btn btn-outline-info"} />
                  </div>
                ),
                minWidth: "300px", // Ajusta el ancho mínimo de la columna "Acciones"
              },
            ]}
            data={filteredData}
            pagination
          />
        </div>
      )}
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
