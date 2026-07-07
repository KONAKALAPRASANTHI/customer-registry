import API from "./axios";


export const getCustomers = async () => {
  const res = await API.get("/api/customers");
  return res.data;
};


export const addCustomer = async (data) => {
  const res = await API.post("/api/customers", data);
  return res.data;
};


export const updateCustomer = async (id, data) => {
  const res = await API.put(`/api/customers/${id}`, data);
  return res.data;
};


export const deleteCustomer = async (id) => {
  const res = await API.delete(`/api/customers/${id}`);
  return res.data;
};