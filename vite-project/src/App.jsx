import React, { useState, useEffect } from "react";
import "./App.css";
import BtnPut from "./BtnPut";
import BtnDelete from "./Button";
import TableComponent from "./Tablecomp";

function App() {
  const [tableHtml, setTableHtml] = useState("");

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

  const handlePost = () => {
    const nombre = window.prompt("Ingrese el nombre del equipo:");
    const liga = window.prompt("Ingrese la liga del equipo:");
    const pais = window.prompt("Ingrese el país del equipo:");
    const descripcion = window.prompt("Ingrese la descripcion del equipo:");
    const imagen = window.prompt("Ingrese la imagen del equipo:");

    if (nombre && liga && pais && descripcion && imagen) {
      const newTeam = {
        nombre: nombre,
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

  const handleDelete = () => {
    const nombre = window.prompt("Ingrese el nombre del equipo:");
    fetch(`http://localhost:3000/eliminarEquipo/${nombre}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DELETE response:", data);
        handleGet(); // Refresh the table data after successful DELETE
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePut = () => {
    const nombreC = window.prompt("Ingrese el nombre:");
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

      fetch(
        `http://localhost:3000/actualizarEquipo/` +
          nombreC +
          `?nombre=` +
          nombre +
          `&liga=a&pais=a`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("PUT response:", data);
          handleGet(); // Refresh the table data after successful PUT
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <center>
      <div className="App" style={{ padding: "30px" }}>
        <button
          class="btn btn-outline-success"
          onClick={handleGet}
          style={{ marginLeft: "22px" }}
        >
          GET
        </button>
        <button
          class="btn btn-outline-primary"
          onClick={handlePost}
          style={{ marginLeft: "22px" }}
        >
          POST
        </button>
        <TableComponent />
      </div>
    </center>
  );
}

export default App;
