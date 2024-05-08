import api from "../api";

export const authorize = (loginData) => {
  return api.post("/users/login", loginData);
};
