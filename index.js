const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const { enviartoken } = require("./Funciones/funcionesUtiles");
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   service: "Gmail",
//   auth: {
//     user: "collakebab@gmail.com", // Cambia esto a tu dirección de correo electrónico
//     pass: "ikac zxxq yuoc jins", // Cambia esto a tu contraseña de correo electrónico
//   },
// });


cloudinary.v2.config({
  cloud_name: "dwodczt0e",
  api_key: "246222394918621",
  api_secret: "7R2jwsxRXL9VZrU5CH1YlgGGVxc",
  secure: true,
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// MySQL connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "futbol",
  port: "3306",
});

const pool = mysql.createPool(connection);
const promisePool = pool.promise();
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
app.get("/futbol", async (req, res) => {
  try {
    const [rows, fields] = await promisePool.query("SELECT * FROM equipos");
    res.status(200).json({ equipos: rows });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST EQUIPO
app.post("/meterEquipo", async (req, res) => {
  const { nombre, liga, pais, descripcion, imagen } = req.body;

  try {
    const [lastIdRow] = await promisePool.query("SELECT MAX(id) AS lastId FROM equipos");
    const lastId = lastIdRow[0].lastId || 0;
    const newId = lastId + 1;

    const query =
        "INSERT INTO `equipos`(`id`, `nombre`, `liga`, `pais`, `descripcion`, `imagen`) VALUES (?,?,?,?,?,?)";
    const values = [newId, nombre, liga, pais, descripcion, imagen];

    const [result] = await promisePool.query(query, values);

    const newTeam = {
      id: newId,
      nombre,
      liga,
      pais,
      descripcion,
      imagen,
    };

    res.status(201).json(newTeam);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// PUT DE EQUIPO
app.put("/actualizarEquipo/:nombreEquipo", async (req, res) => {
  const { nombre, liga, pais, descripcion, imagen } = req.body;
  const { nombreEquipo } = req.params;

  try {
    const query =
        "UPDATE equipos SET nombre = ?, liga = ?, pais = ?, descripcion = ?, imagen = ? WHERE nombre = ?";
    const values = [nombre, liga, pais, descripcion, imagen, nombreEquipo];

    const [result] = await promisePool.query(query, values);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Team not found" });
    } else {
      res.status(200).json({ message: "Team updated successfully" });
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// DELETE EQUIPO
app.delete("/eliminarEquipo/:nombreEquipo", async (req, res) => {
  const { nombreEquipo } = req.params;

  try {
    const deleteQuery = "DELETE FROM equipos WHERE nombre = ?";
    const [result] = await promisePool.query(deleteQuery, nombreEquipo);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Team not found" });
    } else {
      // Any additional logic after deleting a team can be placed here
      res.status(200).json({ message: "Team deleted successfully" });
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Eliminar imagen de Cloudinary
app.delete("/eliminar-imagen/:public_id", async (req, res) => {
  console.log("Imagen a eliminar:", req.params.public_id);
  const { public_id } = req.params;
  console.log("public_id:", public_id);

  try {
    await cloudinary.v2.uploader.destroy(public_id, (error, result) => {
      if (error) {
        console.error("Error al eliminar la imagen:", error);
        res.status(500).json({ error: "Error interno del servidor" });
        return;
      }
      console.log("Resultado de la eliminación:", result);
    });
    res.json({ message: "Imagen eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// POST para agregar un usuario a la tabla "usuarios"
app.post("/meterGmail", async (req, res) => {
  const { correo } = req.body;
  let numeroAleatorio = Math.floor(Math.random() * 900000) + 100000;
  console.log(correo);

  try {
    const [lastIdRow] = await promisePool.query("SELECT MAX(id) AS lastId FROM usuarios");
    let lastId = lastIdRow[0].lastId || 0;
    const newId = lastId + 1;

    const insertQuery = "INSERT INTO `usuarios`(`id`, `correo`, `codigo`, `rol`) VALUES (?,?,?,?)";
    const values = [newId, correo, numeroAleatorio, "usuario"];

    const [result] = await promisePool.query(insertQuery, values);

    const newUser = {
      id: newId,
      correo,
      codigo: numeroAleatorio,
      rol: "usuario",
    };

    res.status(201).json(newUser);

    enviartoken(correo, numeroAleatorio);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
