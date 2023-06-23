const express = require("express");
const app = express();
const fs = require("fs");

//GET EQUIPO Y JUGADOR
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
    const jugadores = JSON.parse(data).jugadores;
    // Enviar los datos de los equipos en la respuesta
    res.json({ equipos, jugadores });
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

//POST DE JUGADOR
app.post("/meterJugador", (req, res) => {
  // Lee el archivo JSON
  fs.readFile("src/bd.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Parse al JSON
    const jsonData = JSON.parse(data);

    // Crea una constante para el nuevo jugador
    const jugadores = jsonData.jugadores;

    // Pone la información del nuevo jugador
    const newPlayer = {
      nombre: req.query.nombre,
      equipo: req.query.equipo,
      posicion: req.query.posicion,
    };

    // Añade el jugador
    jugadores.push(newPlayer);

    // Actualiza el JSON
    fs.writeFile("src/bd.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.status(201).json(newPlayer);
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

//PUT DE JUGADOR
app.put("/actualizarJugador/:nombreJugador", (req, res) => {
  fs.readFile("src/bd.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const jsonData = JSON.parse(data);

    const jugadores = jsonData.jugadores;

    // Busca el jugador
    const playerIndex = jugadores.findIndex(
      (jugador) => jugador.nombre === req.params.nombreJugador
    );

    if (playerIndex === -1) {
      res.status(404).json({ error: "Player not found" });
      return;
    }

    // Actualiza la información del jugador
    jugadores[playerIndex].nombre = req.query.nombre || jugadores[playerIndex].nombre;
    jugadores[playerIndex].equipo = req.query.equipo || jugadores[playerIndex].equipo;
    jugadores[playerIndex].posicion = req.query.posicion || jugadores[playerIndex].posicion;

    // Actualiza el JSON
    fs.writeFile("src/bd.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.status(200).json({ message: "Player updated successfully" });
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

//Delete jugador
app.delete("/eliminarJugador/:nombreJugador", (req, res) => {
  fs.readFile("src/bd.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const jsonData = JSON.parse(data);

    // Busca el jugador
    jsonData.jugadores = jsonData.jugadores.filter(
      (jugador) => jugador.nombre !== req.params.nombreJugador
    );

    // Actualiza el JSON
    fs.writeFile("src/bd.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.status(200).json({ message: "Player deleted successfully" });
    });
  });
});

//Donde se abre la página
const port = 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});