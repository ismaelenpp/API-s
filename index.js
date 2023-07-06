const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");


// MySQL connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "ismael",
  password: "ismaelenp1234",
  database: "futbol",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// GET EQUIPO
app.get("/futbol", (req, res) => {
  const query = "SELECT * FROM equipos";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const equipos = results;

// Generate HTML table
let tableHtml = "<table class='table table-hover table-bordered'>";
tableHtml +=
  "<tr style='background-color: gray; color: white;'><th>ID</th><th>Nombre</th><th>Liga</th><th>País</th><th>Descripción</th><th>Imagen</th><th>Acciones</th></tr>";

for (const equipo of equipos) {
  tableHtml += `<tr><td>${equipo.id}</td><td>${equipo.nombre}</td><td>${equipo.liga}</td><td>${equipo.pais}</td><td>${equipo.descripcion}</td><td>${equipo.imagen}</td><td><button class='btn btn-outline-danger'>🗑️</button> <button class='btn btn-outline-warning'>✏️</button></td></tr>`;
}

tableHtml += "</table>";


    // Send HTML response
    res.send(tableHtml);
  });
});

// POST EQUIPO
app.post("/meterEquipo", (req, res) => {
  const { nombre, liga, pais, descripcion, imagen } = req.body;
  const query =
    "INSERT INTO `equipos`(`nombre`, `liga`, `pais`, `descripcion`, `imagen`) VALUES (?,?,?,?,?)";
  const values = [nombre, liga, pais, descripcion, imagen];

  connection.query(query, values, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const newTeam = {
      id: result.insertId,
      nombre,
      liga,
      pais,
      descripcion,
      imagen,
    };

    res.status(201).json(newTeam);
  });
});

// PUT DE EQUIPO
app.put("/actualizarEquipo/:nombreEquipo", (req, res) => {
  const { nombre, liga, pais, descripcion, imagen } = req.body;
  const { nombreEquipo } = req.params;
  const query =
    "UPDATE equipos SET nombre = ?, liga = ?, pais = ?, descripcion = ?, imagen = ? WHERE nombre = ?";
  const values = [nombre, liga, pais, descripcion, imagen, nombreEquipo];

  connection.query(query, values, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Team not found" });
      return;
    }

    res.status(200).json({ message: "Team updated successfully" });
  });
});

// DELETE EQUIPO
app.delete("/eliminarEquipo/:nombreEquipo", (req, res) => {
  const { nombreEquipo } = req.params;
  const query = "DELETE FROM equipos WHERE nombre = ?";

  connection.query(query, nombreEquipo, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Team not found" });
      return;
    }

    res.status(200).json({ message: "Team deleted successfully" });
  });
});

// Close the MySQL connection when the app is terminated
process.on("SIGINT", () => {
  connection.end();
  process.exit();
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
