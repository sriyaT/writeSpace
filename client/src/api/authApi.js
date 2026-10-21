import axiosInstance from "./axios";

export const login = async (payload) => {
  const { data } = await axiosInstance.post("/auth/login", payload);
  return data;
};

export const register = async (payload) => {
  const { data } = await axiosInstance.post("/auth/register", payload);
  return data;
};
