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
import { useSelector, useDispatch } from "react-redux";
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
class AgendarCitaUser extends React.Component {
  fech() {
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const fecha = `${dia}/${mes}/${anio}`;
    console.log(fecha);
  }
  
  getAllCItasAdmin(){
       axios
      .get(
        `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas/getAllCitasAdm`
      )
      .then((response) => {
       if(response.status ===200  ){
        const datas =response.data.res
        this.setState({other:datas})
        console.log(this.state.other)
       }
      })
      .catch((error) => {
        //
        console.log(error);
      });
  }
  getHorario() {
    axios
      .get(
        `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/horarios`
      )
      .then((response) => {
        //console.log(response);
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  getDescription(value) {
    if (value === "Endocrinología") {
      axios
        .get(
          `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas?nombreEspec=${value}`
        )
        .then((response) => {
          const data = response.data.res;
          this.setState({ datas: data });
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
            const data = response.data.res;
            this.setState({ datas: data });
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
          const data = response.data.res;
          this.setState({ datas: data });
        })
        .catch((error) => {
          //console.log(error);
        });
    } else if (value === "medicina general") {
      axios
        .get(
          `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas?nombreEspec=${value}`
        )
        .then((response) => {
          const data = response.data.res;
          this.setState({ datas: data });
        })
        .catch((error) => {
          //console.log(error);
        });
    }
  }

  componentWillMount() {
    
    axios
      .get(
        `https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas/findScheulding`
      )
      .then((response) => {
        if (response.status === 200) {
          const dataHorarario = response.data.data;
          this.setState({ horarios: dataHorarario });
          //console.log(this.state);
        } else {
          this.setState({ datas: [] });
        }
      })
      .catch((error) => {
        //console.log(error);
      });
    this.fech();
    this.getAllCItasAdmin();
  }

  state = {
    data: data,
    datas: [],
    other:[],
   
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
      fechaCita: "",
      horaCita: "",
    },
  };

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
    this.setState({
      form2: {
        ...this.state.form2,
        [e.target.name]: e.target.value,
      },
    });
    //console.log(this.state.form2);
  };

  AgendarCita = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      fecha: this.state.form2.fechaCita,
      identificacion: this.state.form2.identificacionUser,
      medico: 3,
      hora: this.state.form2.horaCita,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://y802ko2n3c.execute-api.us-east-2.amazonaws.com/dev/citas/agendarCIta",
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            modalInsertar: false,
          });
        }
      })

      .catch((error) => console.log(error));
  };
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
                  <td>{dato.fecha}</td>
                  <td>{dato.horaInicial}-{dato.horaFinal}</td>
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
              <select className="form-control">
                <option>Seleccion Especial</option>
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    onChange={this.handleChanges}
                    onClick={() =>
                      this.setState(
                        { form: option.value },
                        this.getDescription(option.value)
                      )
                    }
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
                      <option value={option.especialidadId}>
                        {` ${option.firstName} ${option.lastName}`}
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
                      <option value={option.horarioId}>
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
export default AgendarCitaUser;
