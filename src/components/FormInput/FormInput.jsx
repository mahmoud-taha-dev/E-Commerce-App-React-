import style from "./FormInput.module.scss";
import { Field, ErrorMessage } from "formik";

const FormInput = ({ type, name, text }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className={`d-block mb-2 p-0 ${style.inputLabel}`}>
        {text}
      </label>
      <Field
        type={type}
        id={name}
        name={name}
        className={`w-100 ${style.inputField}`}
      />
      <ErrorMessage name={name}>
        {(errorMsg) => {
          return <p className="text-danger mt-2"> {errorMsg} </p>;
        }}
      </ErrorMessage>
    </div>
  );
};

export default FormInput;
