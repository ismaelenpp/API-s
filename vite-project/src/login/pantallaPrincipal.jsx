/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./pantallaPrincipal.css";
import { useNavigate } from "react-router-dom";

function pantallaPrincipal() {
  // Estado para almacenar el correo electrónico
  const [email, setEmail] = useState("");
  // Estado para verificar la validez del correo
  const [emailValido, setEmailValido] = useState(true);
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    // Verificar si el correo electrónico es válido
    if (!validarCorreoElectronico(email)) {
      setEmailValido(false);
      return;
    }

    // Restaurar la validez del correo en caso de que fuera inválido previamente
    setEmailValido(true);

    // Enviar el correo electrónico al servidor aquí (debes implementar esta lógica)
    try {
      const response = await fetch("http://localhost:3000/meterGmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: email }),
      });
      if (response.status === 201) {
        // El servidor respondió correctamente, pue des redirigir al usuario o realizar otras acciones
        console.log("Usuario creado con éxito");
        navigate("/codigo", { state: { email } });
      } else {
        // Manejar errores aquí
        console.error("Error al crear el usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  // Función para validar el correo electrónico usando una expresión regular
  function validarCorreoElectronico(correo) {
    var patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return patronCorreo.test(correo);
  }

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Por favor, pon tu correo electrónico.
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-white mb-4">
                        <label className="form-label" htmlFor="typeEmailX">
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          id="typeEmailX"
                          className={`form-control form-control-lg ${
                            emailValido ? "" : "is-invalid"
                          }`}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        {!emailValido && (
                          <div className="invalid-feedback">
                            <div className="alert alert-danger">
                              Por favor, ingresa un correo electrónico válido.
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-google fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default pantallaPrincipal;
