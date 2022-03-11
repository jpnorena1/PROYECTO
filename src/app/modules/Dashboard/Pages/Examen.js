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

const Examen = () => {
  const [data, setData] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const { notifyError, notifySuccess } = useContext(ToastContext);
  const schemal = Yup.object().shape({
    nombreExamen: Yup.string()
      .min(3, "Minimo 3 simbolos")
      .max(50, "Maximum 50 symbols")
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
  //const userActual = useSelector((state) => state.tokenStore.user.userId);
  const formik = useFormik({
    initialValues: {
      nombreExamen: "",
      estado: "",
      indicacion: "",
    },
    validationSchema: schemal,
    onSubmit: (values) => {},
  });
  function addExamen() {
    var data = {
      nombreExamen: formik.values.nombreExamen,
      estado: formik.values.estado,
      indicacion: formik.values.indicacion,
    };

    var config = {
      method: "post",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/examen/registrarExamenMed",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        notifySuccess(response.data.message);
        setModal(false);
        formik.resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function actualizarEspecialidad() {
    var data = {
      examenMedicoId: dataTemp.examenMedicoId,
      nombreExamen: formik.values.nombreExamen,
      indicacion: formik.values.indicacion,
      estado: formik.values.estado,
    };
    var config = {
      method: "post",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/examen/actExamen",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        //console.log(response.data);
        notifySuccess(response.data.message);
        setModal2(false);
        formik.resetForm();
        window.location.reload();
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

  function getAllExamenes() {
    var config = {
      method: "get",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/examen/getExamenMedico",
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
    getAllExamenes();
  }, []);
  function refreshPage() {
    window.location.reload();
  }
  return (
    <div>
      <Container>
        <h1 style={{ marginTop: 30 }}>Gestión De Examen Medico</h1>

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

            marginLeft: 15,
          }}
        >
          Actualizar Pagina
        </Button>
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          {data.map((item) => (
            <tbody>
              <tr key={item.examenMedicamentoId}>
                <td>{item.nombreExamen}</td>
                <td>{item.estado}</td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => {
                      update(item);
                    }}
                    style={{ marginBottom: "20px" }}
                  >
                    Editar
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      openModal2(item);
                    }}
                    style={{ marginBottom: "20px", marginLeft: 10 }}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Container>
      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <ModalHeader toggle={() => setModal(false)}>Editar Examen</ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre Examen </label>
            <input
              id="nombreExamen"
              className="form-control"
              type="text"
              placeholder="Nombre Especialidad"
              onChange={formik.handleChange}
              value={formik.values.nombreExamen}
            />
            {formik.errors.nombreExamen ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.nombreExamen}
              </FormHelperText>
            ) : null}
          </FormGroup>

          <FormGroup>
            <label>Estado</label>
            <select
              id="estado"
              onChange={formik.handleChange}
              value={formik.values.estado}
            >
              <option value="">Seleccione una opcion</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label>Estado</label>
            <textarea
              id="indicacion"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.indicacion}
            ></textarea>
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
          Eliminar Examen
        </ModalHeader>
        <ModalBody>¿Esta seguro que desea eliminar el examen?</ModalBody>
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
            <label>Nombre Examen</label>
            <input
              id="nombreExamen"
              type="text"
              className="form-control"
              placeholder="Nombre Examen"
              onChange={formik.handleChange}
            />
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
            <label>Estado</label>
            <textarea
              id="indicacion"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.indicacion}
            ></textarea>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => addExamen()}>
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
export default Examen;
