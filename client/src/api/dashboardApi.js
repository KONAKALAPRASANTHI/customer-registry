import API from "./axios";

export const getDashboardStats = async () => {
  const res = await API.get("/api/dashboard");
  return res.data;
};