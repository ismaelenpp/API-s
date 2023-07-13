import React, { useEffect, useState } from 'react';
import Button from "./Button";
import BtnPut from "./BtnPut";
import mysql from "mysql";
import url from "url";

const connection = mysql.createConnection({
  host: "localhost",
  user: "sergimg",
  password: "admin1234",
  database: "futbol",
});

const TableComponent = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:5173/futbol")
      .then((response) => {
        const query = "SELECT * FROM equipos";

        connection.query(query, (error, results) => {
          if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          const equipos = results;
          // Generate HTML table
          // let tableHtml = "<table class='table table-hover table-bordered'>";
          // tableHtml +=
          //   "<tr style='background-color: gray; color: white;'><th>ID</th><th>Nombre</th><th>Liga</th><th>País</th><th>Descripción</th><th>Imagen</th><th>Acciones</th></tr>";

          // for (const equipo of equipos) {
          //   tableHtml += `<tr><td>${equipo.id}</td><td>${equipo.nombre}</td><td>${equipo.liga}</td><td>${equipo.pais}</td><td>${equipo.descripcion}</td><td>${equipo.imagen}</td><td><button class='btn btn-outline-danger'>🗑️</button> <button class='btn btn-outline-warning'>✏️</button></td></tr>`;
          // }

          // tableHtml += "</table>";


          // Send HTML response
          console.log(equipos);
          response.json(equipos);
        });
      })
      .then((data) => setData(data.message));
  }, []);

  const handleClick = () => {
    console.log('¡Haz hecho clic en el botón!');
    console.log(setTableHtml);

  };

  return (

    <table class='table table-hover table-bordered'>
      <tr><th>ID</th><th>Nombre</th><th>Liga</th><th>País</th><th>Descripción</th><th>Imagen</th><th>Acciones</th></tr>
      <tr><td>e</td><td>e</td><td>e</td><td>e</td><td>e</td><td>e</td><td>{<Button text={"DELETE"} onClick={handleClick} className={"btn btn-outline-warning"}></Button>}
        {<BtnPut text={"PUT"} onClick={handleClick} className={"btn btn-outline-warning"}></BtnPut>}</td></tr>
    </table>

  );
};



export default TableComponent;