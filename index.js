const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// MySQL connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "ismael",
  password: "ismaelenp1234",
  database: "futbol",
  port: "3306",
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
  optionsSuccessStatus: 200,
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
    res.status(200).json({ equipos });
  });
});

// POST EQUIPO
app.post("/meterEquipo", (req, res) => {
  const { nombre, liga, pais, descripcion, imagen } = req.body;
  // Obtener la última ID
  const getLastIdQuery = "SELECT MAX(id) AS lastId FROM equipos";
  connection.query(getLastIdQuery, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    let lastId = result[0].lastId || 0;
    const newId = lastId + 1;
    const query =
      "INSERT INTO `equipos`(`id`, `nombre`, `liga`, `pais`, `descripcion`, `imagen`) VALUES (?,?,?,?,?,?)";
    const values = [newId, nombre, liga, pais, descripcion, imagen];
    connection.query(query, values, (error, result) => {
      if (error) {
        console.error("Error executing MySQL query:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      const newTeam = {
        id: newId,
        nombre,
        liga,
        pais,
        descripcion,
        imagen,
      };
      res.status(201).json(newTeam);
    });
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
  const deleteQuery = "DELETE FROM equipos WHERE nombre = ?";
  connection.query(deleteQuery, nombreEquipo, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Team not found" });
      return;
    }
    // Aquí puedes realizar cualquier lógica adicional después de eliminar un equipo
    res.status(200).json({ message: "Team deleted successfully" });
  });
});

// POST para agregar un usuario a la tabla "usuarios"
app.post("/meterGmail", (req, res) => {
  const { correo } = req.body;
  // Obtener la última ID
  const getLastIdQuery = "SELECT MAX(id) AS lastId FROM usuarios";
  connection.query(getLastIdQuery, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    let numeroAleatorio = Math.floor(Math.random() * 900000) + 100000;

    let lastId = result[0].lastId || 0;
    const newId = lastId + 1;
    const query =
      "INSERT INTO `usuarios`(`id`, `correo`, `codigo`, `rol`) VALUES (?,?,?,?)";

    const values = [newId, correo, numeroAleatorio, "usuario"];
    connection.query(query, values, (error, result) => {
      if (error) {
        console.error("Error executing MySQL query:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      const newUser = {
        id: newId,
        correo,
        codigo: numeroAleatorio,
        rol: "usuario",
      };
      res.status(201).json(newUser);
    });
  });
});

// Cerrar la conexión MySQL cuando la aplicación se termine
process.on("SIGINT", () => {
  connection.end();
  process.exit();
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
