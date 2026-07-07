import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

let interceptorAdded = false;

export const attachToken = (getToken) => {
  if (interceptorAdded) return;

  API.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  interceptorAdded = true;
};
console.log("API BASE:", API.defaults.baseURL);

export default API;