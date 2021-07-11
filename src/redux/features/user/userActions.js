export const addUser = (userInfo) => {
  return {
    type: "ADD_USER",
    payload: userInfo,
  };
};

export const removeUser = () => {
  return {
    type: "REMOVE_USER",
  };
};
