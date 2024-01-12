const nodemailer = require("nodemailer");
const ncrypt = require("ncrypt-js");
var _secretKey = "some-super-secret-key";
var ncryptObject = new ncrypt(_secretKey);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  service: "Gmail",
  auth: {
    user: "inetfut@gmail.com",
    pass: "bahq gqex rrxo lthb",
  },
});

function enviartoken(correo, numeroAleatorio, res) {
  try {
    var correoDestino = correo;
    var correoOrigen = "inetfut@gmail.com";
    var mensaje = ncryptObject.decrypt(numeroAleatorio);

    const mailOptions = {
      from: correoOrigen,
      to: correoDestino,
      subject: "Código de acceso",
      text:
        "¡Bienvenido a InetFUT!\n\n\n" +
        "Este es tu codigo para acceder a la aplicación: " +
        mensaje,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).send("Error al enviar el correo");
      } else {
        console.log("Correo enviado:", info.response);
        res.status(200).send("Correo enviado con éxito");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interno del servidor");
  }
}

module.exports = { enviartoken };
