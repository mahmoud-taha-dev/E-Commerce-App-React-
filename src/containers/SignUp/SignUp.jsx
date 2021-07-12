import style from "./SignUp.module.scss";
import UserForm from "../../components/UserForm/UserForm";
import PageTitle from "../../components/PageTitle/PageTitle";
import { toast } from "react-toastify";
import { useCallback, useState } from "react";
import useAxios from "../../utils/customHooks/useAxios";
import useAuth from "../../utils/customHooks/useAuth";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const { instance } = useAxios();
  const { addUserInfo } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(
    (values) => {
      setSubmitting(true);
      instance
        .post("/users", values)
        .then((response) => {
          addUserInfo(response.data);
          toast.dark("Your account has been created successfully");
        })
        .catch((error) => {
          setSubmitting(false);
          toast.error(error.response.data.message);
        });
    },
    [instance]
  );

  return (
    <PageTitle title="Sign Up">
      <h2 className={style.pageTitle}>Sign Up</h2>
      <UserForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        isSubmitting={isSubmitting}
        btnTxt="Sign Up"
      />
    </PageTitle>
  );
};

export default SignUp;
