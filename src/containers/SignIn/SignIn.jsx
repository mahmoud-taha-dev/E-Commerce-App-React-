import style from "./SignIn.module.scss";
import FormInput from "../../components/FormInput/FormInput";
import { Formik, Form } from "formik";
import * as yup from "yup";
import PageTitle from "../../components/PageTitle/PageTitle";
import { toast } from "react-toastify";
import { useCallback, useState } from "react";
import useAxios from "../../utils/customHooks/useAxios";
import useAuth from "../../utils/customHooks/useAuth";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().email("Accepts Emails Only").required("Required"),
  password: yup.string().min(8, "Min Length 8 Characters").required("Required"),
});

const SignIn = () => {
  const { instance } = useAxios();
  const { addUserInfo } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = useCallback(
    (values) => {
      setSubmitting(true);
      instance
        .post("/users/authenticate", values)
        .then((response) => {
          addUserInfo(response.data);
          toast.dark("You are logged in successfully");
        })
        .catch((error) => {
          setSubmitting(false);
          toast.error(error.response.data.message);
        });
    },
    [instance]
  );

  return (
    <PageTitle title="Sign In">
      <h2 className={style.pageTitle}>Sign In</h2>
      <div className="d-flex justify-content-center mt-5">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className={`row justify-content-center ${style.userForm}`}>
            <FormInput type="text" name="email" text="Email" />
            <FormInput type="password" name="password" text="Password" />
            <div className="text-end">
              <button
                type="submit"
                className={`btn ${style.mainBtn} px-5 mt-3`}
                disabled={isSubmitting}
              >
                {!isSubmitting ? (
                  "Sign In"
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
    </PageTitle>
  );
};

export default SignIn;
