import style from "./UserForm.module.scss";
import { Formik, Form } from "formik";
import FormInput from "../FormInput/FormInput";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("Accepts Emails Only").required("Required"),
  password: yup.string().min(8, "Min Length 8 Characters").required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password Not Match")
    .required("Required"),
});

const UserForm = ({ onSubmit, initialValues, isSubmitting, btnTxt }) => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={`row justify-content-center ${style.userForm}`}>
          <FormInput type="text" name="name" text="Name" />
          <FormInput type="text" name="email" text="Email" />
          <FormInput type="password" name="password" text="Password" />
          <FormInput
            type="password"
            name="confirmPassword"
            text="Confirm Password"
          />
          <div className="text-end">
            <button
              type="submit"
              className={`btn ${style.mainBtn} px-5 mt-3`}
              disabled={isSubmitting}
            >
              {!isSubmitting ? (
                btnTxt
              ) : (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              )}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UserForm;
