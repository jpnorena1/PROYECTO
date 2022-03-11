import { React, useState, useEffect } from "react";
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
import axios from "axios";
import { useSelector } from "react-redux";
const HistorialCitas = (props) => {
  const user = useSelector((state) => state.tokenStore.user.userId);
  const [historial, SetHistorial] = useState([]);
  function getAllCItasAdmin() {
    const esto = user;
    ////console.log(esto, "esto");
    axios
      .get(
        `https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/historial/getRequestByUser/${esto}`
      )
      .then((response) => {
        if (response.status === 200) {
          const datas = response.data;
          ////console.log(datas, "datas");
          SetHistorial(datas);
          //console.log(datas, "asda");
        }
      })
      .catch((error) => {
        //
        ////console.log(error);
      });
  }
  useEffect(() => {
    getAllCItasAdmin();
  }, []);
  const a = new Date().toISOString().slice(0, 10);
  let busca = historial.filter((item) => {
    return item.fecha.slice(0, 10) === a;
  });
  console.log(busca, "busca");

  //console.log(a, "fecha");
  //console.log(historial, "historial");
  return (
    <Container>
      <h1 style={{ marginTop: 20 }}>Historial de Citas Medicas</h1>
      <br />
      <br />
      <Table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Paciente</th>
            <th>Especialidad</th>
            <th>Edad</th>

            <th>Motivo</th>
          </tr>
        </thead>
        {historial.map((item) => (
          <tbody>
            <tr>
              <td>{item.fecha.split("T00:00:00.000Z")} </td>
              <td>{item.horaInicial}</td>
              <td>{item.user}</td>
              <td>{item.nombreEspecialidad}</td>
              <td>{item.dateBirth}</td>
              <td>{item.motivo}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </Container>
  );
};
export default HistorialCitas;
