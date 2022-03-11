import { React, useState, useEffect, useContext } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import "./App.css";
import { ToastContext } from "../../../../components/ToastContextProvider";
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
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";

const RegisterEspec = () => {
  const [data, setData] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const { notifyError, notifySuccess } = useContext(ToastContext);
  const schemal = Yup.object().shape({
    nombreEspecialidad: Yup.string()
      .min(3, "Minimo 3 simbolos")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    descripcion: Yup.string()
      .min(3, "Minimo 3 simbolos")

      .required("Esta campo es requerido"),

    estado: Yup.string()
      .min(3, "Minimum 3 nuemeros")
      .max(10, "Maximo 10 numeros")
      .required("Tiene que ser numero"),
    phoneNumber: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    historynumber: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    email: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
  });
  const userActual = useSelector((state) => state.tokenStore.user.userId);
  const formik = useFormik({
    initialValues: {
      nameUser: "",
      phoneNumber: "",
      nombreEspecialidad: "",
      descripcion: "",
      estado: "",
      email: "",
    },
    validationSchema: schemal,
    onSubmit: (values) => {},
  });
  function addExpec() {
    var data = {
      nombreEspecialidad: formik.values.nombreEspecialidad,
      estado: "Activo",
      usuarioModifico: userActual,
      usuarioAccion: userActual,
      descripcionEspecialidad:
        formik.values.descripcion === ""
          ? "No hay descripcion"
          : formik.values.descripcion,
    };

    var config = {
      method: "post",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/especialidades/registrarEspecilidades",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        formik.resetForm();
        notifySuccess("Especialidad registrada");
        window.location.reload();
        setModal3(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function actualizarEspecialidad() {
    var fin = new Date();
    console.log(fin);
    console.log(userActual);
    console.log(dataTemp.especialidadId);
    const idEsp = dataTemp.especialidadId;
    var data = {
      especialidadId: idEsp,
      nombreEspecialidad: formik.values.nombreEspecialidad,
      estado: formik.values.estado,
      usuarioModifico: userActual,
      fechaModificacion: fin,
      usuarioAccion: userActual,
      descripcionEspecialidad:
        formik.values.descripcion === ""
          ? dataTemp.descripcionEspecialidad
          : formik.values.descripcion,
    };

    var config = {
      method: "post",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/especialidades/actEspecialidades",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setModal(false);

        formik.resetForm();
        window.location.reload();
        notifySuccess("Especialidad modificada con exito");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function openModal2(item) {
    setModal2(true);
    console.log(item);
  }
  async function update(item) {
    await setModal(true);
    await setDataTemp(item);
    console.log(dataTemp);
  }

  function getAllEspecialidades() {
    var config = {
      method: "get",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/especialidades/getAllEspecialidad",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getAllEspecialidades();
  }, []);
  function refreshPage() {
    window.location.reload();
  }
  return (
    <div>
      <Container style={{ overflow: "scroll" }}>
        <h1 style={{ marginTop: 30 }}>Gestion De Especialidades</h1>

        <Button
          color="primary"
          onClick={() => {
            setModal3(true);
          }}
          style={{ marginBottom: "20px", marginTop: 15 }}
        >
          Agregar
        </Button>
        <Button
          color="success"
          onClick={() => {
            refreshPage();
          }}
          style={{
            marginBottom: "20px",
            marginTop: 15,
            marginTop: 15,
            marginLeft: 15,
          }}
        >
          Actualizar Pagina
        </Button>
        <Table>
          <thead>
            <tr>
              <th>Nombre Especialidad</th>
              <th>Fecha Registro</th>
              <th>Usuario Modif</th>
              <th>Descripcion</th>
              <th>Modificacion Registro</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {data.map((item) => {
            return (
              <tbody>
                <tr>
                  <td
                    style={{
                      fontWeight: "bold",
                      color: "primary",
                      fontFamily: "century-gothic",
                    }}
                  >
                    {item.nombreEspecialidad}
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      color: "primary",
                      fontFamily: "century gothic",
                    }}
                  >
                    {item.fechaRegistro.split(".000Z")}{" "}
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      color: "primary",
                      fontFamily: "century-gothic",
                    }}
                  >
                    {item.nameUser}
                  </td>

                  <td
                    style={{
                      fontWeight: "bolder",
                      color: "primary",
                      fontFamily: "century-gothic",
                    }}
                  >
                    {item.descripcionEspecialidad}
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      color: "blue",
                      fontFamily: "century-gothic",
                    }}
                  >
                    {item.fechaModificacion === "0000-00-00 00:00:00"
                      ? "No hay actualizaciones por el momento"
                      : item.fechaModificacion.split(
                          "GMT+0000 (Coordinated Universal Time)"
                        )}
                  </td>
                  <td style={{ fontWeight: "bold" }}>{item.estado}</td>
                  <td>
                    <Button
                      color="warning"
                      onClick={() => {
                        update(item);
                      }}
                      style={{
                        marginBottom: "20px",
                        marginTop: 15,
                        width: "100%",
                      }}
                    >
                      Modificar
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => {
                        openModal2(item);
                      }}
                      style={{
                        marginBottom: "20px",
                        marginTop: 15,
                        width: "100%",
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </Container>
      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <ModalHeader toggle={() => setModal(false)}>
          Editar Especialidad
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre Especialidad </label>
            <input
              id="nombreEspecialidad"
              className="form-control"
              type="text"
              placeholder="Nombre Especialidad"
              onChange={formik.handleChange}
              value={formik.values.nombreEspecialidad}
            />
            {formik.errors.nombreEspecialidad ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.nombreEspecialidad}
              </FormHelperText>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label>Estado</label>
            <select
              id="estado"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.estado}
            >
              <option value="">Seleccione una opcion</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Descripcion</label>
            <textarea
              id="descripcion"
              type="text"
              className="form-control"
              placeholder="Descripcion"
              onChange={formik.handleChange}
              value={formik.values.descripcion}
            />
            {formik.errors.descripcion ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.descripcion}
              </FormHelperText>
            ) : null}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => actualizarEspecialidad()}>
            Guardar
          </Button>
          <Button color="secondary" onClick={() => setModal(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal2} toggle={() => setModal2(false)}>
        <ModalHeader toggle={() => setModal2(false)}>
          Eliminar Especialidad
        </ModalHeader>
        <ModalBody>¿Esta seguro que desea eliminar la especialidad?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setModal2(false)}>
            Eliminar
          </Button>
          <Button color="secondary" onClick={() => setModal2(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal3} toggle={() => setModal3(false)}>
        <ModalHeader toggle={() => setModal3(false)}>
          Agregar Especialidad
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre Especialidad</label>
            <input
              id="nombreEspecialidad"
              type="text"
              className="form-control"
              placeholder="Nombre Especialidad"
              onChange={formik.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Descripcion</label>
            <textarea
              id="descripcion"
              type="text"
              className="form-control"
              placeholder="Descripcion"
              onChange={formik.handleChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => addExpec()}>
            Guardar
          </Button>
          <Button color="secondary" onClick={() => setModal3(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RegisterEspec;
