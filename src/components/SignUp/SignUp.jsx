import React from "react";
import "./SignUp.scss";
import { Formik, Form } from "formik";
import * as yup from "yup";
import SignUpInput from "./SignUpInput";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("Accepts Emails Only").required("Required"),
  password: yup
    .string()
    .length(8, "Min Length 8 Characters")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password Not Match")
    .required("Required"),
});

const onSubmit = (values, onSubmitProps) => {
  axios
    .post("https://frozen-dawn-52777.herokuapp.com/api/users", values, {
      "Content-Type": "application/json",
      "Accept": "application/json",
    })
    .then((response) =>
      localStorage.setItem("userInfo", JSON.stringify(response.data))
    )
    .catch((error) => console.log(error));
  onSubmitProps.resetForm();
};

const SignUp = () => {
  return (
    <div className="mt-5">
      <h1 className="text-center mb-5">Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="row justify-content-center">
          <SignUpInput type="text" name="name">
            Name
          </SignUpInput>
          <SignUpInput type="text" name="email">
            Email
          </SignUpInput>
          <SignUpInput type="password" name="password">
            Password
          </SignUpInput>
          <SignUpInput type="password" name="confirmPassword">
            Confirm Password
          </SignUpInput>
          <div className="text-end">
            <button type="submit" className="btn btn-dark px-3 mt-3">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
