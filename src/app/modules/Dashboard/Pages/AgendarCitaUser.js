import React from "react";
import axios from "axios";
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
import { date } from "yup";

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
class AgendarCitaAdmin extends React.Component {
  fech() {
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const fecha = `${dia}/${mes}/${anio}`;
    //console.log(fecha);
  }

  getHorario() {
    axios
      .get(
        `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/administrador/findHorario`
      )
      .then((response) => {
        //console.log(response);
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  getDescription(value) {
    /* if (value === "Endocrinología") {
      axios
        .get(
          `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas?nombreEspec=${value}`
        )
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            this.setState({ datas: data });
            console.log(data, "ginecologia");
            console.log(this.state, "other date");
          } else {
            this.setState({ datas: [] });
          }
        })
        .catch((error) => {
          //console.log(error);
        });
    } else if (value === "Pediatria") {
      axios
        .get(
          `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas?nombreEspec=${value}`
        )

        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            this.setState({ datas: data });
            console.log(data, "ginecologia");
            console.log(this.state, "other date");
          } else {
            this.setState({ datas: [] });
          }
        })
        .catch((error) => {
          //console.log(error);
        });
    } else if (value === "ginecologia") {
      axios
        .get(
          `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas?nombreEspec=${value}`
        )
        .then((response) => {
          //console.log(data, "nice");
          if (response.status === 200) {
            const data = response.data;
            this.setState({ datas: data });
            console.log(data, "ginecologia");
            console.log(this.state, "other date");
          } else {
            this.setState({ datas: [] });
          }
        })
        .catch((error) => {
          //console.log(error);
        });
    }*/
    var config = {
      method: "get",
      url: `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas/nombreEspecialidad?nombreEspec=${value}`,
      headers: {},
    };

    axios(config)
      .then((response) => {
        const data = response.data;
        this.setState({ datas: data });
        console.log(data, "esta bien pau");
        console.log(this.state, "other date");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getEspecialidad() {
    var config = {
      method: "get",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/especialidades/getAllEspecialidad",
      headers: {},
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          this.setState({ especialidadMedico: data });
          console.log(this.state, "DATA HORARIOS ");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getAllTime() {
    axios
      .get(
        `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas/findScheulding`
      )
      .then((response) => {
        if (response.status === 200) {
          const dataHorarario = response.data.data;
          this.setState({ horarios: dataHorarario });
          console.log(this.state, "DATA HORARIOS ");
        } else {
          this.setState({ datas: [] });
        }
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  state = {
    data: data,
    datas: [],
    other: [],
    especialidades: [],
    especialidadMedico: [],
    horarios: [],
    modalActualizar: false,
    modalInsertar: false,
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
      especialidadId: "",
      fechaCita: "",
      horaCita: "",
      motivoCita: "",
    },
  };

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
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

  editar = (dato) => {
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

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleChanges = (e) => {
    const { name, value } = e.target;
    if (name === "especialidadId") {
      this.getDescription(value);
      console.log(value, "value");
    } else {
      //console.log(name, value);
      if (name === "medicoId") {
        const { userMedic, especialidadId } = this.state.datas.find(
          (x) => x.userMedic === parseInt(value)
        );
        //console.log(userMedic, "userMEDICSA ");
        this.setState({
          form2: {
            ...this.state.form2,
            medicoId: userMedic,
            especialidadId: especialidadId,
          },
        });
      } else {
        this.setState({
          form2: {
            ...this.state.form2,
            [e.target.name]: e.target.value,
          },
        });
      }
    }

    //console.log(this.state.form2);
  };
  handleDate = (e) => {
    const { name, value } = e.target;
    this.setState({
      form2: { ...this.state.form2, [name]: value },
    });
    //console.log(value);
    var config = {
      method: "get",
      url: `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas/getFechaCita?fecha=${value}`,
      headers: {},
    };

    axios(config)
      .then((response) => {
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getAllCItasAdmin = () => {
    var config = {
      method: "get",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas/getAllCitasAdm",
      headers: {},
    };

    axios(config)
      .then((response) => {
        const datas = response.data.res;
        this.setState({ other: datas });
        console.log(this.state.other, "nice");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  AgendarCita = () => {
    var data = {
      fecha: this.state.form2.fechaCita,
      identificacion: this.state.form2.identificacionUser,
      medico: this.state.form2.medicoId,
      especialidadId: this.state.form2.especialidadId, //<<Este es la especialidad<>>
      hora: this.state.form2.horaCita,
      motivo: this.state.form2.motivoCita,
    };

    var config = {
      method: "post",
      url: " https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/citas/agendarCIta",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    //console.log(data, "data");
    axios(config)
      .then((response) => {
        this.setState({ modalInsertar: false });
      })

      .catch((error) => console.log(error, data));
  };
  componentDidMount() {
    this.getAllTime();
    this.getAllCItasAdmin();
    this.getEspecialidad();
  }
  render() {
    return (
      <>
        <Container>
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            AGENDAR CITA
          </Button>
          <br />
          <Table>
            <thead>
              <tr>
                <th>CEDULA</th>
                <th>FECHA</th>
                <th>HORA</th>
                <th>ESPECIALIDAD</th>
                <th>MEDICO</th>
                <th>LUGAR</th>
              </tr>
            </thead>
            <tbody>
              {this.state.other.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.identificacion}</td>
                  <td>
                    {dato.fecha.split(
                      " 00:00:00 GMT+0000 (Coordinated Universal Time)"
                    )}
                  </td>
                  <td>
                    {dato.horaInicial}-{dato.horaFinal}
                  </td>
                  <td>{dato.nombreEspecialidad}</td>
                  <td>{"HOSPITAL EL ORO"}</td>

                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Cancelar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Paciente:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.paciente}
              />
            </FormGroup>
            <FormGroup>
              <label>Actualizacion Fecha:</label>
              <input
                className="form-control"
                name="fecha"
                type="date"
                onChange={this.handleChange}
                value={this.state.form.fecha}
              />
            </FormGroup>
            <FormGroup>
              <label>Motivo:</label>

              <label
                style={{ marginLeft: 12, fontSize: 15, fontWeight: "bold" }}
              >
                {this.state.form.motivo}
                <br />
              </label>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
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
              <select
                className="form-control"
                name="especialidadId"
                onChange={this.handleChanges}
              >
                <option>Seleccion Especial</option>
                {this.state.especialidadMedico.map((option) => (
                  /*<option key={option.value} value={option.value}>
                    {option.nombreEspecialidad}
                  </option>*/
                  <option
                    key={option.nombreEspecialidad}
                    value={option.nombreEspecialidad}
                  >
                    {option.nombreEspecialidad}
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
                <option>Seleccionar Especialista</option>
                {this.state.datas === "undefined"
                  ? "seleccione una especialidad"
                  : this.state.datas.map((option) => (
                      <option value={option.userMedic}>
                        {option.firstName + " " + option.lastName}
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
                onChange={this.handleDate}
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
                  : this.state.horarios.map((option) => {
                      let permitir = true;

                      let fecha = this.state.form2.fechaCita;
                      this.state.other.map((dato) => {
                        let dates = dato.fecha.split(
                          "00:00:00 GMT+0000 (Coordinated Universal Time)"
                        );

                        let res = this.formatDate(dates[0]);
                        //console.log(res, "convert");
                        if (
                          dato.hora === option.horarioId &&
                          res === fecha &&
                          dato.medico === this.state.form2.medicoId
                        ) {
                          permitir = false;
                        }
                      });
                      if (permitir) {
                        return (
                          <option value={option.horarioId}>
                            {option.horaInicial} - {option.horaFinal}
                          </option>
                        );
                      } else {
                        return (
                          <option value={option.horarioId} disabled>
                            {option.horaInicial} - {option.horaFinal} Reservado
                          </option>
                        );
                      }
                    })}
              </select>
            </FormGroup>
            <FormGroup>
              <label>Motivo:</label>
              <select
                className="form-control"
                name="motivoCita"
                onChange={this.handleChanges}
              >
                <option>Seleccione Motivo</option>
                <option>Cita Medica</option>
                <option>Examenes</option>
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
export default AgendarCitaAdmin;
