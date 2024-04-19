/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./estadio_screen.css";
import React, { useState, useEffect } from "react";
import miImagen from "./images/campo2.png";
import { Background } from "@cloudinary/url-gen/qualifiers";
import { image } from "@cloudinary/url-gen/qualifiers/source";

const EstadioScreen = ({ selectedTeam }) => {
  const [futbolistData, setfutbolistData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedTeam]);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: `url(${miImagen})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const fetchData = () => {
    console.log("selectedTeam: ", selectedTeam.nombre);
    fetch(`http://localhost:3000/futbolistas/${selectedTeam.nombre}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("es la data: ", data);
        setTableData(data.equipos);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // const handlePostFutbolistas = (nombre_completo, apodo, url_foto) => {
  //   if (nombre_completo && apodo && url_foto) {
  //     const futbolistas = {
  //       nombre_completo: nombre_completo,
  //       apodo: apodo,
  //       url_foto: url_foto,
  //     };
  //     console.log("ES ESTOOO: ", nombre_completo, apodo, url_foto);
  //     console.log("ES ESTOOO: ", nombre_completo, apodo, url_foto);
  //     console.log("ES ESTOOO: ", nombre_completo, apodo, url_foto);
  //     fetch("http://localhost:3000/insertarFutbolista", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(futbolistas),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("POST response:", data);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   }
  // };
  //    handlePostFutbolistas("vini", "vinijr", "vinisius");

  return (
    <div class="estadio-screen container" style={containerStyle}>
      <div class="campo">
        <div class="posiciones row">
          <div class="portero col-4"></div>
        </div>
        <div class="posiciones row">
          <div class="defensa col-3"></div>
          <div class="defensa col-3"></div>
          <div class="defensa col-3"></div>
          <div class="defensa col-3"></div>
        </div>
        <div class="posiciones row">
          <div class="mediocampista col-3"></div>
          <div class="mediocampista col-3"></div>
          <div class="mediocampista col-3"></div>
        </div>
        <div class="posiciones row">
          <div class="delantero col-3"></div>
          <div class="delantero col-3"></div>
          <div class="delantero col-3"></div>
        </div>
      </div>
    </div>
  );
};

export default EstadioScreen;
