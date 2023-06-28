import React from "react";

import "./App.css";

function App() {
  const handleGet = () => {
    window.location.href = "http://localhost:3000/futbol";
  };

  const handlePost = () => {
    const nombre = window.prompt("Ingrese el nombre del equipo:");
    const liga = window.prompt("Ingrese la liga del equipo:");
    const pais = window.prompt("Ingrese el país del equipo:");
  
    if (nombre) {
      const newTeam = {
        nombre: nombre,
        liga: liga,
        pais: pais,
      };
      console.log(newTeam);
      fetch("http://localhost:3000/meterEquipo?nombre="+newTeam.nombre+"&liga="+newTeam.liga+"&pais="+newTeam.pais, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeam),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("POST response:", data);
          // Realiza las acciones adicionales después de realizar la solicitud POST si es necesario
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  

  const handleDelete = () => {
    const userInput = window.prompt("Ingrese el nombre del equipo a eliminar:");

    if (userInput) {
      fetch("http://localhost:3000/eliminarEquipo/" + userInput, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreEquipo: userInput }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("DELETE response:", data);
          // Realiza las acciones adicionales después de eliminar el equipo si es necesario
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handlePut = () => {
    const userInput = window.prompt("Ingrese el nombre del equipo a actualizar:");
    const nombre = window.prompt("Ingrese el nuevo nombre:");
    const liga = window.prompt("Ingrese la liga: ");
    const pais = window.prompt("Ingrese el pais: ");
    if (userInput) {
      const updatedData = {
        nombre: nombre,
        liga: liga, // Agrega aquí la liga actualizada del equipo
        pais: pais // Agrega aquí el país actualizado del equipo
      };
  
      // Aquí debes agregar la lógica para obtener la liga y el país actualizados del formulario o de alguna otra fuente
  
      fetch("http://localhost:3000/actualizarEquipo/"+userInput+"?nombre="+nombre+"&liga="+liga+"&pais="+pais, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("PUT response:", data);
          // Realiza las acciones adicionales después de actualizar el equipo si es necesario
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    location.reload()
  };
  
  

  return (
    <center>
      <div className="App">
        <button className="my-button" onClick={handleGet}>
          GET
        </button>
        <button className="my-button" onClick={handlePost}>
          POST
        </button>
        <button className="my-button" onClick={handleDelete}>
          DELETE
        </button>
        <button className="my-button" onClick={handlePut}>
          PUT
        </button>
      </div>
    </center>
  );
}

export default App;
