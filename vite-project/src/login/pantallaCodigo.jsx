/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pantallaCodigo.css";
import { useNavigate } from "react-router-dom";
function PantallaCodigo() {
  const [codigo, setCodigo] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [email2, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    var codigoIngresado = codigo;
    var emailIngresado = email;
    setEmail(emailIngresado);
    console.log("codigo ---->", codigoIngresado);
    console.log("email ---->", emailIngresado);

    // Promesa al servidor para verificar el código
    try {
      const response = await fetch("http://localhost:3000/verificarCodigo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo: codigoIngresado,
          email: emailIngresado,
        }),
      });
      console.log("response ---->", response);
      if (response.status === 200) {
        navigate("/app", { state: { email2 } });
      } else {
        console.error("Error al verificar usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
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
