const isLogin = () => {
  return JSON.parse(localStorage.getItem("userInfo"));
};

export default isLogin;
