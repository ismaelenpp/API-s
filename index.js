const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const { enviartoken, sha256 } = require("./Funciones/funcionesUtiles");
const filestack = require("filestack-js");
const client = filestack.init("AZOIMYcHQJq6ZI7YPI0BEz");
const ncrypt = require("ncrypt-js");
const _secretKey = "some-super-secret-key";
const ncryptObject = new ncrypt(_secretKey);


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

// Eliminar imagen de Cloudinary
app.delete("/eliminarimagen/:eliminate", async (req, res) => {
    const { eliminate } = req.params;
    console.log(eliminate)
    const API_KEY = "AZOIMYcHQJq6ZI7YPI0BEz";
    const secretKey = "T5EHAT5TXZH6HJHUVBJRH5N6TE";
    const policyObject = {
      "call": ["remove"],
      "expiry": 1698795000,
      "handle": eliminate,
    };

  const base64Policy = btoa(JSON.stringify(policyObject))
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  console.log("base64Policy", base64Policy);
    const policyAndKey = base64Policy + secretKey;
    //console.log("policyAndKey", policyAndKey);
    const signature = sha256(policyAndKey);
    console.log("signature", signature);

    try {
      const response = await fetch(
          `https://www.filestackapi.com/api/file/${eliminate}?key=${API_KEY}&policy=${base64Policy}&signature=${signature}`,
          {
            method: "DELETE",
          }
      );

      if (response.ok) {
        console.log("Imagen eliminada con éxito");
      } else {
        console.error("Error al eliminar la imagen:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }

});

// POST para agregar un usuario a la tabla "usuarios"
app.post("/meterGmail", async (req, res) => {
  const { correo } = req.body;

  // Verificar si el correo ya existe en la base de datos
  const checkEmailQuery = "SELECT * FROM usuarios WHERE correo = ?";
  connection.query(checkEmailQuery, [correo], async (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (result && result.length > 0) {
      // El correo ya existe en la base de datos
      // Generar un nuevo token
      const numeroAleatorio = Math.floor(Math.random() * 900000) + 100000;

      // Actualizar el token en la base de datos
      const updateTokenQuery =
        "UPDATE usuarios SET codigo = ? WHERE correo = ?";
      connection.query(
        updateTokenQuery,
        [numeroAleatorio, correo],
        (error, updateResult) => {
          if (error) {
            console.error("Error updating token:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          // Envía el nuevo token por correo electrónico
          enviartoken(correo, numeroAleatorio, res);

          res
            .status(200)
            .json({ message: "Token actualizado y enviado por correo" });
        }
      );
    } else {
      // El correo no existe en la base de datos, procede a agregarlo
      // Generar un valor único para id (número aleatorio más pequeño)
      const idUnico = Math.floor(Math.random() * 100000); // Valor más pequeño
      const numeroAleatorio = Math.floor(Math.random() * 900000) + 100000;
      const query =
        "INSERT INTO `usuarios`(`id`, `correo`, `codigo`, `rol`) VALUES (?,?,?,?)";
      const values = [idUnico, correo, numeroAleatorio, "usuario"];
      connection.query(query, values, async (error, insertResult) => {
        if (error) {
          console.error("Error executing MySQL query:", error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        // Envía el token por correo electrónico
        enviartoken(correo, numeroAleatorio, res);

        res
          .status(201)
          .json({ message: "Usuario creado y token enviado por correo" });
      });
    }
  });
});

app.post("/verificarCodigo", (req, res) => {
  const { codigo } = req.body;
  const { email } = req.body;
  const query = "SELECT * FROM usuarios WHERE codigo = ?";
  const values = [codigo];
  const values2 = [email];

  try {
    connection.query(query, values, (error, result) => {
      if (error) {
        console.error("Error executing MySQL query:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (!result || result.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      if (result[0].codigo == codigo && result[0].correo == email) {
        res.status(200).json({ message: "Token Correcto" });
      } else {
        res.status(401).json({ error: "Token Incorrecto" });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
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
