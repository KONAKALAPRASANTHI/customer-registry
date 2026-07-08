import API from "./axios";


export const getTickets = async () => {
  const res = await API.get("/tickets");
  return res.data;
};


export const addTicket = async (data) => {
  const res = await API.post("/tickets", data);
  return res.data;
};


export const updateTicket = async (id, data) => {
  const res = await API.put(`/tickets/${id}`, data);
  return res.data;
};


export const deleteTicket = async (id) => {
  const res = await API.delete(`/tickets/${id}`);
  return res.data;
};