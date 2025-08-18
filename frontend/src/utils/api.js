import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/api" });

// allow AuthContext to register a getter so we don't prop-drill tokens
let tokenGetter = () => null;
export const registerTokenGetter = (fn) => { tokenGetter = fn; };

api.interceptors.request.use((config) => {
  const token = tokenGetter();
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default api;
