import axios from "axios";
import useAuth from "./useAuth";

const useAxios = () => {
  const { removeUserInfo } = useAuth();
  const instance = axios.create({
    baseURL: "https://frozen-dawn-52777.herokuapp.com/api",
    // timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  instance.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (config) => config,
    (error) => {
      error.response.status === 401 &&
        error.response.data.message === "Not authorized, missing token" &&
        removeUserInfo("You are not a user sign in first");
      throw error;
    }
  );

  const cancelTokenSource = axios.CancelToken.source();

  return { instance, cancelTokenSource };
};

export default useAxios;
