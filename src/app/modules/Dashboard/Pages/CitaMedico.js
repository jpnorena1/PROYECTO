import React from "react";
import axios from "axios";
import { IconButton, Collapse } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

import ReactToPrint from "react-to-print";
import { RecetaPDF } from "../../../../components/RecetaPDF";
const options = [
  {
    label: "Endocrinología",
    value: "Endocrinología",
  },
  {
    label: "Pediatria",
    value: "Pediatria",
  },
  {
    label: "Ginecologia",
    value: "ginecologia",
  },

  {
    label: "medicina general",
    value: "medicina general",
  },
];
const data = [{}];

class CitaMedico extends React.Component {
  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }
  fech() {
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const fecha = `${dia}/${mes}/${anio}`;
  }

  getAllExamenes() {
    //const esto = this.props.unas;
    ////console.log(esto, "esto");
    axios
      .get(
        `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas/getExamenMedico`
      )
      .then((response) => {
        /*if (response.status === 200) {
          const datas = response.data;
          this.setState({ getExamen: datas });
          ////console.log(datas, "asda");
        }*/
        if (response.status === 200) {
          const dataExamen = response.data;
          this.setState({ getExamen: dataExamen });
          //console.log(this.state);
        }
      })
      .catch((error) => {
        //
        //console.log(error);
      });
  }

  getAllCItasAdmin() {
    const esto = this.props.unas;
    ////console.log(esto, "esto");
    axios
      .get(
        `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/medic/getRequestByUser/${esto}`
      )
      .then((response) => {
        if (response.status === 200) {
          const datas = response.data;
          this.setState({ other: datas });
          ////console.log(datas, "asda");
        }
      })
      .catch((error) => {
        //
        ////console.log(error);
      });
  }
  getHorario() {
    axios
      .get(
        `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/horarios`
      )
      .then((response) => {
        ////console.log(response);
      })
      .catch((error) => {
        ////console.log(error);
      });
  }

  getDescription(value) {
    if (value === "Endocrinología") {
      axios
        .get(
          `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas?nombreEspec=${value}`
        )
        .then((response) => {
          const data = response.data.res;
          this.setState({ datas: data });
        })
        .catch((error) => {
          ////console.log(error);
        });
    } else if (value === "Pediatria") {
      axios
        .get(
          `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas?nombreEspec=${value}`
        )
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.res;
            this.setState({ datas: data });
          } else {
            this.setState({ datas: [] });
          }
        })
        .catch((error) => {
          ////console.log(error);
        });
    } else if (value === "ginecologia") {
      axios
        .get(
          `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas?nombreEspec=${value}`
        )
        .then((response) => {
          ////console.log(data, "nice");
          const data = response.data.res;
          this.setState({ datas: data });
        })
        .catch((error) => {
          ////console.log(error);
        });
    } else if (value === "medicina general") {
      axios
        .get(
          `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas?nombreEspec=${value}`
        )
        .then((response) => {
          const data = response.data.res;
          this.setState({ datas: data });
        })
        .catch((error) => {
          ////console.log(error);
        });
    }
  }
  getAllMedicaments() {
    axios
      .get(
        `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas/todoMedicament`
      )
      .then((response) => {
        let infoMedicament = response.data.res;
        this.setState({ medicamentosAct: infoMedicament });
        ////console.log(this.state, "state"); Es el log de mi estado de medicademntos
      })
      .catch((error) => {
        ////console.log(error);
      });
  }

  componentWillMount() {
    axios
      .get(
        `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas/findScheulding`
      )
      .then((response) => {
        if (response.status === 200) {
          const dataHorarario = response.data.data;
          this.setState({ horarios: dataHorarario });
          ////console.log(this.state);
        } else {
          this.setState({ datas: [] });
        }
      })
      .catch((error) => {
        ////console.log(error);
      });
    this.getAllMedicaments();

    this.fech();
    this.getAllCItasAdmin();
    this.getDescription();
    this.getAllExamenes();
    //console.log(this.state);
  }
  getCitaWeek() {
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;

    const anio = hoy.getFullYear();
    const fecha = `${dia}-${mes < 10 ? "0" + mes : mes}-${anio}`;
    const a = new Date().toISOString().slice(0, 10);
    const b = new Date(a).getDay();
    const array = this.state.other.map((item) => {
      const other = {
        fecha: item.fecha.slice(0, 10),
        hora: item.horaInicial,
        id: item.citaId,
        idMedico: item.medico,
        idPaciente: item.identificacion,
        idEspecialidad: item.especialidadId,
        idEstado: item.estado,
        nombreEspecialidad: item.nombreEspecialidad,
        user: item.user,
        edad: item.dateBirth,
      };
      return other;
    });
    const order = array.sort((a, b) => {
      return new Date(a.fecha) - new Date(b.fecha);
    });
    const filter = order.filter((item) => {
      return item.fecha > a;
    });
    const filter2 = order.filter((item) => {
      return item.fecha < a;
    });
    const filter3 = order.filter((item) => {
      return item.fecha === a;
    });

    console.log(filter, "array");
    console.log(fecha, "fecha");
    console.log(a, "rt");
  }
  getCitaDay() {
    const a = new Date().toISOString().slice(0, 10);
    let busca = this.state.other.filter((item) => {
      return item.fecha.slice(0, 10) === a;
    });
    this.setState({ other: busca });
  }
  state = {
    data: data,
    fecha: new Date(),
    datas: [],
    other: [],
    getExamen: [],
    fechaActual: "",
    horarios: [],
    modalActualizar: false,
    modalInsertar: false,
    medicamentosAct: [],
    selectedOption: null,

    form: {
      fecha: "",
      hora: "",
      especialidad: "",
      paciente: "",
      edad: "",
      motivo: "",
    },
    form2: {
      identificacionUser: "",
      medicoId: "",
      fechaCita: "",
      horaCita: "",
      especialidadId: "",
    },

    diagnosticForm: {
      origenEtnico: "",
      peso: "",
      estatura: "",
      fuma: "",
      enfermedad: "",
      tipoEnfermedad: "",
      motivo: "",
      valoracion1: "",
      valoracion2: "",
      valoracion3: "",
      medicamentos: [],
      examenes: [],
    },
    medicamentoTemp: {
      medicamentoId: "",
      indicaciones: "",
      frecuencia: "",
    },
    examenTemp: {
      examenMedicoId: "",
      indicacion: "",
    },
    proximoControl: {
      fechaProx: "",
    },
    estadoConsulta: {
      state: "",
    },

    atencionOpen: false,
    diagnosticoOpen: false,
  };

  nuevoTr() {
    return (
      <tr>
        <td>{this.state.form.fecha}</td>
        <td>{this.state.form.hora}</td>
        <td>{this.state.form.especialidad}</td>
        <td>{this.state.form.paciente}</td>
        <td>{this.state.form.edad}</td>
        <td>{this.state.form.motivo}</td>
      </tr>
    );
  }

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  getDiagnostico = (diagnostico, form, medicamento, examenes, estadoCons) => {
    // aqui esta la información del diagnostico
    /* 
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].personaje = dato.personaje;
        arreglo[contador].paciente = dato.paciente;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
    */
    // //console.log(diagnostico,"este es el diagnostico generado por*Ç el medico al paciente");
    ////console.log(form, "es el form con la informacion de la cita");
    ////console.log(this.state, "este es el medicamento que se le dio al paciente");
    const info = diagnostico;

    var data = {
      origenEtnico: info.origenEtnico,
      peso: info.peso,
      estatura: info.estatura,
      familiares: info.enfermedad,
      patologicos: info.valoracion1,
      quirurgicos: info.valoracion2,
      toxicos: info.valoracion2,
      vacunacionCovid: info.valoracion3,
      motivoConsulta: info.motivo,
      medicoId: form.medico,
      fumador: info.fuma,
      identificacionUser: form.identificacion,
      citaId: form.citaId,
    };

    var config = {
      method: "post",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas/saveDiagnostico",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        //console.log(error);
      });
    const stateAtention = () => {
      var data = {
        citaId: form.citaId,
        estado: estadoCons.state,
      };

      var config = {
        method: "post",
        url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas/updateStateRequest",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const receta = () => {
      var info = {
        nombreCasa: "negnro",
        medicoId: form.medico,
        medicamento: diagnostico.medicamentos,
        userId: form.identificacion,
        citaId: form.citaId,
      };

      var config = {
        method: "post",
        url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas/saveRecetaMedica",
        headers: {
          "Content-Type": "application/json",
        },
        data: info,
      };

      axios(config)
        .then(function (response) {
          ////console.log(response);
        })
        .catch(function (error) {
          //console.log(error);
        });
    };
    const examen = examenes;
    const examenMed = () => {
      var data = {
        citaId: form.citaId,
        userId: form.identificacion,
        examenes: examen,
      };

      var config = {
        method: "post",
        url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas/saveExamen",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          ////console.log(response);
        })
        .catch(function (error) {
          //console.log(error);
        });
    };
    //window.location.reload();
    //window.location.reload(false);

    receta();
    examenMed();
    stateAtention();
    //console.log(this.state);
    this.setState({
      modalActualizar: false,
      atencionOpen: true,
      diagnosticoOpen: true,
    });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Estás Seguro que deseas Eliminar el elemento " + dato.id
    );
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };
  handleExamenes = (e) => {
    const { name, value } = e.target;
    this.setState({
      examenTemp: { ...this.state.examenTemp, [name]: value },
    });
  };

  handleChango = (e) => {
    const { name, value } = e.target;
    this.setState({
      medicamentoTemp: { ...this.state.medicamentoTemp, [name]: value },
      proximoControl: { [name]: value },
      //estadoConsulta: { [name]: value },
    });

    // Option selected: { value: "rojo", label: "rojo" }
  };
  handleState = (e) => {
    const { name, value } = e.target;
    this.setState({
      estadoConsulta: { [name]: value },
    });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleChangeDiagnostico = (e) => {
    const { name, value } = e.target;
    this.setState({
      diagnosticForm: { ...this.state.diagnosticForm, [name]: value },
    });
  };
  handleChanges = (e) => {
    this.setState({
      form2: {
        ...this.state.form2,
        [e.target.name]: e.target.value,
      },
    });
    ////console.log(this.state.form2);
  };
  AgendarCita = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      fecha: this.state.form2.fechaCita,
      identificacion: this.state.form2.identificacionUser,

      especialidad: this.state.form2.especialidadId,
      hora: this.state.form2.horaCita,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas/agendarCIta",
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            modalInsertar: false,
          });
        }
      })

      .catch((error) => {
        // //console.log(error);
      });
  };
  insertar = () => {
    /* let as1 = document.createElement(`${"Select"}`);
    as1.setAttribute("class", "form-control");
    //as1.style.backgroundColor = "red";
    let as2 = document.createElement(`${"input"}`);

    let as3 = document.createElement(`${"input"}`);

    as3.setAttribute("class", "form-control");
    as2.setAttribute("class", "form-control");
    as1.setAttribute("id", "olk");
    as3.setAttribute("styled", "color:red");
    let select = document.getElementById("esmiTd"); //id donde lo estoy insertando (campo)
    let tbody = document.createElement("tbody");
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    td.appendChild(as1);
    td2.appendChild(as2);
    td3.appendChild(as3);
    tr.append(td);
    tr.append(td2);
    tr.append(td3);
    let result = this.state.medicamentosAct.nombreMedicamento;
    //let bs = document.createElement("input");
    let ae = select.appendChild(tbody).appendChild(tr);
    for (var i = 0; i < result.length; i++) {
      var option = document.createElement("option");
      option.value = result[i];
      option.text = result[i];
      as1.appendChild(option);
    }*/
  };
  addExamen = () => {
    const actualExamenes = this.state.diagnosticForm.examenes;
    if (this.state.examenTemp.examenMedicoId !== "") {
      this.setState({
        ...this.state,
        medicamentoTemp: {
          examenMedicoId: "",
          indicacion: "",
        },
        diagnosticForm: {
          ...this.state.diagnosticForm,
          examenes: [...actualExamenes, this.state.examenTemp],
        },
      });
    }
    //console.log(this.state);
  };
  refreshPage = () => {
    window.location.reload(true);
  };
  addMedicamento = () => {
    const actualMedicamentos = this.state.diagnosticForm.medicamentos;
    if (this.state.medicamentoTemp.medicamentoId !== "") {
      this.setState({
        ...this.state,
        medicamentoTemp: {
          medicamentoId: "",
          indicaciones: "",
          frecuencia: "",
        },
        diagnosticForm: {
          ...this.state.diagnosticForm,
          medicamentos: [...actualMedicamentos, this.state.medicamentoTemp],
        },
      });
    }
  };

  handleOpenAtencion = () => {
    const atencionOpen = this.state.atencionOpen;
    this.setState({ ...this.state, atencionOpen: !atencionOpen });
  };
  handleOpenDiagnostico = () => {
    const diagnosticoOpen = this.state.diagnosticoOpen;
    this.setState({ ...this.state, diagnosticoOpen: !diagnosticoOpen });
  };

  deleteMedicamento = (medicamentoId) => {
    const actualMedicamentos = this.state.diagnosticForm.medicamentos;
    const medicamentos = actualMedicamentos.filter(
      (medicamento) => medicamento.medicamentoId !== medicamentoId
    );
    this.setState({
      ...this.state,
      diagnosticForm: {
        ...this.state.diagnosticForm,
        medicamentos: medicamentos,
      },
    });
  };

  deleteExamen = (examenMedicoId) => {
    const actualExamenes = this.state.diagnosticForm.examenes;
    const medicamentos = actualExamenes.filter(
      (medicamento) => medicamento.examenMedicoId !== examenMedicoId
    );
    this.setState({
      ...this.state,
      diagnosticForm: {
        ...this.state.diagnosticForm,
        examenes: medicamentos,
      },
    });
  };

  render() {
    const optionsEstado = [
      {
        label: "Pendiente",
        value: "Pendiente",
      },
      {
        label: "Cancelado",
        value: "Cancelado",
      },
      {
        label: "Atendido",
        value: "Atendido",
      },
    ];
    /*
    function getCitasByUser() {
      axios
        .get(
          `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/medic/getRequestByUser/${unas}`
        )
        .then((response) => {})

        .catch((error) => {
          //
          //console.log(error);
        });
    }

    getCitasByUser();*/
    ////console.log(this.props, "estas sn mis props");
    return (
      <>
        <Container>
          <div style={{ margin: 15 }}>
            <Button
              color="primary"
              style={{
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: "grey",
              }}
              onClick={() => this.getCitaDay()}
            >
              DIA
            </Button>
            <Button style={{ marginLeft: 10 }}>SEMANA</Button>
            <Button
              onClick={() => this.getCitaWeek()}
              style={{ marginLeft: 10 }}
            >
              MES
            </Button>
          </div>
          <br />
          <div>
            <Button
              color="success"
              style={{ width: "300px" }}
              onClick={() => this.refreshPage()}
            >
              Actualizar
            </Button>
          </div>
          <Table>
            <thead>
              <tr>
                <th>FECHA</th>
                <th>HORA</th>
                <th>ESPECIALIDAD</th>
                <th>NOMBRES Y APELLIDOS</th>
                <th>EDAD</th>
                <th>MOTIVO</th>
              </tr>
            </thead>

            <tbody>
              {this.state.other.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.fecha.split("T00:00:00.000Z")}</td>
                  <td>{dato.horaInicial}</td>
                  <td>{dato.nombreEspecialidad}</td>
                  <td>{dato.user}</td>
                  <td>
                    {dato.dateBirth != null
                      ? this.calcularEdad(dato.dateBirth) + " AÑOS"
                      : null}
                  </td>
                  <td>{dato.motivo}</td>

                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Atencion
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Modificar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal
          isOpen={this.state.modalActualizar}
          style={{
            maxWidth: "1000px",
            width: "150%",
            height: "80%",
          }}
          size="lg"
          fullscreen
        >
          <ModalBody>
            <div
              style={{
                marginTop: 5,
                overflow: "scroll",
                height: "70vh",
              }}
            >
              <div className="container" style={{ marginTop: 5 }}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div
                        className="card-header"
                        style={{
                          backgroundColor: "#33C6C4 ",
                        }}
                      >
                        <h4 style={{ color: "white", fontWeight: "bold" }}>
                          Atencion paciente
                        </h4>
                        <IconButton onClick={this.handleOpenAtencion}>
                          {!this.state.atencionOpen ? (
                            <ArrowDropDownIcon />
                          ) : (
                            <ArrowDropUpIcon />
                          )}
                        </IconButton>
                      </div>
                      <Collapse in={this.state.atencionOpen}>
                        <label
                          style={{
                            marginTop: 15,
                            backgroundColor: "green",
                            color: "white",
                          }}
                        >
                          INFORMACION GENERAL
                        </label>{" "}
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Nombre</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Nombre"
                                  name="Nombre"
                                  value={this.state.form.firstName}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Apellido</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Apellido"
                                  value={this.state.form.lastName}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Email"
                                  value={this.state.form.email}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Telefono</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Telefono"
                                  value={this.state.form.phoneNumber}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Direccion</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Direccion"
                                  value={this.state.form.addres}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Ciudad</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Ciudad"
                                  value={this.state.form.country}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Fecha de Nacimiento</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder="Fecha de Nacimiento"
                                  value={this.state.form.dateBirth}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>Sexo</label>
                                <select
                                  value={this.state.form.sex}
                                  className="form-control"
                                >
                                  <option>{this.state.form.sex}</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label>MOTIVO</label>
                                <select className="form-control">
                                  <option>{this.state.form.motivo}</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div className="container" style={{ height: 20 }}>
                <div className="card">
                  <div
                    className="card-header"
                    style={{ backgroundColor: "#4749B7 ", fontWeight: "bold" }}
                  >
                    <h4 style={{ color: "white", fontWeight: "bold" }}>
                      CONSULTA MEDICA
                    </h4>
                    <IconButton onClick={this.handleOpenDiagnostico}>
                      {!this.state.diagnosticoOpen ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )}
                    </IconButton>
                  </div>
                </div>{" "}
                <Collapse in={this.state.diagnosticoOpen}>
                  <label
                    style={{
                      marginTop: 15,
                      backgroundColor: "green",
                      color: "white",
                    }}
                  >
                    DESCRIPCIÓN DE DIAGNOSTICO
                  </label>{" "}
                  <br />
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Origen Etnico</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Escriba el origen etnico"
                            name="origenEtnico"
                            value={this.state.diagnosticForm.origenEtnico}
                            onChange={this.handleChangeDiagnostico}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <label style={{ width: "100px" }}>
                            {"Peso (KGs) "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="(KG)"
                            name="peso"
                            value={this.state.diagnosticForm.peso}
                            onChange={this.handleChangeDiagnostico}
                            style={{ width: "100px" }}
                          />
                        </div>
                      </div>
                      <div className="row" style={{ marginLeft: 5 }}>
                        <div className="col-md-4">
                          <label>Estatura</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="(CM)"
                            name="estatura"
                            value={this.state.diagnosticForm.estatura}
                            onChange={this.handleChangeDiagnostico}
                            style={{ width: "100px" }}
                          />
                        </div>
                      </div>
                      <div className="row" style={{ marginLeft: 5 }}>
                        <div className="col-md-4">
                          <label>Fuma?</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="(SI/NO)"
                            name="fuma"
                            value={this.state.diagnosticForm.fuma}
                            onChange={this.handleChangeDiagnostico}
                            style={{ width: "100px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <label
                      style={{
                        backgroundColor: "green",
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      ANTESCENDENTES
                    </label>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Familiares</label>
                          <br />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Tiene antecedentes familiares?"
                            name="enfermedad"
                            value={this.state.diagnosticForm.enfermedad}
                            onChange={this.handleChangeDiagnostico}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Patologicos</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Tiene antecedentes patologicos?"
                            name="tipoEnfermedad"
                            value={this.state.diagnosticForm.tipoEnfermedad}
                            onChange={this.handleChangeDiagnostico}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Quirurgicos</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Tiene antecedentes quirurgicos?"
                            name="valoracion1"
                            value={this.state.diagnosticForm.valoracion1}
                            onChange={this.handleChangeDiagnostico}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Toxicos</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Tiene antecedentes toxicos?"
                            name="valoracion2"
                            value={this.state.diagnosticForm.valoracion2}
                            onChange={this.handleChangeDiagnostico}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Vacunación Covid</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="tine aplicada el esquema de vacunacion covid?"
                            name="valoracion3"
                            value={this.state.diagnosticForm.valoracion3}
                            onChange={this.handleChangeDiagnostico}
                          />
                        </div>
                      </div>
                      <div>
                        <label>Motivo consulta</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          style={{ width: "900px" }}
                          name="motivo"
                          value={this.state.diagnosticForm.motivo}
                          onChange={this.handleChangeDiagnostico}
                          placeholder="Motivo de la consulta"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="container" style={{ height: 20 }}>
                    <div className="card">
                      <div
                        className="card-header"
                        style={{ backgroundColor: "#4749B7 " }}
                      >
                        <h4 style={{ color: "white" }}>RECETAR</h4>
                      </div>
                    </div>{" "}
                    <label
                      style={{
                        marginTop: 15,
                        backgroundColor: "green",
                        color: "white",
                      }}
                    >
                      DESCRIPCIÓN DE RECETA
                    </label>{" "}
                    <br />
                    <div className="card-body">
                      <div className="row">
                        <div style={{ display: "none" }}>
                          <RecetaPDF
                            diagnosticForm={this.state.diagnosticForm}
                            medicamentosAct={this.state.medicamentosAct}
                            user={this.state.form}
                            ref={(el) => (this.componentRef = el)}
                          />
                        </div>
                        <Table id="esmiTd">
                          <thead>
                            <tr>
                              <th>MEDICAMENTO</th>
                              <th>INDICACIONES</th>
                              <th>FRECUENCIA</th>
                              <th>ACCION</th>
                            </tr>
                          </thead>

                          <tbody>
                            {this.state.diagnosticForm.medicamentos.map(
                              (medicamento, index) => {
                                const medicamentoData =
                                  this.state.medicamentosAct.find(
                                    (m) =>
                                      parseInt(m.medicamentoId) ===
                                      parseInt(medicamento.medicamentoId)
                                  );
                                return (
                                  <tr key={index}>
                                    <td>{medicamentoData.nombreMedicamento}</td>
                                    <td>{medicamento.indicaciones}</td>
                                    <td>{medicamento.frecuencia}</td>
                                    <td>
                                      <IconButton
                                        color="secondary"
                                        variant="contained"
                                        onClick={() =>
                                          this.deleteMedicamento(
                                            medicamento.medicamentoId
                                          )
                                        }
                                      >
                                        <ClearIcon />
                                      </IconButton>
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </Table>
                        <Table>
                          <tbody>
                            <tr>
                              <td>
                                <select
                                  className="form-control"
                                  name="medicamentoId"
                                  value={
                                    this.state.medicamentoTemp.medicamentoId
                                  }
                                  onChange={this.handleChango}
                                >
                                  <option>Selecciona un medicamento</option>
                                  {this.state.medicamentosAct.map(
                                    (medicamento) => {
                                      return (
                                        <option
                                          key={medicamento.medicamentoId}
                                          value={medicamento.medicamentoId}
                                        >
                                          {medicamento.nombreMedicamento}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="indicaciones"
                                  value={
                                    this.state.medicamentoTemp.indicaciones
                                  }
                                  placeholder="Indicaciones"
                                  onChange={this.handleChango}
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="frecuencia"
                                  value={this.state.medicamentoTemp.frecuencia}
                                  placeholder="Frecuencia"
                                  onChange={this.handleChango}
                                />
                              </td>
                              <td>
                                <Button
                                  color="primary"
                                  onClick={this.addMedicamento}
                                >
                                  Guardar
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        <br />
                        <br />
                        <br />
                        <div>
                          <label>Proximo Control</label>
                          <input
                            type="date"
                            className="form-control"
                            value={this.state.proximoControl.fechaProx}
                            name="fechaProx"
                            onChange={this.handleChango}
                          ></input>
                        </div>
                      </div>
                      <br />
                      <div>
                        <label style={{ fontWeight: "bold" }}>
                          Estado Consulta
                        </label>
                        <select
                          className="form-control"
                          name="state"
                          value={this.state.estadoConsulta.state}
                          onChange={this.handleState}
                        >
                          {optionsEstado.map((option) => {
                            return (
                              <option
                                key={option.value}
                                value={option.value}
                                onClick={() => console.log(this.state)}
                              >
                                {option.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="container" style={{ marginTop: 5 }}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card">
                            <div
                              className="card-header"
                              style={{
                                backgroundColor: "#33C6C4 ",
                              }}
                            >
                              <h4
                                style={{ color: "white", fontWeight: "bold" }}
                              >
                                Gestionar examenes
                              </h4>
                              <IconButton onClick={this.handleOpenAtencion}>
                                {!this.state.atencionOpen ? (
                                  <ArrowDropDownIcon />
                                ) : (
                                  <ArrowDropUpIcon />
                                )}
                              </IconButton>
                            </div>
                            <Collapse in={this.state.atencionOpen}>
                              <label
                                style={{
                                  marginTop: 15,
                                  backgroundColor: "green",
                                  color: "white",
                                }}
                              >
                                INFORMACION GENERAL
                              </label>{" "}
                              <Table id="esmiTd">
                                <thead>
                                  <tr>
                                    <th>NOMBRE EXAMEN</th>
                                    <th>INDICACION</th>
                                    <th>ACCION</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {this.state.diagnosticForm.examenes.map(
                                    (medicamento, index) => {
                                      const examenData =
                                        this.state.getExamen.find(
                                          (m) =>
                                            m.examenMedicoId ===
                                            parseInt(medicamento.examenMedicoId)
                                        );
                                      return (
                                        <tr key={index}>
                                          <td>{examenData.nombreExamen}</td>
                                          <td>{medicamento.indicacion}</td>

                                          <td>
                                            <IconButton
                                              color="secondary"
                                              variant="contained"
                                              onClick={() =>
                                                this.deleteExamen(
                                                  medicamento.examenMedicoId
                                                )
                                              }
                                            >
                                              <ClearIcon />
                                            </IconButton>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                                </tbody>
                              </Table>
                              <Table>
                                <tbody>
                                  <tr>
                                    <td>
                                      <select
                                        className="form-control"
                                        name="examenMedicoId"
                                        value={
                                          this.state.examenTemp.examenMedicoId
                                        }
                                        onChange={this.handleExamenes}
                                      >
                                        <option>
                                          Selecciona un medicamento
                                        </option>
                                        {this.state.getExamen.map((examen) => {
                                          return (
                                            <option
                                              key={examen.examenMedicoId}
                                              value={examen.examenMedicoId}
                                            >
                                              {examen.nombreExamen}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="indicacion"
                                        value={this.state.examenTemp.indicacion}
                                        placeholder="Indicaciones"
                                        onChange={this.handleExamenes}
                                      />
                                    </td>

                                    <td>
                                      <Button
                                        color="primary"
                                        onClick={this.addExamen}
                                      >
                                        Guardar
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Collapse>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() =>
                this.getDiagnostico(
                  this.state.diagnosticForm,
                  this.state.form,
                  this.state.medicamentosAct,
                  this.state.diagnosticForm.examenes,
                  this.state.estadoConsulta
                )
              }
            >
              Aceptar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
            <div>
              <ReactToPrint
                trigger={() => {
                  // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                  // to the root node of the returned component as it will be overwritten.
                  return <Button color="info">Imprimir</Button>;
                }}
                content={() => this.componentRef}
              />
            </div>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Agendar Cita</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Identificacion:</label>
              <input
                className="form-control"
                name="identificacionUser"
                type="text"
                onChange={this.handleChanges}
              />
            </FormGroup>
            <FormGroup>
              <label>Especialidad:</label>
              <select className="form-control">
                <option>Seleccion Especial</option>
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    onChange={this.handleChanges}
                    onClick={() => this.getDescription(option.value)}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup></FormGroup>
            <FormGroup>
              <label>Medico:</label>

              <select
                className="form-control"
                name="medicoId"
                onChange={this.handleChanges}
              >
                <option>Seleccionar Medico</option>
                {this.state.datas === "undefined"
                  ? "seleccione una especialidad"
                  : this.state.datas.map((option) => (
                      <option value={option.userMedic} key={option.userMedic}>
                        {` ${option.firstName} ${option.lastName} `}
                      </option>
                    ))}
              </select>
            </FormGroup>
            <FormGroup>
              <label>Fecha:</label>
              <input
                className="form-control"
                name="fechaCita"
                value={this.fech()}
                min={this.fech()}
                type="date"
                onChange={this.handleChanges}
              />
            </FormGroup>

            <FormGroup>
              <label>Hora:</label>
              <select
                className="form-control"
                name="horaCita"
                onChange={this.handleChanges}
              >
                <option value="8:00">Seleccione Hora</option>
                {this.state.horarios === "undefined"
                  ? "seleccione una especialidad"
                  : this.state.horarios.map((option) => (
                      <option value={option.horarioId} key={option.horarioId}>
                        {option.horaInicial} - {option.horaFinal}
                      </option>
                    ))}
              </select>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.AgendarCita}>
              Agendar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default CitaMedico;
{
  /*<b>Mostrar contenido?</b>
                    <input
                      type="checkbox"
                      name="check"
                      id="check"
                      value="1"
                      onchange={() => showContent()}
                    />
                    <div id="content" style={{ display: "none" }}>
                      contenido del div escondido
                      <br />
                      contenido del div escondido
                      <br />
                      contenido del div escondido
                      <br />
                    </div>
                  
                  */
}
