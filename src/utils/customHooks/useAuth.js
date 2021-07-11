import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { addUser, removeUser } from "../../redux/features/user/userActions";

const useAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const addUserInfo = (data) => {
    dispatch(addUser(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
    history.push("/");
  };
  const removeUserInfo = (msg) => {
    msg && toast.error(msg);
    dispatch(removeUser());
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  return { addUserInfo, removeUserInfo };
};

export default useAuth;
