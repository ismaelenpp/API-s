/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/login/pantallaPrincipal.css";
import {background} from "@cloudinary/url-gen/qualifiers/focusOn";
import {image} from "@cloudinary/url-gen/qualifiers/source";

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
    <div className="background" id="background">
      <section style={{ backgroundColor: "#004D7B" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card bg-light text-white rounded"
                style={{ background: "url(https://cdn.filestackcontent.com/6MG9zFKMTfSapBgsCvvS)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
                <div className="card-body p-5 col text-center">
                 <div className="col text-center">
                   <img src="https://cdn.filestackcontent.com/tr0F3biuQEexN34fwBuy" class="rounded img-fluid" alt="logo"/>
                   {/*<img style={{with:"5%", height:"50px"}} src={"https://cdn.filestackcontent.com/tr0F3biuQEexN34fwBuy"}/>*/}
                 </div>
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h6 className="fw-bold mb-2 text-uppercase text-black">Login</h6>
                    <p className="text-black-50 mb-5">
                      Introduce el correo electrónico
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-white text-black mb-4">
                        <label className="form-label" htmlFor="typeEmailX">

                        </label>
                        <input
                          type="email"
                          id="typeEmailX"
                          placeholder="Correo Electrónico"
                          className={`form-control form-control-lg${
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
                        className="btn btn-outline-light  bg-primary btn-lg px-5 text-white"
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
