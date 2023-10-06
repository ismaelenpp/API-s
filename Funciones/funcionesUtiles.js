const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  service: "Gmail",
  auth: {
    user: "collakebab@gmail.com", // Cambia esto a tu dirección de correo electrónico
    pass: "ikac zxxq yuoc jins", // Cambia esto a tu contraseña de correo electrónico
  },
});

function enviartoken(correo, numeroAleatorio) {
  try {
    //var emaildata = { correoOrigen, correoDestino, mensaje };
    var correoDestino = correo;
    var correoOrigen = "collakebab@gmail.com";
    var mensaje = numeroAleatorio.toString();

    console.log(typeof mensaje);

    console.log("correo destino--->", correoDestino);
    console.log("correo origen --->", correoOrigen);
    console.log("token desbloqueo --->", mensaje);

    // Configuración del correo electrónico
    const mailOptions = {
      from: correoOrigen,
      to: correoDestino,
      subject: "Asunto del correo",
      text: mensaje,
    };

    // Envío del correo electrónico
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
