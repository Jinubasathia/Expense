import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/api" });

let tokenGetter = () => null;
export const registerTokenGetter = (fn) => { tokenGetter = fn; };

api.interceptors.request.use(config => {
  const token = tokenGetter();
  if(token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(r => r, e => Promise.reject(e));
export default api;
