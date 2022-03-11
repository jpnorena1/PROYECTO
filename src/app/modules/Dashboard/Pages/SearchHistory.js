import styled from "styled-components";

import { NavLink, useRouteMatch } from "react-router-dom";
import "./App.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import Example from "../../../.././components/modalComponent";
import React, { useState } from "react";

const SearchHistory = (props) => {
  // Puedes usar Hooks aquí!!
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [seHistory, setSeHistory] = useState([]);
  const [receta, setReceta] = useState([]);
  const [diagnostic, setDiagnostic] = useState([]);
  function handle(e) {
    setSearch(e.target.value);
  }
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function openModal2(conten) {
    const getReceta = () => {
      var config = {
        method: "get",
        url: `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/historial/getRecetaMedicamento?recetaId=${conten[0].recetaId}`,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          if (response.status === 200 && response.data.length > 0) {
            setReceta(response.data);
            setIsOpen2(true);
          }

          //console.log(response);
        })
        .catch(function (error) {
          console.log(error, "error aca");
        });
    };
    getReceta();
  }
  function closeModal2() {
    setIsOpen2(false);
  }

  function mostrarModalReceta(e) {
    function una() {
      var config = {
        method: "get",
        url: `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/historial/getHistorian?citaId=${e.citaId}`,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          if (response.status === 200 && response.data.length > 0) {
            setDiagnostic(response.data);
            openModal2(response.data);
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    una();
  }
  const mostrarModalActualizar = (dato) => {
    openModal();
    function una() {
      var config = {
        method: "get",
        url: `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/historial/getHistorian?citaId=${dato.citaId}`,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          if (response.status === 200 && response.data.length > 0) {
            setSeHistory(response.data);
            console.log(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    una();
    //console.log(dato.citaId);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setSearchHistory([...searchHistory, search]);
    setSearch("");
  }

  function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  async function getSearchHistory() {
    const response = await axios.get(
      `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/historial/getHistoriaClisn?identificacion=${search}`
    );
    setSearchHistory(response.data);

    // console.log(response.data);
    // console.log();
  }
  const logo = require("../../assets/img/logo.jpeg");
  const searching = require("../../assets/img/search.png");
  const consulta = require("../../assets/img/consulta.png");
  return (
    <div className="container" style={{ overflow: "scroll" }}>
      <div>
        <img
          src={logo}
          style={{
            width: "200px",
            marginLeft: "600px",
          }}
        ></img>
      </div>
      <label>
        <h3
          style={{ fontWeight: "bold", marginTop: 20, fontFamily: "century" }}
          onClick={() => console.log("sitem")}
        >
          Búsqueda de historial clínico
        </h3>
      </label>

      <div className="row" style={{ marginTop: 20 }}>
        <input
          className="form-control"
          type="text"
          placeholder="Ingrese número de cédula del paciente"
          style={{ width: "70%" }}
          value={search}
          onChange={handle}
        />
        <Button
          color="success"
          style={{ marginLeft: 10 }}
          onClick={() => getSearchHistory()}
        >
          Buscar
        </Button>
      </div>
      <div className="row" style={{ marginTop: 20 }}>
        <div>
          <label>
            <p style={{ fontWeight: "bold", fontFamily: "century" }}>
              Datos del paciente:
              <br />
              <br />
              <span style={{ fontWeight: "bold" }}>
                Nombres:{"    "}
                <text style={{ color: "grey" }}>
                  {" "}
                  {searchHistory[0] === undefined
                    ? ""
                    : searchHistory[0].users}{" "}
                </text>
              </span>
              <br />
              <span style={{ fontWeight: "bold" }}>
                Edad:
                <text style={{ color: "grey" }}>
                  {"   "}
                  {searchHistory[0] === undefined
                    ? ""
                    : calcularEdad(searchHistory[0].dateBirth) + " años"}
                </text>{" "}
              </span>
              <br />
              <span style={{ fontWeight: "bold" }}>
                Sexo:
                <text style={{ color: "grey" }}>
                  {" "}
                  {searchHistory[0] === undefined ? "" : searchHistory[0].sex}
                </text>
              </span>
              <br />
            </p>
          </label>
        </div>
      </div>
      <div className="row" style={{ marginTop: 20 }}>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={{
            maxWidth: "90%",
            width: "150%",
            height: "80%",
          }}
          size="lg"
          fullscreen
        >
          <ModalHeader>
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Diagnostico</h2>
          </ModalHeader>
          <ModalBody>
            <Table>
              <div style={{ marginTop: 5, overflow: "scroll", height: "40vh" }}>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Peso</th>
                    <th>Estatura</th>
                    <th>Fumador</th>
                    <th>Antecedentes Familiares</th>
                    <th>Antecedentes Patologicos</th>
                    <th>Antecedentes Quirurg.</th>
                    <th>Vacunación Covid</th>
                    <th>Motivo Consulta</th>
                  </tr>
                </thead>
                <tbody>
                  {seHistory === undefined
                    ? ""
                    : seHistory.map((item) => (
                        <tr>
                          <td>
                            {item.fecha.split(
                              "00:00:00 GMT+0000 (Coordinated Universal Time)"
                            )}
                          </td>
                          <td>{item.peso}</td>
                          <td>{item.estatura} CM</td>
                          <td>{item.fumador}</td>
                          <td>{item.familiares}</td>
                          <td>{item.patologicos}</td>
                          <td>{item.quirurgicos}</td>
                          <td>{item.vacunacionCovid}</td>
                          <td>{item.motivoConsulta}</td>
                        </tr>
                      ))}
                </tbody>
              </div>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={closeModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={modalIsOpen2}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal2}
          contentLabel="Example Modal"
          style={{
            maxWidth: "90%",
            width: "95%",
            maxHeight: "100%",
          }}
          size="lg"
          fullscreen
        >
          <ModalHeader>
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
              Historial de receta
            </h2>
          </ModalHeader>
          <ModalBody>
            <Table>
              <div
                className="form-control"
                style={{ overflow: "scroll", height: "60vh" }}
              >
                <div
                  className="row"
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  <div className="col-md-12">
                    <span style={{ fontWeight: "bold" }}>
                      Nombres:{" "}
                      {searchHistory[0] === undefined
                        ? ""
                        : searchHistory[0].users}{" "}
                    </span>
                    <br />
                    <span style={{ fontWeight: "bold" }}>
                      Edad:
                      <text style={{ color: "grey" }}>
                        {"   "}
                        {searchHistory[0] === undefined
                          ? ""
                          : calcularEdad(searchHistory[0].dateBirth) + " años"}
                      </text>{" "}
                    </span>
                    <br />
                    <span style={{ fontWeight: "bold" }}>
                      Sexo:
                      <text style={{ color: "grey" }}>
                        {" "}
                        {searchHistory[0] === undefined
                          ? ""
                          : searchHistory[0].sex}
                      </text>
                    </span>
                    <br />
                  </div>

                  <img
                    src={logo}
                    style={{ width: "190px", marginLeft: "75%" }}
                  ></img>
                </div>
                <br />
                <div>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Medicamento</th>
                      <th>Frecuencia</th>
                      <th>Indicaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receta === undefined
                      ? console.log("receta")
                      : receta.map((item) => (
                          <tr>
                            <td>{item.fechaEmision.split("T15:51:11.000Z")}</td>
                            <td>{item.nombreMedicamento}</td>
                            <td>{item.frecuencia}</td>
                            <td>{item.indicacion}</td>
                          </tr>
                        ))}
                  </tbody>
                </div>
              </div>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={closeModal2}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>Fecha Cita</th>
              <th>Motivo Consulta</th>
              <th>Diagnóstico</th>
              <th>Receta</th>
            </tr>
          </thead>

          {searchHistory.map((item) => (
            <tbody>
              <tr key={item.citaId}>
                <td>
                  {item.fecha.split(
                    "00:00:00 GMT+0000 (Coordinated Universal Time)"
                  )}
                </td>

                <td>{item.motivo}</td>

                <td>
                  <Button
                    style={{
                      backgroundColor: "white",
                      marginRight: 20,
                      borderWidth: 0,
                      width: "15%",
                    }}
                    onClick={() => {
                      mostrarModalActualizar(item);
                    }}
                  >
                    <img
                      src={searching}
                      style={{
                        width: "30px",
                        marginRight: 20,
                      }}
                    ></img>
                  </Button>
                </td>
                <td>
                  <Button
                    style={{
                      backgroundColor: "white",
                      marginRight: 20,
                      borderWidth: 0,
                      width: "15%",
                    }}
                    onClick={() => {
                      mostrarModalReceta(item);
                    }}
                  >
                    <img
                      src={consulta}
                      style={{
                        width: "30px",
                        marginRight: 20,
                      }}
                    ></img>
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
};
export default SearchHistory;
