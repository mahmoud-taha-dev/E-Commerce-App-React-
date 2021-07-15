import style from "./Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle/PageTitle";
import { toast } from "react-toastify";
import { useState } from "react";
import useAxios from "../../utils/customHooks/useAxios";
import { Formik, Form } from "formik";
import FormInput from "../../components/FormInput/FormInput";
import * as yup from "yup";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { addUser } from "../../redux/features/user/userActions";

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  email: yup.string().email("Accepts Emails Only").required("Required"),
});

const passwordValidationSchema = yup.object({
  password: yup.string().min(8, "Min Length 8 Characters").required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password Not Match")
    .required("Required"),
});

const passwordInitialValues = {
  password: "",
  confirmPassword: "",
};
const Profile = () => {
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { instance } = useAxios();
  const [isSubmitting, setSubmitting] = useState(false);
  const [isPasswordChange, setPasswordChange] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const initialValues = {
    name: userInfo?.name,
    email: userInfo?.email,
  };

  const updateUserInfo = (values) => {
    instance
      .patch("/users/profile", values)
      .then((response) => {
        dispatch(addUser(response.data));
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setSubmitting(false);
        setPasswordChange(false);
        toast.dark("Updated successfully");
        modal && toggle();
      })
      .catch((error) => {
        setSubmitting(false);
        setPasswordChange(false);
        toast.error(error.response.data.message);
      });
  };

  const onSubmit = (values) => {
    setSubmitting(true);
    updateUserInfo(values);
  };

  const changePassword = (values) => {
    setPasswordChange(true);
    updateUserInfo(values);
  };
  return (
    <PageTitle title="Update Profile">
      <h2 className={style.pageTitle}>Update Profile</h2>
      <div className="d-flex justify-content-center mt-5">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className={`row justify-content-center ${style.userForm}`}>
            <FormInput type="text" name="name" text="Name" />
            <FormInput type="text" name="email" text="Email" />
            <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-between">
              <button type="button" className="btn btn-link" onClick={toggle}>
                Change Password
              </button>
              <div className="text-end">
                <button
                  type="submit"
                  className={`btn ${style.mainBtn} px-5 mt-3`}
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? (
                    "Update"
                  ) : (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    ></div>
                  )}
                </button>
              </div>
            </div>
          </Form>
        </Formik>
        <Modal className={style.modalDialog} isOpen={modal} toggle={toggle}>
          <ModalHeader>Change Password</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={passwordInitialValues}
              onSubmit={changePassword}
              validationSchema={passwordValidationSchema}
            >
              <Form>
                <FormInput
                  type="password"
                  name="password"
                  text="New Password"
                />
                <FormInput
                  type="password"
                  name="confirmPassword"
                  text="Confirm New Password"
                />
                <div className="border-0 text-center mt-3">
                  <button type="submit" className={`btn py-2 ${style.mainBtn}`}>
                    {isPasswordChange ? (
                      <div
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                      ></div>
                    ) : (
                      "Update"
                    )}
                  </button>
                  <button
                    type="button"
                    className={`btn py-2 ${style.secBtn} ms-3`}
                    onClick={toggle}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          </ModalBody>
        </Modal>
      </div>
    </PageTitle>
  );
};

export default Profile;
