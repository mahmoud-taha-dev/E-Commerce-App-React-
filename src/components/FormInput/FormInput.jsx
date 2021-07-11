import "./FormInput.scss";
import { Field, ErrorMessage } from "formik";

const FormInput = ({ type, name, text }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="d-block mb-2 p-0">
        {text}
      </label>
      <Field type={type} id={name} name={name} className="w-100 input-field" />
      <ErrorMessage name={name}>
        {(errorMsg) => {
          return <p className="text-danger mt-2"> {errorMsg} </p>;
        }}
      </ErrorMessage>
    </div>
  );
};

export default FormInput;
