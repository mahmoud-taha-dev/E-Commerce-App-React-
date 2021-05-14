import React from "react";
import { Field, ErrorMessage } from "formik";

const SignUpInput = ({ type, name, children }) => {
  return (
    <div className="mb-2 col-12 col-md-6">
      <label htmlFor={name} className="d-block mb-2 p-0">
        {children}
      </label>
      <Field type={type} id={name} name={name} className="w-100"/>
      <ErrorMessage name={name}>
        {(errorMsg) => {
          return <p className="text-danger mt-2"> {errorMsg} </p>;
        }}
      </ErrorMessage>
    </div>
  );
};

export default SignUpInput;
