import React from "react";
import { Table } from "reactstrap";

export const RecetaPDF = React.forwardRef(
  ({ diagnosticForm, medicamentosAct, user }, ref) => {
    //console.log(user, "formulario diagnostico");

    return (
      <div ref={ref} style={{ width: "100%" }}>
        <div>
          {/*Aqui se debe colocar el enlace al logo o imagen */}
          <img
            style={{ width: "300px" }}
            src="https://png.pngtree.com/template/20190515/ourlarge/pngtree-abstract-blue-green-hospital-logo-design-image_154200.jpg"
            alt="Logo"
          />
        </div>
        <div style={{ backgroundColor: "red" }}>
          <p>
            {" "}
            <strong>Nombres: </strong>
            <span>{`${user.firstName}`}</span>
            <br />
            <strong>Apellidos: </strong>
            <span>{`${user.lastName}`}</span>
            <br />
            <strong>Cedula: </strong>
            <span>{`${user.identificacion}`}</span>
            <br />
            <strong>Fecha de Nacimiento: </strong>
            <span>{`${user.dateBirth}`}</span>
            <br />
            <strong>Sexo: </strong>
            <span>{`${user.sex}`} </span>
            <br />
            <strong>Medico: </strong>
            <span>{`${user.userm}`} </span>
          </p>
        </div>
        <Table style={{ marginTop: 15 }} id="esmiTd">
          <thead>
            <tr>
              <th>No.</th>
              <th>MEDICAMENTO</th>
              <th>INDICACIONES</th>
              <th>FRECUENCIA</th>
            </tr>
          </thead>

          <tbody>
            {diagnosticForm.medicamentos.map((medicamento, index) => {
              const medicamentoData = medicamentosAct.find(
                (m) =>
                  parseInt(m.medicamentoId) ===
                  parseInt(medicamento.medicamentoId)
              );
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{medicamentoData.nombreMedicamento}</td>
                  <td>{medicamento.indicaciones}</td>
                  <td>{medicamento.frecuencia}</td>
                  <td>{medicamento.dosis}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
);
