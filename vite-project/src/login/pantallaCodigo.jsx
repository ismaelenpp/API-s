/* eslint-disable react/no-unknown-property */
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
        navigate("/app", { state: { email2: email } });
      } else {
        console.error("Error al verificar usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  return (
    <div className="background" id="background">
      <section style={{ backgroundColor: "#004D7B" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card bg-light text-white rounded"
                style={{
                  background:
                    "url(https://cdn.filestackcontent.com/6MG9zFKMTfSapBgsCvvS)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <div className="card-body p-5 col text-center">
                  <div className="col text-center">
                    <img
                      src="https://cdn.filestackcontent.com/tr0F3biuQEexN34fwBuy"
                      class="rounded img-fluid"
                      alt="logo"
                    />
                    {/*<img style={{with:"5%", height:"50px"}} src={"https://cdn.filestackcontent.com/tr0F3biuQEexN34fwBuy"}/>*/}
                  </div>
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h6 className="fw-bold mb-2 text-uppercase text-black">
                      Login
                    </h6>
                    <p className="text-black-50 mb-5">Introduce el codigo</p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-white text-black mb-4">
                        <label
                          className="form-label"
                          htmlFor="typeEmailX"
                        ></label>
                        <input
                          type="text"
                          className="form-control"
                          id="codigo"
                          placeholder="Codigo"
                          name="codigo"
                          value={codigo}
                          onChange={(e) => setCodigo(e.target.value)}
                          required
                        />
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

export default PantallaCodigo;
