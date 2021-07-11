import { useSelector } from "react-redux";
import UserForm from "../../components/UserForm/UserForm";
import PageTitle from "../../components/PageTitle/PageTitle";
import { toast } from "react-toastify";
import { useState } from "react";
import useAxios from "../../utils/customHooks/useAxios";
import useAuth from "../../utils/customHooks/useAuth";

const Profile = () => {
  const userInfo = useSelector((state) => state.user);
  const { addUserInfo } = useAuth();
  const { instance } = useAxios();
  const [isSubmitting, setSubmitting] = useState(false);

  const initialValues = {
    name: userInfo?.name,
    email: userInfo?.email,
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    setSubmitting(true);
    instance
      .patch("/users/profile", values)
      .then((response) => {
        addUserInfo(response.data);
        toast.dark("Updated successfully");
      })
      .catch((error) => {
        setSubmitting(false);
        toast.error(error.response.data.message);
      });
  };

  return (
    <PageTitle title="Update Profile">
      <h2 className="text-center page-title">Update Profile</h2>
      <UserForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        isSubmitting={isSubmitting}
        btnTxt="Update"
      />
    </PageTitle>
  );
};

export default Profile;
