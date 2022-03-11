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

const Medicamentos = () => {
  const [data, setData] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const { notifyError, notifySuccess } = useContext(ToastContext);
  const schemal = Yup.object().shape({
    nombreMedicamento: Yup.string()
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
      nombreMedicamento: "",
      estado: "",
    },
    validationSchema: schemal,
    onSubmit: (values) => {},
  });
  function addExpec() {
    var data = {
      nombreMedicamento: formik.values.nombreMedicamento,
      estado: formik.values.estado,
    };

    var config = {
      method: "post",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/medicamento/saveUMedicament",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        notifySuccess("Medicamento agregado correctamente");
        setModal3(false);
        formik.resetForm();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function actualizarEspecialidad() {
    var data = {
      medicamentoId: dataTemp.medicamentoId,
      nombreMedicamento: formik.values.nombreMedicamento,
      estado: formik.values.estado,
    };
    var config = {
      method: "post",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/medicamento/actMedicamento",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
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

  function getAllEspecialidades() {
    var config = {
      method: "get",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/medicamento/allMedicments",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setData(response.data.message);
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
      <Container>
        <h1 style={{ marginTop: 30 }}>Gestión De Medicamentos</h1>

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
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          {data.map((item) => (
            <tbody>
              <tr key={item.medicamentoId}>
                <td>{item.nombreMedicamento}</td>
                <td>{item.estado}</td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => {
                      update(item);
                    }}
                    style={{ marginBottom: "20px", marginTop: 15 }}
                  >
                    Editar
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      openModal2(item);
                    }}
                    style={{ marginBottom: "20px", marginTop: 15 }}
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
        <ModalHeader toggle={() => setModal(false)}>
          Editar Medicamento
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre Medicamento </label>
            <input
              id="nombreMedicamento"
              className="form-control"
              type="text"
              placeholder="Nombre Especialidad"
              onChange={formik.handleChange}
              value={formik.values.nombreMedicamento}
            />
            {formik.errors.nombreMedicamento ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.nombreMedicamento}
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
          Eliminar Medicamento
        </ModalHeader>
        <ModalBody>¿Esta seguro que desea eliminar el medicamento?</ModalBody>
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
          Agregar Medicamento
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre Medicamento</label>
            <input
              id="nombreMedicamento"
              type="text"
              className="form-control"
              placeholder="Nombre Medicamento"
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
export default Medicamentos;
