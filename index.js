const express = require("express");
const app = express();
const fs = require("fs");

//GET EQUIPO
app.get("/futbol", (req, res) => {
  // Leer el archivo JSON
  fs.readFile("src/bd.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Parsear los datos del archivo JSON
    const equipos = JSON.parse(data).equipos;
    // Enviar los datos de los equipos en la respuesta
    res.json({ equipos });
  });
});

//POST EQUIPO
app.post("/meterEquipo", (req, res) => {
  // Lee el archivo JSON
  fs.readFile("src/bd.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Parse al JSON
    const jsonData = JSON.parse(data);

    // Sacar la info de los equipos del JSON
    const equipos = jsonData.equipos;

    // Crea una constante para el nuevo equipo
    const newTeam = {
      nombre: req.query.nombre,
      liga: req.query.liga,
      pais: req.query.pais,
    };

    // Añade el equipo
    equipos.push(newTeam);

    // Actualiza el JSON
    fs.writeFile("src/bd.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.status(201).json(newTeam);
    });
  });
});

// PUT DE EQUIPO
app.put("/actualizarEquipo/:nombreEquipo", (req, res) => {
  fs.readFile("src/bd.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    const jsonData = JSON.parse(data);

    const equipos = jsonData.equipos;

    // Busca el equipo
    const teamIndex = equipos.findIndex(
      (equipo) => equipo.nombre === req.params.nombreEquipo
    );

    if (teamIndex === -1) {
      res.status(404).json({ error: "Team not found" });
      return;
    }

    // Actualiza la información
    equipos[teamIndex].nombre = req.query.nombre || equipos[teamIndex].nombre;
    equipos[teamIndex].liga = req.query.liga || equipos[teamIndex].liga;
    equipos[teamIndex].pais = req.query.pais || equipos[teamIndex].pais;

    // Actualiza el JSON
    fs.writeFile("src/bd.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.status(200).json({ message: "Team updated successfully" });
    });
  });
});

//Delete EQUIPO
app.delete("/eliminarEquipo/:nombreEquipo", (req, res) => {

  fs.readFile("src/bd.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const jsonData = JSON.parse(data);

    // Busca el equipo
    const teamIndex = jsonData.equipos.findIndex(
      (equipo) => equipo.nombre === req.params.nombreEquipo
    );

    if (teamIndex === -1) {
      res.status(404).json({ error: "Team not found" });
      return;
    }

    // Elimina el equipo
    jsonData.equipos.splice(teamIndex, 1);

    // Actualiza el JSON
    fs.writeFile("src/bd.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.status(200).json({ message: "Team deleted successfully" });
    });
  });
});

//Donde se abre la página
const port = 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});