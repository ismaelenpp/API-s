import React, { useEffect, useState } from "react";
import BtnDelete from "./Button";
import BtnPut from "./BtnPut";

const TableComponent = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3000/futbol")
      .then((response) => response.json())
      .then((data) => {
        setTableData(data.equipos); // Actualizar a data.equipos
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
        fetchData(); // Refresh the table data after successful DELETE
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePut = (equipo) => {
    const nombreC = equipo.nombre;
    const nombre = window.prompt("Ingrese el nuevo nombre:");
    const liga = window.prompt("Ingrese la nueva liga:");
    const pais = window.prompt("Ingrese el nuevo país:");
    const descripcion = window.prompt("Ingrese la descripción:");
    const imagen = window.prompt("Ingrese el enlace de la imagen:");

    if (nombre && liga && pais && descripcion && imagen) {
      const updatedData = {
        nombre: nombre,
        liga: liga,
        pais: pais,
        descripcion: descripcion,
        imagen: imagen,
      };

      fetch(`http://localhost:3000/actualizarEquipo/${nombreC}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("PUT response:", data);
          fetchData(); // Refresh the table data after successful PUT
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
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
            <td>{equipo.nombre.toString()}</td>
            <td>{equipo.liga.toString()}</td>
            <td>{equipo.pais.toString()}</td>
            <td>{equipo.descripcion.toString()}</td>
            <td>{equipo.imagen.toString()}</td>
            <td>
              <BtnDelete
                text={"DELETE"}
                onClick={() => handleDelete(equipo.nombre)}
                className={"btn btn-outline-warning"}
              />
              <BtnPut
                text={"PUT"}
                onClick={() => handlePut(equipo)}
                className={"btn btn-outline-warning"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
