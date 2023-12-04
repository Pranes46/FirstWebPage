import { Auth } from "firebase/auth";

export const updatePassword = (password) => ({
  type: "UPDATE_PASSWORD",
  payload: password,
});

export const setPasswordValidity = (isValid) => ({
  type: "SET_PASSWORD_VALIDITY",
  payload: "isValid",
});
