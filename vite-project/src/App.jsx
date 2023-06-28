import React from "react";

import "./App.css";

function App() {
  const handleGet = () => {
    window.location.href = "http://localhost:3000/futbol";
  };

  const handlePost = () => {
    // Código para el método POST
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
    const newTeamName = window.prompt("Ingrese el nuevo nombre para el equipo:");
    const newLeague = window.prompt("Ingrese la nueva liga para el equipo:");
    const newCountry = window.prompt("Ingrese el nuevo país para el equipo:");

    if (userInput && newTeamName && newLeague && newCountry) {
      const updatedTeam = {
        nombre: newTeamName,
        liga: newLeague,
        pais: newCountry,
      };

      fetch("http://localhost:3000/actualizarEquipo/" + userInput, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTeam),
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
