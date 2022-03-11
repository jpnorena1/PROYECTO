import React, { useState, useEffect, useContext } from "react";
import FormControl from "@material-ui/core/FormControl";

import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { ToastContext } from "../../../../components/ToastContextProvider";

const WrapperField = styled.div`
  padding: 5px;
`;

const WrapperLogin = styled.div`
  min-width: 70vw;
`;

const WrapperButton = styled.div`
  padding: 15px 0 0 0;
  width: 100%;
  max-width: 200px;
`;

const TitleSection = styled.div`
  padding: 15px 0 0 0;
  margin: 0;
  width: 100%;
  max-width: 600px;
  h3 {
    font-size: 1.2rem;
  }
`;

const SignUpMedic = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [especialidadId, setEspecialidadId] = "";
  const user = useSelector((state) => state.tokenStore.user.userId);
  const [datas, setDatas] = useState([]);
  const { notifySuccess } = useContext(ToastContext);

  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };

  function auths(event) {
    event.preventDefault();
    const prueba = formik.values.especialidadId;
    console.log(prueba);
    var data = {
      nameUser: formik.values.nameUser,
      phoneNumber: formik.values.phoneNumber,
      lastName: formik.values.lastName,
      firstName: formik.values.firstName,
      password: formik.values.password,
      email: formik.values.email,
      identificacion: formik.values.identificacion,
      addres: formik.values.addres,
      country: formik.values.country,
      dateBirth: formik.values.dateBirth,
      sex: formik.values.sex,
      especialidadMedico: prueba,
    };

    var config = {
      method: "post",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/administrador/registrarMedi",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        formik.resetForm();
        notifySuccess("Registro exitoso");
      })
      .catch(function (error) {
        console.log(error);
        enableLoading();
      });
    /*var data = JSON.stringify({
      nameUser: formik.values.nameUser,
      phoneNumber: formik.values.phoneNumber,
      lastName: formik.values.lastName,
      firstName: formik.values.firstName,
      password: formik.values.password,
      email: formik.values.email,
      identificacion: formik.values.identificacion,
      addres: formik.values.addres,
      country: formik.values.country,
      dateBirth: formik.values.dateBirth,
      sex: formik.values.sex,
    });

    var config = {
      method: "post",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/medico/registrarMedi",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        const data = response.data.ok;
        const { message, phone } = response.data;
        especialidades({ message, phone });

        notifySuccess("Usuario Administrador creado con exito");
        history.push("/auth/login");
      })
      .catch(function (error) {
        //console.log(error);
      });*/
  }
  const LoginSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    lastName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    identificacion: Yup.string()
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
    nameUser: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    country: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    addres: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    dateBirth: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
    sex: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Esta campo es requerido"),
  });

  function getEspecialidad() {
    var config = {
      method: "get",
      url: "https://gaxa5x44q1.execute-api.us-east-2.amazonaws.com/dev/administrador/getAll",
      headers: {},
    };

    axios(config)
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    setLoading(false);
    getEspecialidad();
    return () => setLoading(false);
  }, []);
  const formik = useFormik({
    initialValues: {
      nameUser: "",
      phoneNumber: "",
      lastName: "",
      firstName: "",
      password: "",
      email: "",
      identificacion: "",
      addres: "",
      country: "",
      dateBirth: "",
      sex: "",
      especialidadId: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {},
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <WrapperLogin className="d-flex flex-column align-items-center">
        <TitleSection>
          <h3>Informacion Personal</h3>
          <hr />
        </TitleSection>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="firstName">Primer Nombre</InputLabel>
            <Input
              id="firstName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              aria-describedby="component-error-text"
            />
            {formik.errors.firstName ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.firstName}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="lastName">Apellidos</InputLabel>
            <Input
              id="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              aria-describedby="component-error-text"
            />
            {formik.errors.lastName ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.lastName}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="documentid">identificacion</InputLabel>
            <Input
              id="identificacion"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.identificacion}
              aria-describedby="component-error-text"
            />
            {formik.errors.identificacion ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.identificacion}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="phoneNumber">Numero de telefono</InputLabel>
            <Input
              id="phoneNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              aria-describedby="component-error-text"
            />
            {formik.errors.phoneNumber ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.phoneNumber}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="phone">ciudad</InputLabel>
            <Input
              id="country"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.country}
              aria-describedby="component-error-text"
            />
            {formik.errors.country ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.country}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="historynumber">Dirección</InputLabel>
            <Input
              id="addres"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.addres}
              aria-describedby="component-error-text"
            />
            {formik.errors.addres ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.addres}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>
        <TitleSection>
          <h3>Informacion de usuario</h3>
          <hr />
        </TitleSection>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="email">Correo</InputLabel>
            <Input
              id="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
              aria-describedby="component-error-text"
            />
            {formik.errors.email ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.email}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="username">Nombre de usuario</InputLabel>
            <Input
              id="nameUser"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.nameUser}
              aria-describedby="component-error-text"
            />
            {formik.errors.nameUser ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.nameUser}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <Input
              id="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              aria-describedby="component-error-text"
            />
            {formik.errors.password ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.password}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>
        <WrapperField className="d-flex flex-row justify-content-center">
          <InputLabel htmlFor="firstName">Sexo</InputLabel>

          <select
            id="sex"
            type="text"
            className="d-flex flex-row justify-content-"
            onChange={formik.handleChange}
            value={formik.values.sex}
          >
            <option>Masculino</option>
            <option>Femenino</option>
          </select>

          {formik.errors.sex ? (
            <FormHelperText id="component-error-text" error>
              {formik.errors.sex}
            </FormHelperText>
          ) : null}
        </WrapperField>
        <WrapperField className="d-flex flex-row justify-content-center">
          <InputLabel htmlFor="firstName">Especialidad</InputLabel>
          <select
            id="especialidadId"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.especialidadId}
          >
            {datas
              ? datas.map((data) => (
                  <option value={data.especialidadId}>
                    {data.nombreEspecialidad}
                  </option>
                ))
              : null}
          </select>
        </WrapperField>
        <WrapperField className="d-flex flex-row justify-content-center">
          <FormControl>
            <Input
              id="dateBirth"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.dateBirth}
              aria-describedby="component-error-text"
            />
            {formik.errors.dateBirth ? (
              <FormHelperText id="component-error-text" error>
                {formik.errors.dateBirth}
              </FormHelperText>
            ) : null}
          </FormControl>
        </WrapperField>

        <WrapperButton className="d-flex flex-row justify-content-start ">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="mr-2"
            onClick={auths}
          >
            GUARDAR
          </Button>
          {loading && <CircularProgress color="secondary" />}
        </WrapperButton>
      </WrapperLogin>
    </form>
  );
};

export default SignUpMedic;
