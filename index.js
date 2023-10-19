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
const convert = require("js-sha256");
const crypto = require("crypto");

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

// Eliminar imagen de FileStack
// app.delete("/eliminarimagen/:eliminate", async (req, res) => {
//   const { eliminate } = req.params;
//   console.log(eliminate);
//   const API_KEY = "AZOIMYcHQJq6ZI7YPI0BEz";
//   const secretKey = "T5EHAT5TXZH6HJHUVBJRH5N6TE";
//   const policyObject = {
//     expiry: 1701390600,
//     handle: eliminate,
//     call: ["remove"],
//   };

//   const base64Policy = btoa(JSON.stringify(policyObject).toString());
//   console.log("base64", base64Policy);
//   const signature = crypto.createHmac("sha256", secretKey);
//   signature.update(base64Policy);
//   const hmac256 = signature.digest("hex");

//   try {
//     const response = await fetch(
//       `https://www.filestackapi.com/api/file/${eliminate}?key=${API_KEY}&policy=${base64Policy}&signature=${hmac256}`,
//       {
//         method: "DELETE",
//       }
//     );

//     if (response.ok) {
//       console.log("Imagen eliminada con éxito");
//     } else {
//       console.error(
//         "Error al eliminar la imagen:",

//         response.status,

//         response.statusText
//       );
//     }
//   } catch (error) {
//     console.error("Error al eliminar la imagen:", error);
//   }
// });

// POST para agregar un usuario a la tabla "usuarios"

app.post("/meterGmail", async (req, res) => {
  const { correo } = req.body;

  let numeroAleatorio = Math.floor(Math.random() * 900000) + 100000;

  const numeroAleatorioCorto = numeroAleatorio.toString().substring(0, 6);

  let codigoEncriptado = ncryptObject.encrypt(numeroAleatorioCorto);

  console.log(correo);

  // Obtener la última ID

  console.log("correo", correo);

  const getLastIdQuery = "SELECT MAX(id) AS lastId FROM usuarios";

  connection.query(getLastIdQuery, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);

      res.status(500).json({ error: "Internal Server Error" });

      return;
    }

    console.log("codigoEncriptado: " + codigoEncriptado);

    let lastId = result[0].lastId || 0;

    const newId = lastId + 1;

    const query =
      "INSERT INTO `usuarios`(`id`, `correo`, `codigo`, `rol`) VALUES (?,?,?,?)";

    const values = [newId, correo, codigoEncriptado, "usuario"];

    connection.query(query, values, (error, result) => {
      if (error) {
        console.error("Error executing MySQL query:", error);

        res.status(500).json({ error: "Internal Server Error" });

        return;
      }

      const newUser = {
        id: newId,

        correo,

        codigo: codigoEncriptado,

        rol: "usuario",
      };

      res.status(201).json(newUser);
    });
  });

  enviartoken(correo, codigoEncriptado);
});

app.post("/verificarCodigo", (req, res) => {
  const { codigo } = req.body;
  const { email } = req.body;

  try {
    const codigo2 = ncryptObject.encrypt(codigo);
    const query = "SELECT * FROM usuarios WHERE codigo = ? AND correo = ?";

    connection.query(query, [codigo2, email], (error, result) => {
      if (error) {
        console.error("Error executing MySQL query:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (!result || result.length === 0) {
        console.log("Código incorrecto");
        res.status(401).json({ error: "Token Incorrecto" });
        return;
      }

      if (result[0].codigo === codigo2 && result[0].correo === email) {
        console.log("El logueo es correcto");
        res.status(200).json({ message: "Token Correcto" });
      } else {
        console.log("Código incorrecto");
        console.log("Código incorrecto");
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
