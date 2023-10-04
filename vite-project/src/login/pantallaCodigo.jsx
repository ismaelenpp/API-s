import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import "./pantallaCodigo.css";

function pantallaCodigo() {
  const [codigo, setCodigo] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica de autenticación

    // por ejemplo, verificar si el código es válido

    if (codigo === "tu_codigo_secreto") {
      setLoggedIn(true);
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
              {loggedIn ? (
                <div>
                  <h2>Bienvenido</h2>

                  <button className="btn btn-danger" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              ) : (
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

                  <button type="submit" className="btn btn-primary btn-block">
                    Iniciar sesión
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default pantallaCodigo;
