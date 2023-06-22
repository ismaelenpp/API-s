/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable indent */

const { metodoget, metodopost2, metodoput, metodoput2, metododelete, metododelete2 } = require('./src/funciones.js');
const express = require("express");
const app = express();

//GET EQUIPO Y JUGADOR
app.get("/futbol", (req, res) => {
    metodoget(req, res);
});

//POST EQUIPO
app.post("/meterEquipo", (req, res) => {
    metodopost(req, res);
});

//POST DE JUGADOR
app.post("/meterJugador", (req, res) => {
    metodopost2(req, res);
  });

// PUT DE EQUIPO
app.put("/actualizarEquipo/:nombreEquipo", (req, res) => {
    metodoput(req, res);
});

//PUT DE JUGADOR
app.put("/actualizarJugador/:nombreJugador", (req, res) => {
    metodoput2(req, res);
});

//Delete EQUIPO
app.delete("/eliminarEquipo/:nombreEquipo", (req, res) => {
    metododelete(req, res);
});

//Delete jugador
app.delete("/eliminarJugador/:nombreJugador", (req, res) => {
    metododelete2(req, res);
});

//Donde se abre la página
const port = 1000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});