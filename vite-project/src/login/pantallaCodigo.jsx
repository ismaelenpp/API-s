/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pantallaCodigo.css";

function PantallaCodigo() {
  const [codigo, setCodigo] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const { email } = location.state || {};

  // Función para enviar el correo electrónico
  const enviarCorreo = async (correoDestino) => {
    try {
      const response = await fetch("http://localhost:3000/enviarCorreo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correoOrigen: "collakebab@gmail.com", // Cambia esto a tu dirección de correo electrónico
          correoDestino, // Agrega el correo destino aquí
          mensaje: "Hola", // Agrega el mensaje aquí
        }),
      });

      if (response.status === 200) {
        console.log(`Correo enviado a ${correoDestino}`);
      } else {
        console.error("Error al enviar el correo");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de autenticación

    // por ejemplo, verificar si el código es válido
    if (codigo === "tu_codigo_secreto") {
      setLoggedIn(true);
      // Llama a enviarCorreo para enviar el correo electrónico
      enviarCorreo(email);
    } else {
      alert("Código incorrecto");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCodigo("");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">Iniciar sesión</div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="codigo">Código:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="codigo"
                    name="codigo"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    required
                  />
                </div>
                <p>Email: {email}</p>
                <button type="submit" className="btn btn-primary btn-block">
                  Iniciar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PantallaCodigo;
