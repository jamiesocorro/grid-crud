import { UserModel } from "../../models/UserModel";

export const viewUsers = () => {
  return JSON.parse(localStorage.getItem("users") || "{}");
};

export const updateUser = (data: UserModel[]) => {
  return localStorage.setItem("users", JSON.stringify(data));
};

export const createUser = (data: UserModel[]) => {
  return localStorage.setItem("users", JSON.stringify(data));
};

export const deleteUser = (data: UserModel[]) => {
  return localStorage.setItem("users", JSON.stringify(data));
};
